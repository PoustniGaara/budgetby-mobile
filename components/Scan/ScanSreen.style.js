import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    leftLine: {
        position: 'absolute',
        top: 30,
        bottom: 10,
        left: 60,
        width: 4,
        backgroundColor: 'red',
    },
    rightLine: {
        position: 'absolute',
        top: 30,
        bottom: 10,
        right: 60,
        width: 4,
        backgroundColor: 'red',
    },
    cameraBottomContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        backgroundColor: 'black',
    },
    pictureShotButton: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 60,
        backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    imageBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        backgroundColor: 'black',
        paddingHorizontal: 20,
    },
});

export default styles;
