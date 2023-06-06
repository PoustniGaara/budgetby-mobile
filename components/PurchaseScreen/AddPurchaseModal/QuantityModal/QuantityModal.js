import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import styles from './QuantityModal.style';
import gStyles from '../../../../globalStyles';
import globalColors from '../../../../globalColors';

export default function QuantityModal({ onNavigate, setProductQuantity, productQuantity }) {

    const [name, setName] = useState('');

    const buttonPressed = () => {
        onNavigate('priceModal');
    }

    return (
        <View style={styles.mainContainer} >
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.contentContainer} >

                    <Text style={[gStyles.bigBoldFont, styles.titleText]}>Quantity?</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='0' style={[gStyles.addPurchaseFont, styles.textInput]} keyboardType='numeric' onChangeText={setProductQuantity} />
                    </View>
                </View>

            </ScrollView>
            <View style={[styles.modalNavigationFooter]}>
                <TouchableOpacity style={[styles.footerButton, productQuantity ? styles.enabledFooterButtonColor : styles.disabledFooterButtonColor]} disabled={!productQuantity} onPress={buttonPressed} >
                    <Text style={productQuantity ? gStyles.defaultBoldFont : gStyles.disabledBoldFont} >Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

