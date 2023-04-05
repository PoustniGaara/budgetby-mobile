import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    leftContainer: {
        paddingHorizontal: 10,
        // paddingVertical: 10,
        paddingBottom: 5,
        paddingTop: 10,
    },
    badge: {
        padding: 10,
        borderRadius: 20,
        width: 120,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',

    },
    rightContainer: {
        flexDirection: 'row',
        flex: 1,
        // paddingVertical: 20,
        paddingTop: 20,
        paddingBottom: 5,
        paddingRight: 10,
        alignItems: 'center',
    },
    bottomBorder: {
        borderBottomWidth: 2,
        borderBottomColor: '#858587',
    },
    firstChild: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 80,
    },
    amount: {
        fontWeight: 'bold',
    },


});

export default styles;
