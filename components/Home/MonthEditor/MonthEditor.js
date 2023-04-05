import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from "./MonthEditor.style";

const MonthEditor = () => {


    let currentMonth = 'April'

    return (
        <View style={styles.container}>
            <AntDesign name="left" size={24} color="black" style={styles.button} />
            <Text style={styles.text}>{currentMonth}</Text>
            <AntDesign name="right" size={24} color="black" style={styles.button} />
        </View>
    );
};

export default MonthEditor;