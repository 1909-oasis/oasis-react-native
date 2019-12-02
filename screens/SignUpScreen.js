import React from "react";
import { AsyncStorage, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import gql from "graphql-tag";
// import { Mutation } from "react-apollo";
import { USER_TOKEN } from "./AuthLoadingScreen";

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
      password: ""
    };
  }

  static navigationOptions = {
    title: "Sign Up"
  };

  render() {
    console.log(this.state);
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
            label="First Name"
            placeholder="First Name"
            onChangeText={text => this.setState({ firstName: text })}
            returnKeyType="next"
          />
          <Input
            inputContainerStyle={{
              height: 40,
              width: 300,
              borderBottomWidth: 1,
              borderBottomColor: "#000000"
            }}
            label="Last Name"
            placeholder="Last Name"
            onChangeText={text => this.setState({ lastName: text })}
            returnKeyType="next"
          />
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
            //   This secures user input for a field.
            secureTextEntry={true}
            returnKeyType="done"
          />
          {/* <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ firstName, lastName, email, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => ( */}
          <Button
            buttonStyle={{ marginTop: 20 }}
            title="Sign Up"
            // onPress={mutation}
            onPress={() => this.props.navigation.navigate("Main")}
          />
          {/* )}
          </Mutation> */}
          <Button
            type="clear"
            textStyle={{ color: "#bcbec1" }}
            title="Log In"
            onPress={() => {
              this.props.navigation.navigate("LogIn");
            }}
          />
        </Card>
      </View>
    );
  }
}

_confirm = async data => {
  const { token } = data.auth;
  this.saveUserData(token);
};

_saveUserData = async token => {
  try {
    await AsyncStorage.setItem(USER_TOKEN, token);
    this.props.navigation.navigate("Main");
  } catch (error) {
    console.error(error);
  }
};
