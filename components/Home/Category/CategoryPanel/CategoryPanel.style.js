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
    container: {
        backgroundColor: '#1c1c1e',
        borderRadius: 20,
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
        fontSize: 42,
        color: '#fefffe',
    },

});

export default styles;
