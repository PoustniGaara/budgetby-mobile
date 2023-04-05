import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    mainContainer: {
        // paddingTop: 30,
        // paddingHorizontal: 10,
    },
    overview: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    topContainer: {
        flexDirection: 'row',
    },
    monthlyAverageText: {
        paddingTop: 10,
    },
    monthlyAverageNumber: {
        paddingTop: 5,
        fontSize: 42,
        color: '#fefffe',
    },
    middleContainer: {

    },
    bottomContainer: {
        borderTopWidth: 1,
    },
    seeHistory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },

});

export default styles;
