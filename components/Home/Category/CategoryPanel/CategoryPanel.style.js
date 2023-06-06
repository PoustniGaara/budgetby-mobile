import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    overview: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    topContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topLeftContainer: {
        marginLeft: 10,
    },
    topRightContainer: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    totalText: {
        paddingTop: 10,
    },
    totalNumber: {
        fontSize: 34,
        color: '#fefffe',
    },
    categoryContainer: {
        marginBottom: 15,
    },

});

export default styles;
