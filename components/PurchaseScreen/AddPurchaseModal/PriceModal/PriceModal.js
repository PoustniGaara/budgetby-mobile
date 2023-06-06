import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import styles from './PriceModal.style';
import gStyles from '../../../../globalStyles';
import globalColors from '../../../../globalColors';

export default function PriceModal({ onNavigate, onPurchaseCreate, productPrice, setProductPrice }) {

    const [total, setTotal] = useState(0);

    const buttonPressed = async () => {
        await onPurchaseCreate();
        onNavigate('nameModal');
    }

    return (
        <View style={styles.mainContainer} >
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.contentContainer} >

                    <Text style={[gStyles.bigBoldFont, styles.titleText]}>Total Price?</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='0 DKK' style={[gStyles.addPurchaseFont, styles.textInput]} keyboardType='numeric' onChangeText={setProductPrice} />
                        {/* <Text style={[gStyles.addPurchaseFont, styles.text Input, styles.euroSymbol]}>€</Text> */}
                    </View>
                </View>

            </ScrollView>
            <View style={[styles.modalNavigationFooter]}>
                <TouchableOpacity style={[styles.footerButton, productPrice ? styles.enabledFooterButtonColor : styles.disabledFooterButtonColor]} disabled={!productPrice} onPress={buttonPressed} >
                    <Text style={productPrice ? gStyles.defaultBoldFont : gStyles.disabledBoldFont} >Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

