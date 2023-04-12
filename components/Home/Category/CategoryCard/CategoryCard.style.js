import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: 'center',
    },
    badge: {
        padding: 10,
        borderRadius: 20,
        width: 30,
        height: 30,
    },
    rightContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 20,
        paddingBottom: 5,
        paddingRight: 10,
        alignItems: 'center',
    },
    categoryName: {
        flex: 1,
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#858587',
    },
    firstChild: {
        flex: 1,
        justifyContent: 'center',
    },
    amount: {
        fontWeight: 'bold',
    },


});

export default styles;
