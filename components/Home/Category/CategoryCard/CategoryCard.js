import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
        navigation.navigate('Category');
    };

    return (
        <TouchableOpacity style={[styles.mainContainer, bottomBorderStyle]} onPress={handleClick}>
            <View style={[styles.leftContainer]}>
                <View style={[styles.badge, { backgroundColor: color }]}>
                    <Text style={[gStyles.defaultFont]}>{name}</Text>
                </View>
            </View>
            <View style={[styles.rightContainer]}>
                <Text style={[gStyles.defaultFont, styles.firstChild]}> <Text style={styles.amount}>{total}</Text> €</Text>
                <AntDesign name="right" size={20} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export default CategoryCard;