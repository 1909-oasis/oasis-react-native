import React from "react";
import {
  AsyncStorage,
  KeyboardAvoidingView,
  View,
  ImageBackground
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { USER_TOKEN } from "../constants/constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      user {
        id
        email
      }
      token
    }
  }
`;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this._confirm = this._confirm.bind(this);
    this._saveUserData = this._saveUserData.bind(this);
  }

  _confirm = async data => {
    try {
      const { token } = data.signup;
      this._saveUserData(token);
      this.props.navigation.navigate("Main");
    } catch (error) {
      console.error(error);
    }
  };

  _saveUserData = async token => {
    try {
      await AsyncStorage.setItem(USER_TOKEN, token);
    } catch (error) {
      console.error(error);
    }
  };

  static navigationOptions = {
    title: "Sign Up",
  };

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled
      >
        <ImageBackground source={require("../assets/images/Dan.jpg")} style={{width: '100%', height: '100%'}}>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            justifyContent: "flex-start",
            alignItems: "center",
            opacity: .9
          }}
        >
          <Card containerStyle={{ borderRadius: 8 }}>
            <Input
              inputContainerStyle={{
                height: 40,
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
              }}
              label="First Name"
              placeholder="First Name"
              autoCorrect={false}
              onChangeText={text =>
                this.setState({ firstName: text })
              }
              returnKeyType="next"
              onSubmitEditing={firstName => {
                this.lastNameRef.focus();
              }}
            />
            <Input
              inputContainerStyle={{
                height: 40,
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
              }}
              ref={lastNameRef => {
                this.lastNameRef = lastNameRef;
              }}
              label="Last Name"
              autoCorrect={false}
              placeholder="Last Name"
              onChangeText={text => this.setState({ lastName: text })}
              returnKeyType="next"
              onSubmitEditing={lastName => {
                this.emailRef.focus();
              }}
            />
            <Input
              inputContainerStyle={{
                height: 40,
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
              }}
              ref={emailRef => {
                this.emailRef = emailRef;
              }}
              label="Email"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={text => this.setState({ email: text })}
              returnKeyType="next"
              onSubmitEditing={email => {
                this.passwordRef.focus();
              }}
            />
            <Input
              inputContainerStyle={{
                height: 40,
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
              }}
              ref={passwordRef => {
                this.passwordRef = passwordRef;
              }}
              label="Password"
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
              //   This secures user input for a field.
              secureTextEntry={true}
              returnKeyType="done"
            />
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={{ firstName, lastName, email, password }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <Button
                  buttonStyle={{ marginTop: 20 }}
                  title="Sign Up"
                  onPress={mutation}
                />
              )}
            </Mutation>
          </Card>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
