import React from "react";
import { AsyncStorage, Image, View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { USER_TOKEN } from "../constants/constants";

const QUERY = gql`
  {
    me {
      firstName
      lastName
      email
    }
  }
`;

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   token: "",
    // };
    this._onSignOut = this._onSignOut.bind(this);
  }

  _onSignOut = async () => {
    try {
      // const token = await AsyncStorage.getItem(USER_TOKEN);
      const keys = await AsyncStorage.getAllKeys();
      const [items] = await AsyncStorage.multiGet(keys);
      console.log("this is the token before setState: ", items);
      // this.setState({
      //   token: "",
      // });
      await AsyncStorage.removeItem(USER_TOKEN);
      const keys2 = await AsyncStorage.getAllKeys();
      const [items2] = await AsyncStorage.multiGet(keys2);
      this.props.navigation.navigate("LogIn");
      console.log("this is the token after setState: ", items2);

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  static navigationOptions = {
    title: "Profile",
  };

  render() {
    return (
      <Query
        query={QUERY}
        onCompleted={() => console.log("completed query")}
      >
        {({ loading, error, data }) => {
          console.log("insode");
          if (loading) return <Text>Loading Profile!</Text>;
          if (error) {
            console.error(error);
            return <Text>Whoops! Something went wrong.</Text>;
          }
          console.log(data);
          return (
            <View
              style={{
                flex: 1,
                paddingVertical: 20,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Card
                containerStyle={{
                  width: 350,
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                title={`${data.me.firstName} ${data.me.lastName}`}
              >
                <Image
                  source={{
                    uri:
                      "https://advanceddentalhealthcenter.com/wp-content/uploads/2019/05/person-placeholder.jpg",
                  }}
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 300 / 2,
                  }}
                />
                <Text>{data.me.email}</Text>
                {/* {data.recommendationList.map(element => {
              <Text key={element.cocktail.id}>{element.cocktail.name}</Text>;
            })} */}
                <Button
                  buttonStyle={{
                    marginTop: 20,
                  }}
                  title="Log Out"
                  onPress={async () => await this._onSignOut()}
                />
              </Card>
            </View>
          );
        }}
      </Query>
    );
  }
}
