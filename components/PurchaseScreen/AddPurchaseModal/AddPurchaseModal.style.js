import { StyleSheet } from "react-native";
import globalColors from "../../../globalColors";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        borderRadius: 10,
        width: '100%',
        height: '94%',
        justifyContent: 'flex-end',
    },
    modalNavigationHeader: {
        backgroundColor: globalColors.darkTheme,
        padding: 10,
        paddingBottom: 40,
    },
    modalNavigationFooter: {
        backgroundColor: globalColors.cardGrey,
        height: '20%',
        alignItems: 'center',
    },
    disabledFooterButtonColor: {
        backgroundColor: '#3E3D41',
    },
    footerButton: {
        height: '30%',
        width: '90%',
        marginTop: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;
