import React from "react";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    // event.preventDefault();
    this._signInAsync(this.state.email, this.state.password);
    // this.setState({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: ""
    // });
  }

  static navigationOptions = {
    title: "Log In / Sign Up"
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
        {/* Ternary to display Name fields if this is a Sign Up vs. Log In */}
        {!this.state.login && [
          <Text>First Name:</Text>,
          <TextInput
            style={{
              height: 40,
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            type="text"
            name="firstName"
            value={this.state.firstName}
            // onChange={this.handleChange}
          />,
          <Text>Last Name:</Text>,
          <TextInput
            style={{
              height: 40,
              width: 100,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        ]}
        <Text>Email:</Text>
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderBottomWidth: 1,
            borderBottomColor: "#000000"
          }}
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Text>Password:</Text>
        <TextInput
          style={{
            height: 40,
            width: 100,
            borderBottomWidth: 1,
            borderBottomColor: "#000000"
          }}
          type="text"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          // This secures user input for a field.
          secureTextEntry={true}
        />
        <Button
          title={this.state.login ? "Log In" : "Sign Up"}
          onPress={this.handleSubmit}
        />
        {!this.state.login && [
          <Text>Already have an account?</Text>,
          <Button
            title="Log In"
            onPress={() => {
              this.setState({ login: !login });
            }}
          />
        ]}
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
