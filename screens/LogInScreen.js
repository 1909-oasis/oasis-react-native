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
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.nativeEvent.name]: event.nativeEvent.value
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();
    this._signInAsync(this.state.email, this.state.password);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  }

  static navigationOptions = {
    title: "Log In / Sign Up"
  };

  render() {
    // const { login, email, password, firstName, lastName } = this.state;
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
          <TextInput
            style={{
              height: 40,
              width: 150,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            key={0}
            placeholder="First Name"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChangeText={text => this.setState({ firstName: text })}
            returnKeyType="next"
          />,
          <TextInput
            style={{
              height: 40,
              width: 150,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            key={1}
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChangeText={text => this.setState({ lastName: text })}
            returnKeyType="next"
          />
        ]}
        <TextInput
          style={{
            height: 40,
            width: 150,
            borderBottomWidth: 1,
            borderBottomColor: "#000000"
          }}
          placeholder="Email"
          type="text"
          name="email"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          returnKeyType="next"
        />
        <TextInput
          style={{
            height: 40,
            width: 150,
            borderBottomWidth: 1,
            borderBottomColor: "#000000"
          }}
          placeholder="Password"
          type="text"
          name="password"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          // This secures user input for a field.
          secureTextEntry={true}
          returnKeyType="done"
        />
        <Button
          title={this.state.login ? "Log In" : "Sign Up"}
          onPress={this.handleSubmit}
        />
        {!this.state.login && [
          <Text key={2}>Already have an account?</Text>,
          <Button
            title="Log In"
            onPress={() => {
              this.setState({ login: !login });
            }}
            key={3}
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
