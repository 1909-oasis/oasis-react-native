import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

export const USER_TOKEN = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_TOKEN, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_TOKEN);

export const isSignedIn = () => {
  return async (resolve, reject) => {
    const res = await AsyncStorage.getItem(USER_TOKEN);
    try {
      if (res !== null) {
        this.props.navigation.navigate("Main");
        resolve(true);
      } else {
        this.props.navigation.navigate("Auth");
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  };
};

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false, // Determines if you are sent to Main or to Auth
      checkedSignIn: false
    };
  }
  componentDidMount() {
    // this._bootstrapAsync();
    isSignedIn();
    try {
      async res => await this.setState({ signedIn: res, checkedSignIn: true });
    } catch (error) {
      alert("An error has occured");
    }
    //   }

    // Fetch the token from storage then navigate to our appropriate place
    //   _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem(email);
    // console.log("--------", userToken);

    // This will switch to the Main screen or the Auth screen and this loading screen will be unmounted and thrown away.
    // Commented out the first part of the ternary
    this.props.navigation.navigate(this.state.signedIn ? "Main" : "Auth");
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
