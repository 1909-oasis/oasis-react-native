import React from "react";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";

export default class LogIn extends React.Component {
  static navigationOptions = {
    title: "Log In"
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <Text>Log In</Text>
        <Text>email:</Text>
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderBottomWidth: 1,
            borderBottomColor: "#000000"
          }}
        />
        <Text>password:</Text>
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderBottomWidth: 1,
            borderBottomColor: "#000000"
          }}
          // This blocks user input for a field.
          secureTextEntry={true}
        />
        <Button title="Log In" onPress={this._signInAsync} />
      </View>
    );
  }
  // This is dummy information that lets you get past the log in screen for now.
  // _signInAsync = async () => {
  //   await AsyncStorage.setItem("userToken", "abc");
  //   this.props.navigation.navigate("App");
  // };
}
