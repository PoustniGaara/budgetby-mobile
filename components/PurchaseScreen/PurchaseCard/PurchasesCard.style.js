import { StyleSheet } from "react-native";
import colors from '../../../globalColors';

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginLeft: 15,
        alignItems: 'center',
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrey,
    },
    itemContainer1: {
        // paddingLeft: 5,
    },
    itemContainer3: {
        paddingRight: 10,
    },
    infoLogo: {
        paddingRight: 15,
    }

});

export default styles;
