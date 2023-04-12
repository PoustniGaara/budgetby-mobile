import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import styles from "./CategoryCard.style";
import gStyles from "../../../../globalStyles";

const CategoryCard = ({ name, color, total, isLast }) => {

    //consts
    const navigation = useNavigation();

    //variables
    let bottomBorderStyle = isLast ? {} : styles.bottomBorder; // If the card is last in the list then bottom border should not be displayed

    const handleClick = () => {
        navigation.navigate('ItemScreen', { headerTitle: `${name}` });
    };

    return (
        <TouchableOpacity style={[styles.mainContainer]} onPress={handleClick}>
            <View style={[styles.leftContainer]}>
                <View style={[styles.badge, { backgroundColor: color }]}></View>
            </View>
            <View style={[styles.rightContainer, bottomBorderStyle]}>
                <Text style={[gStyles.defaultFont, styles.categoryName]}>{name}</Text>
                <Text style={[gStyles.defaultFont, styles.firstChild]}> <Text style={styles.amount}>{total}</Text> €</Text>
                <AntDesign name="right" size={20} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export default CategoryCard;