import { StyleSheet } from "react-native";
import globalColors from "../../../../globalColors";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: globalColors.darkTheme,
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    scrollContainer: {
        width: '100%',
        flex: 1,
    },
    titleText: {
        marginVertical: 20,
        marginTop: 90,
    },
    inputContainer: {
        paddingVertical: 20,
        marginVertical: 50,
        backgroundColor: globalColors.cardGrey,
        width: '90%',
        borderRadius: 15,
        paddingHorizontal: 30,
    },
    textInput: {
        MaxWidth: '80%',
        MinWidth: '80%',
        textAlign: 'center',
    },
    modalNavigationFooter: {
        backgroundColor: globalColors.cardGrey,
        height: '20%',
        alignItems: 'center',
    },
    disabledFooterButtonColor: {
        backgroundColor: '#3E3D41',
    },
    enabledFooterButtonColor: {
        backgroundColor: globalColors.interactiveBlue,
    },
    footerButton: {
        height: '30%',
        width: '90%',
        marginTop: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export default styles;
