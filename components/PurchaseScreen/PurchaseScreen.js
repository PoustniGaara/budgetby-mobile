import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

//Local import
import PurchasesCard from './PurchaseCard/PurchasesCard';
import AddPurchaseModal from './AddPurchaseModal/AddPurchaseModal';
import { setCurrentItem } from '../../redux/ItemsSlice';

//Styles
import styles from './PurchaseScreen.style';
import gStyles from '../../globalStyles';
import colors from '../../globalColors';

export default function PurchaseScreen() {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [purchaseCards, setPurchaseCards] = useState([]);

    //Stack screen header title logic
    const navigation = useNavigation();
    const route = useRoute();
    const { parentItem } = route.params;

    const currentSheet = useSelector((state) => state.sheets.currentSheet);
    const currentCategoryId = useSelector((state) => state.categories.currentCategory.id);
    // const currentItemId = useSelector((state) => state.items.currentItem.id);

    useEffect(() => {

        dispatch(setCurrentItem(parentItem));

        const category = currentSheet.categories.find((category) => category.id === currentCategoryId);
        if (!category) return null;

        const item = category.items.find((item) => item.id === parentItem.id);
        if (!item) return null;

        let purchaseCards = item.purchases.map((purchase, index) => (
            <PurchasesCard
                key={purchase.id}
                purchase={purchase}
                isLast={index === item.length - 1}
            />
        ));

        setPurchaseCards(purchaseCards);

    }, [dispatch, parentItem, currentSheet]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderComponent = () => {
        if (purchaseCards.length > 0) {
            return (purchaseCards);
        } else {
            return (
                < View >
                    <Text style={[styles.noPurchasesText, gStyles.grayFont]}>No purchases to display.</Text>
                </View >
            );
        }
    };

    return (
        <ScrollView style={[gStyles.darkTheme, styles.container]}>
            <View style={gStyles.cardContainer} >
                <View style={styles.titleContainer}>
                    <Text style={[gStyles.cardTitle, gStyles.titleFont]}>{parentItem.name}</Text>
                    <Button title='Add Purchase' style={[gStyles.defaultFontSize, styles.addButton]} onPress={openModal} ></Button>
                </View>
                <View >
                    {renderComponent()}
                </View>
            </View>
            <AddPurchaseModal visible={modalVisible} onClose={closeModal} parentItemId={parentItem.id} />
        </ScrollView>
    );
}

