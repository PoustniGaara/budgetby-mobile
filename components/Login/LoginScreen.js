import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import styles from '../../globalStyles';
import { Input, Button } from '@rneui/themed';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const LoginScreen = () => {

  //Google sign in
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };
  //End of Google sign in

  return (
    <View style={style.structure1}>
      <Text style={[styles.bigSolidText, style.loginText]}>Login</Text>
      <Text>Please sign in to continue.</Text>
      <Input
        placeholder='EMAIL'
        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
      />
      <Input
        placeholder='PASSWORD'
        leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
      />
      <Button
        title={'Login'}
      />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
      />
      <View style={style.singUpView}>
        <Text>Don't Have an account?</Text>
        <Button title={'Sing up'} type="clear" />
      </View>

    </View>
  )
}

const style = StyleSheet.create({
  structure1: {
    paddingHorizontal: '10%'
  },
  singUpView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '60%',
  },
  loginText: {
    marginTop: '60%',
  },
});

export default LoginScreen