import React, { useState } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

//Local import
import PurchasesCard from './PurchaseCard/PurchasesCard';
import AddPurchaseModal from './AddPurchaseModal/AddPurchaseModal';

//Styles
import styles from './PurchaseScreen.style';
import gStyles from '../../globalStyles';
import colors from '../../globalColors';

export default function PurchaseScreen() {

    const [modalVisible, setModalVisible] = useState(false);

    //Stack screen header title logic
    const navigation = useNavigation();
    const route = useRoute();
    const { headerTitle } = route.params;

    const data = 0; // this should be real array of data

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderComponent = () => {
        if (data && data.length > 0) {
            return data.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text>{item}</Text>
                    <PurchasesCard isLast={false} />
                    <PurchasesCard isLast={false} />
                    <PurchasesCard isLast={false} />
                    <PurchasesCard isLast={true} />
                </View>
            ));
        } else {
            return (
                < View >
                    <Text style={[styles.noPurchasesText, gStyles.grayFont]}>Pridajte nákupy naskenovaním bločku alebo manuálne.</Text>
                </View >
            );
        }
    };

    return (
        <ScrollView style={[gStyles.darkTheme, styles.container]}>
            <View style={gStyles.cardContainer} >
                <View style={styles.titleContainer}>
                    <Text style={[gStyles.cardTitle, gStyles.titleFont]}>{headerTitle}</Text>
                    <Button title='Pridať Nákup' style={[gStyles.defaultFontSize, styles.addButton]} onPress={openModal} ></Button>
                </View>
                <View style={gStyles.card}>
                    {renderComponent()}
                </View>
            </View>
            <AddPurchaseModal visible={modalVisible} onClose={closeModal} />
        </ScrollView>
    );
}

