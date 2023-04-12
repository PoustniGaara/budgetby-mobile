import { StyleSheet } from "react-native";
import globalColors from "../../../../globalColors";

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: globalColors.darkTheme,
    },
    mainContainer: {
        alignItems: 'center',
    },
    titleText: {
        marginVertical: 20,
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
        textAlign: 'center',
    },

});

export default styles;
