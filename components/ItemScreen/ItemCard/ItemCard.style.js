import { StyleSheet } from "react-native";
import colors from '../../../globalColors';


const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    badge: {
        padding: 5,
        borderRadius: 20,
        width: 5,
        height: 5,
    },
    rightContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 15,
        paddingRight: 10,
        alignItems: 'center',
    },
    itemName: {
        flex: 2,
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrey,
    },
    firstChild: {
        flex: 0.5,
        justifyContent: 'center',
    },
});

export default styles;
