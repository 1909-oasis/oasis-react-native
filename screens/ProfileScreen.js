import React from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { thisExpression } from "@babel/types";
import onSignOut from "./AuthLoadingScreen";

// const QUERY = gql`
//   {
//     dan {
//       firstName
//       lastName
//       email
//     }
//   }
// `;

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
  }

  static navigationOptions = {
    title: "Profile",
  };

  render() {
    return (
      <Query query={QUERY}>
        {({ loading, error, data }) => {
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
                containerStyle={{ width: 350 }}
                title={`${data.me.firstName} ${data.me.lastName}`}
              >
                <Text>{data.me.email}</Text>
                {/* {data.recommendationList.map(element => {
              <Text key={element.cocktail.id}>{element.cocktail.name}</Text>;
            })} */}
                <Button
                  buttonStyle={{ marginTop: 20 }}
                  title="Log Out"
                  onPress={() =>
                    onSignOut().then(() =>
                      this.props.navigation.navigate("LogIn")
                    )
                  }
                />
              </Card>
            </View>
          );
        }}
      </Query>
    );
  }
}
