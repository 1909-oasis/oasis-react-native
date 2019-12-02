import React from "react";
import { AsyncStorage, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`;

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

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
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button
                buttonStyle={{ marginTop: 20 }}
                title="Log In"
                onPress={mutation}
              />
            )}
          </Mutation>
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
