import React from "react";
import { AsyncStorage, Image, View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { USER_TOKEN } from "../constants/constants";

// When using the fetchPolicy prop in the Query component, "id" must be included in the the gql object.
const QUERY = gql`
  {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onSignOut = this._onSignOut.bind(this);
  }

  _onSignOut = async () => {
    try {
      await AsyncStorage.removeItem(USER_TOKEN);
      this.props.navigation.navigate("LogIn");
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
        fetchPolicy="network-only" // Without the fetchPolicy, this returns the cached profile.
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
                titleStyle={{ color: "rgb(19,4,4)" }}
                title={`${data.me.firstName} ${data.me.lastName}`}
              >
                <Image
                  source={{
                    // This is just a placeholder profile picture for now.
                    // If we want to later implement a user image, we need to include this in our schema on the backend.
                    uri:
                      "https://advanceddentalhealthcenter.com/wp-content/uploads/2019/05/person-placeholder.jpg",
                  }}
                  // This makes the image round.
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 200 / 2,
                  }}
                />
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  style={{ color: "rgb(19,4,4)" }}
                >
                  {data.me.email}
                </Text>
                {/* {data.recommendationList.map(element => {
              <Text key={element.cocktail.id}>{element.cocktail.name}</Text>;
            })} */}
                <Button
                  buttonStyle={{
                    marginTop: 20,
                    backgroundColor: "rgb(69,211,193)",
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
