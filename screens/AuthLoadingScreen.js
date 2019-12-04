import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { USER_TOKEN } from "../constants/constants";

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_TOKEN)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

class AuthLoadingScreen extends React.Component {
  __isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false, // Determines if you are sent to Main or to Auth
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    this.__isMounted = true;
    isSignedIn().then(res => {
      if (this.__isMounted) {
        this.setState({ signedIn: res, checkedSignIn: true });
      }
    });

    // This will switch to the Main screen or the Auth screen and this loading screen will be unmounted and thrown away.
    // Commented out the first part of the ternary
    this.props.navigation.navigate(
      this.state.signedIn ? "Main" : "Auth"
    );
  }

  componentWillUnmount() {
    this.__isMounted = false;
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
