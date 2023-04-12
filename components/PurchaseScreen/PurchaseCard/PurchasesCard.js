import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Styling
import styles from "./PurchasesCard.style";
import gStyles from "../../../globalStyles";
import colors from '../../../globalColors';

const PurchasesCard = ({ isLast }) => {

    //variables
    let productName = 'Kuracie prsia 1.5 kg';
    let amount = 1;
    let price = 5.30;
    let bottomBorderStyle = isLast ? {} : styles.bottomBorder; // If the card is last in the list then bottom border should not be displayed


    return (
        <View style={[bottomBorderStyle, styles.mainContainer]}>
            <View style={[styles.itemContainer1]}>
                <Text style={[gStyles.grayFont, gStyles.itemDescribeSize]}>Product</Text>
                <TextInput style={[gStyles.defaultFont]}>{productName}</TextInput>
            </View>
            <View style={[styles.itemContainer2]}>
                <Text style={[gStyles.grayFont, gStyles.itemDescribeSize]}>Amount</Text>
                <TextInput style={[gStyles.defaultFont]}>{amount}</TextInput>
            </View>
            <View style={[styles.itemContainer3]}>
                <Text style={[gStyles.grayFont, gStyles.itemDescribeSize]}>Price</Text>
                <TextInput style={[gStyles.defaultFont]}>{price}€</TextInput>
            </View>
            <AntDesign name='infocirlceo' size={26} color={colors.interactiveBlue} style={styles.infoLogo} />
        </View>
    );
};

export default PurchasesCard;