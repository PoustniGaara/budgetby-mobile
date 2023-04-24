import { StyleSheet } from "react-native";
import globalColors from "../../../globalColors";

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 10,
        flex: 1,
    },
    modalNavigationHeader: {
        backgroundColor: globalColors.darkTheme,
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    closeButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },



});

export default styles;
