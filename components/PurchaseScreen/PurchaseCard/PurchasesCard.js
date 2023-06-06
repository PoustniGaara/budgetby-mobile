import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Styling
import styles from "./PurchasesCard.style";
import gStyles from "../../../globalStyles";
import colors from '../../../globalColors';

const PurchasesCard = ({ purchase, isLast }) => {

    //variables
    let productName = purchase.productName;
    let amount = purchase.amount;
    let price = purchase.total;
    let bottomBorderStyle = isLast ? {} : styles.bottomBorder; // If the card is last in the list then bottom border should not be displayed

    return (
        <View style={[bottomBorderStyle, styles.mainContainer]}>
            <View style={[styles.itemContainer1]}>
                <Text style={[gStyles.grayFont, gStyles.itemDescribeSize]}>Product</Text>
                <Text style={[gStyles.defaultFont]}>{productName}</Text>
            </View>
            <View style={[styles.itemContainer2]}>
                <Text style={[gStyles.grayFont, gStyles.itemDescribeSize]}>Amount</Text>
                <Text style={[gStyles.defaultFont]}>{amount}</Text>
            </View>
            <View style={[styles.itemContainer3]}>
                <Text style={[gStyles.grayFont, gStyles.itemDescribeSize]}>Price</Text>
                <Text style={[gStyles.defaultFont]}>{price}DKK</Text>
            </View>
            <AntDesign name='infocirlceo' size={26} color={colors.interactiveBlue} style={styles.infoLogo} />
        </View>
    );
};

export default PurchasesCard;