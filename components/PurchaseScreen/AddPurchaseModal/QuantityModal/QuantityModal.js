import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import styles from './QuantityModal.style';
import gStyles from '../../../../globalStyles';
import globalColors from '../../../../globalColors';

export default function QuantityModal() {

    const [name, setName] = useState('');

    const buttonPressed = () => {

    }

    return (
        <View style={styles.mainContainer} >
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.contentContainer} >

                    <Text style={[gStyles.bigBoldFont, styles.titleText]}>QuantityModal</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Názov' style={[gStyles.addPurchaseFont, styles.textInput]} onChangeText={setName} />
                    </View>
                </View>

            </ScrollView>
            <View style={[styles.modalNavigationFooter]}>
                <TouchableOpacity style={[styles.footerButton, name ? styles.enabledFooterButtonColor : styles.disabledFooterButtonColor]} disabled={!name} onPress={buttonPressed} >
                    <Text style={name ? gStyles.defaultBoldFont : gStyles.disabledBoldFont} >Ďalej</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

