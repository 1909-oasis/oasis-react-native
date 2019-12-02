import React from "react";
import { AsyncStorage, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this._signInAsync(this.state.email, this.state.password);
  //   this.setState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: ""
  //   });
  // }

  static navigationOptions = {
    title: "Log In"
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <Card>
          <Input
            inputContainerStyle={{
              height: 40,
              width: 300,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            label="Email"
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
            returnKeyType="next"
          />
          <Input
            inputContainerStyle={{
              height: 40,
              width: 300,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            label="Password"
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            // This secures user input for a field.
            secureTextEntry={true}
            returnKeyType="done"
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            title="Log In"
            onPress={this.handleSubmit}
          />
          <Button
            type="clear"
            textStyle={{ color: "bcbec1" }}
            title="Sign Up"
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
        </Card>
      </View>
    );
  }
  // This is dummy information that lets you get past the log in screen for now.
  _signInAsync = async (email, password) => {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    this.props.navigation.navigate("Main");
  };
}
