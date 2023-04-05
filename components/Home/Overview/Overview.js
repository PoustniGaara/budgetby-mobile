import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from "./Overview.style";
import gStyles from "../../../globalStyles";

const Overview = () => {

    let currentMonth = 'April'
    let userName = 'Viktor' //userName should be drilled from the actuall user name
    let monthlyAverage = 250; // should be coresponding calculated value

    return (
        <View style={[styles.mainContainer, gStyles.cardContainer]}>
            <Text style={[gStyles.titleFont, styles.overview]}>{userName}'s Overview</Text>
            <View style={gStyles.card}>
                <View style={[styles.topContainer]}>
                    <View style={styles.topLeftContainer}>
                        <Text style={[gStyles.defaultFont, styles.monthlyAverageText]}>Monthly Average</Text>
                        <Text style={[styles.monthlyAverageNumber]}>{monthlyAverage}€</Text>
                    </View>

                </View>
                <View style={styles.middleContainer}>
                    <AntDesign name='linechart' size={120} color="cyan"  ></AntDesign>
                </View>
                <View style={[gStyles.lightBorderColor, styles.bottomContainer]}>
                    <TouchableOpacity style={[styles.seeHistory]}>
                        <Text style={[gStyles.defaultFont]}>See History</Text>
                        <AntDesign name="right" size={24} color="white" style={styles.lastChild} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Overview;