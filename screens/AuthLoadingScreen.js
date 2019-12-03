import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export const USER_TOKEN = "auth-demo-key";

// export const onSignIn = () =>
//   AsyncStorage.setItem(USER_TOKEN, "true");

// console.log(AsyncStorage.clear());

// export const isSignedIn = async () => {
//   try {
//     let res = await AsyncStorage.getItem(USER_TOKEN);
//     if (res !== null) {
//       //   this.props.navigation.navigate("Main");
//       return true;
//     } else {
//       //   this.props.navigation.navigate("Auth");
//       //   console.log("this is res", res);
//       return false;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

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
  //   async componentDidMount() {
  //     // this._bootstrapAsync()
  //     try {
  //       await isSignedIn();
  //       return this.setState({ signedIn: res, checkedSignIn: true });
  //     } catch (error) {
  //       alert("An error has occured");
  //     }

  componentDidMount() {
    this.__isMounted = true;
    isSignedIn().then(res => {
      if (this.__isMounted) {
        this.setState({ signedIn: res, checkedSignIn: true });
      }
    });
    //   .catch(err => alert("An error occurred"));
    //   }

    // Fetch the token from storage then navigate to our appropriate place
    //   _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem(email);
    // console.log("--------", userToken);

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
