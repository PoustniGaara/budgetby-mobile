import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from "./Class.style";
import gStyles from "../../../globalStyles";

const Class = () => {
    return (
        <View style={[styles.container, gStyles.cardContainer]}>
            <View style={[styles.topContainer]}></View>
            <View style={[styles.midContainer]}></View>
            <View style={[styles.bottomContainer]}></View>
        </View>
    );
};

export default Class;