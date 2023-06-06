import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Local
import NameModal from './NameModal/NameModal';
import QuantityModal from './QuantityModal/QuantityModal';
import PriceModal from './PriceModal/PriceModal';
import { createPurchaseControl } from '../../../control/PurchaseControl';
import { AddNewPurchaseToCurrentSheet } from '../../../redux/SheetsSlice';

//Styles
import styles from './AddPurchaseModal.style';
import gStyles from '../../../globalStyles';
import { createPurchase } from '../../../models/Purchase';


export default function AddPurchaseModal({ visible, onClose, parentItemId }) {

    const dispatch = useDispatch();

    const [currentScreen, setCurrentScreen] = useState('nameModal');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState(0);

    const handleNavigate = (screen) => {
        setCurrentScreen(screen);
    };

    let currentCategory = useSelector((state) => state.categories.currentCategory);
    let currentItem = useSelector((state) => state.items.currentItem);

    const handleCreatePurchase = async () => {
        console.log(`productPrice: ${productPrice}`);



        let purchase = createPurchase(0, productName, parseInt(productQuantity), parseInt(productPrice), dateString, parentItemId, supplierId);
        console.log(purchase);

        let newPurchaseInputDataObject = {
            currentCategoryId: currentCategory.id,
            currentItemId: currentItem.id,
            purchase: purchase
        }

        // dispatch(AddNewPurchaseToCurrentSheet(newPurchaseInputDataObject));
        await createPurchaseControl(dispatch, newPurchaseInputDataObject);
        onClose();
    }

    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    const supplierId = 1;

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalNavigationHeader}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <AntDesign name='closecircle' size={26} color='white' />
                    </TouchableOpacity>
                </View>
                {currentScreen === 'nameModal' && <NameModal onNavigate={handleNavigate} setProductName={setProductName} productName={productName} />}
                {currentScreen === 'quantityModal' && <QuantityModal onNavigate={handleNavigate} setProductQuantity={setProductQuantity} productQuantity={productQuantity} />}
                {currentScreen === 'priceModal' && <PriceModal onNavigate={handleNavigate} onPurchaseCreate={handleCreatePurchase} productPrice={productPrice} setProductPrice={setProductPrice} />}
            </View>
        </Modal>
    );
}

