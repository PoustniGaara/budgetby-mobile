import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import styles from './NameModal.style';
import gStyles from '../../../../globalStyles';
import globalColors from '../../../../globalColors';
import { useNavigation } from '@react-navigation/native';

export default function NameModal({ onNavigate, productName, setProductName }) {

    const navigation = useNavigation();

    // const [name, setName] = useState('');

    const buttonPressed = () => {
        onNavigate('quantityModal');
    }

    return (
        <View style={styles.mainContainer} >
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.contentContainer} >
                    <Text style={[gStyles.bigBoldFont, styles.titleText]}>Product Name?</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Name' style={[gStyles.addPurchaseFont, styles.textInput]} onChangeText={setProductName} />
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.modalNavigationFooter]}>
                <TouchableOpacity style={[styles.footerButton, productName ? styles.enabledFooterButtonColor : styles.disabledFooterButtonColor]} disabled={!productName} onPress={buttonPressed} >
                    <Text style={productName ? gStyles.defaultBoldFont : gStyles.disabledBoldFont} >Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

