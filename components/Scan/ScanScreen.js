import React, { useEffect, useState, useRef } from 'react';
import { Button, Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import Environment from '../../config/environments';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { createPurchase } from '../../models/Purchase';

//Styles
import styles from './ScanSreen.style';
import gStyles from '../../globalStyles'

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: false };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
            setImageUri(data.uri);
        }
    };

    const handlePhotoRetake = () => {
        setImageUri(null);
    }

    const sendToGoogleVision = async () => {
        try {
            // Get base64 image
            const imgB64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const body = {
                requests: [
                    {
                        image: {
                            content: imgB64,
                        },
                        features: [
                            // { type: 'LABEL_DETECTION', maxResults: 10 },
                            { type: 'TEXT_DETECTION', maxResults: 5 },
                        ],
                        imageContext: {
                            languageHints: "dk-t-i0-und",
                        }
                    },
                ],
            };

            const response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBZqoCrMW1L5x7Ae3kviiCqUeumQGL1liM`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            const result = await response.json();

            console.log(result);
            await processAndLogResult(result);

            // Handle the results
        } catch (error) {
            console.error(error);
        }
    };

    const processAndLogResult = async (result) => {

        //Get just a text annotation from google vision API response
        let textAnnotations = result.responses[0].textAnnotations;

        //Delete first record because it contains all the text in field locale 
        textAnnotations.shift();

        //Delete titles
        let targetObject = textAnnotations.find(obj => obj.description === '*');
        while (targetObject) {
            const xValue = targetObject.boundingPoly.vertices[0].x;
            textAnnotations = textAnnotations.filter(obj => {
                const currentX = obj.boundingPoly.vertices[0].x;
                return currentX < xValue - 100 || currentX > xValue + 100;
            });
            targetObject = textAnnotations.find(obj => obj.description === '*');
        }

        //Delete rest after  total
        const totalObject = textAnnotations.find(obj => obj.description === 'TOTAL');
        if (totalObject) {
            const xValue = totalObject.boundingPoly.vertices[0].x;
            const filteredTextAnnotations = textAnnotations.filter(obj => obj.boundingPoly.vertices[0].x <= xValue + 60);
            textAnnotations = filteredTextAnnotations;
        } else {
            console.log("Object with description 'TOTAL' not found.");
        }

        //Delete big text and the text found on the back of the receipt
        textAnnotations = textAnnotations.filter(obj => {
            const firstX = obj.boundingPoly.vertices[0].x;
            const lastX = obj.boundingPoly.vertices[obj.boundingPoly.vertices.length - 1].x;
            return Math.abs(firstX - lastX) <= 130;
        });

        //Group words to unified product name
        let groupedX = [];
        let currentGroup = null;

        for (let i = 0; i < textAnnotations.length; i++) {
            const currentX = textAnnotations[i].boundingPoly.vertices[0].x;

            if (!currentGroup || Math.abs(currentGroup.firstX - currentX) > 40) {
                // Create a new group
                currentGroup = {
                    firstX: currentX,
                    descriptions: [textAnnotations[i].description],
                    vertices: textAnnotations[i].boundingPoly.vertices
                };
                groupedX.push(currentGroup);
            } else {
                // Add to the existing group
                currentGroup.descriptions.push(textAnnotations[i].description);
                currentGroup.vertices = currentGroup.vertices.concat(textAnnotations[i].boundingPoly.vertices);
            }
        }

        console.log(groupedX);

        // Create purchase lines
        let purchaseLines = [];

        for (let i = 0; i < groupedX.length; i++) {
            const currentGroup = groupedX[i];
            const firstX = currentGroup.firstX;

            // Check if the current group has already been used
            if (!currentGroup.used) {
                let closestGroup = null;
                let closestDiff = Infinity;

                // Find the closest group with the smallest absolute difference in firstX
                for (let j = i + 1; j < groupedX.length; j++) {
                    const diff = Math.abs(groupedX[j].firstX - firstX);
                    if (!groupedX[j].used && diff < closestDiff) {
                        closestGroup = groupedX[j];
                        closestDiff = diff;
                    }
                }

                if (closestGroup) {
                    // Create a new purchaseLine object
                    const purchaseLine = {
                        productName: { description: currentGroup.descriptions.join(' ') },
                        productPrice: null
                    };

                    if (closestDiff <= 35) { // Check if the closest difference is not higher than 35 ** this method maybe replaced by smart comparison algorythm
                        if (closestGroup === groupedX[i + 1]) {
                            // The closest group is exactly the following element
                            // Keep the closest element for later processing
                            closestGroup.keep = true;
                        } else {
                            // Assign values to productPrice field
                            purchaseLine.productPrice = { description: closestGroup.descriptions.join(' ') };

                            // Mark both groups as used
                            currentGroup.used = true;
                            closestGroup.used = true;
                        }
                    }

                    // Add the purchaseLine object to purchaseLines array
                    purchaseLines.push(purchaseLine);
                }
            }
        }

        //Calculate RABAT 
        for (let i = 0; i < purchaseLines.length; i++) {
            const currentProduct = purchaseLines[i];
            const nextProduct = purchaseLines[i + 1];

            // Get the next product name
            const nextProductName = nextProduct?.productName?.description || '';

            //Find RABAT
            if (nextProductName === 'RABAT') {
                let currentProductPrice = 0;
                let nextProductPrice = 0;

                if (currentProduct.productPrice !== null && !isNaN(parseFloat(currentProduct.productPrice.description))) {
                    currentProductPrice = parseFloat(currentProduct.productPrice.description);
                }

                if (nextProduct.productPrice !== null && !isNaN(parseFloat(nextProduct.productPrice.description))) {
                    nextProductPrice = parseFloat(nextProduct.productPrice.description);
                }

                let productPrice = currentProductPrice - nextProductPrice;
                purchaseLines[i].productPrice.description = productPrice.toString();
            }
        }

        //Delete RABAT and PANT lines
        for (let i = 0; i < purchaseLines.length; i++) {
            const purchaseLine = purchaseLines[i];

            if (purchaseLine.productName.description === 'RABAT' || purchaseLine.productName.description === 'PANT') {
                purchaseLines.splice(i, 1);
                i--; // Update the loop index to account for the removed purchaseLine
            }
        }

        // Create purchases
        // Initialize purchasesList array
        let purchasesList = [];

        // Loop through the purchaseLines array
        for (let i = 0; i < purchaseLines.length; i++) {
            const currentProduct = purchaseLines[i];
            const nextProduct = purchaseLines[i + 1];
            if (currentProduct.productPrice !== null) {
                // Option: productPrice is not null
                const total = currentProduct.productPrice.description;
                const purchase = createPurchase(
                    0,
                    currentProduct.productName?.description || '',
                    1,
                    total,
                    null,
                    0,
                    0
                );
                purchasesList.push(purchase);
            } else {
                //Option: productPrice is null or undefined
                // Get the next product name
                const nextProductName = nextProduct?.productName?.description || '';

                if (/^\d\sx\s\d+(,\d{1,2})?$/.test(nextProductName)) {
                    // Option 3b: productName matches the regex pattern
                    const amount = parseInt(nextProductName.match(/^\d+/)[0]);
                    const total = nextProduct.productPrice.description;

                    const purchase = createPurchase(
                        0,
                        currentProduct.productName?.description || '',
                        amount,
                        total,
                        null,
                        0,
                        0
                    );
                    purchasesList.push(purchase);
                }
            }

        }

        // Delete lines with product quantity and price
        let regex = /^\d+\s*x\s*\d+,\d+$/;

        let finalPurchasesList = purchasesList.filter(item => !regex.test(item.productName));

        console.log(finalPurchasesList);

    } // end of algorythm


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.mainContainer}>

            {!imageUri && <View style={styles.cameraContainer}>
                <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back}>
                    <View style={styles.leftLine} />
                    <View style={styles.rightLine} />
                </Camera>
                <View style={styles.cameraBottomContainer}>
                    <TouchableOpacity style={styles.pictureShotButton} onPress={takePicture} />
                </View>
            </View>}

            {imageUri && <View style={styles.imageContainer}>
                <ImageBackground source={{ uri: imageUri }} style={styles.image}>
                    <View style={styles.leftLine} />
                    <View style={styles.rightLine} />
                </ImageBackground>
                <View style={styles.imageBottomContainer}>
                    <TouchableOpacity onPress={handlePhotoRetake} >
                        <Text style={[gStyles.defaultFont]} >Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendToGoogleVision}>
                        <Text style={[gStyles.defaultFont]} >Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
    );
};

export default ScanScreen;