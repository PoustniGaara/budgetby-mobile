import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Local
import NameModal from './AddNameModal/NameModal';

//Styles
import styles from './AddPurchaseModal.style';
import gStyles from '../../../globalStyles';

export default function AddPurchaseModal({ visible, onClose }) {

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalNavigationHeader}>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name='closecircle' size={26} color='white' />
                        </TouchableOpacity>
                    </View>
                    <NameModal />
                    <View style={[styles.modalNavigationFooter]}>
                        <TouchableOpacity style={[styles.footerButton, styles.disabledFooterButtonColor]} >
                            <Text style={[gStyles.defaultBoldFont]} >Ďalej</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

