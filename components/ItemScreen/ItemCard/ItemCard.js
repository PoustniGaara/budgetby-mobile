import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../globalColors';
import styles from "./ItemCard.style";
import gStyles from "../../../globalStyles";

const ItemCard = ({ name, color, bodyColor, total, isLast }) => {

    const navigation = useNavigation();

    //variables
    let bottomBorderStyle = isLast ? {} : styles.bottomBorder; // If the card is last in the list then bottom border should not be displayed

    const handleClick = () => {
        navigation.navigate('PurchaseScreen', { headerTitle: `${name}` });
    };

    return (
        <TouchableOpacity style={[styles.mainContainer]} onPress={handleClick} >
            <View style={[styles.leftContainer]}>
                <View style={[styles.badge, { backgroundColor: color }]}></View>
            </View>
            <View style={[styles.rightContainer, bottomBorderStyle]}>
                <Text style={[gStyles.defaultFont, styles.itemName]}>{name}</Text>
                <Text style={[gStyles.defaultFont, styles.firstChild]}> <Text style={gStyles.grayFont}>{total}€</Text> </Text>
                <AntDesign name="right" size={20} color={colors.borderGrey} />
            </View>
        </TouchableOpacity>
    );
};

export default ItemCard;