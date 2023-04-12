import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import styles from './NameModal.style';
import gStyles from '../../../../globalStyles';

export default function NameModal({ visible, onClose }) {

    return (
        <ScrollView style={styles.scrollContainer} >
            <View style={styles.mainContainer}>
                <Text style={[gStyles.bigBoldFont, styles.titleText]}>Názov produktu?</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Názov' style={[gStyles.addPurchaseFont, styles.textInput]}></TextInput>
                </View>
            </View>
        </ScrollView>
    );
}

