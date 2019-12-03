import React from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default function ProfileScreen() {
  const QUERY = gql`
    {
      dan {
        firstName
        lastName
        email
      }
    }
  `;
  return (
    <Query query={QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <Text>Loading Profile!</Text>;
        if (error) {
          console.error(error);
          return <Text>Whoops! Something went wrong.</Text>;
        }

        return (
          <View
            style={{
              flex: 1,
              paddingVertical: 20,
              paddingHorizontal: 10,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Card containerStyle={{ width: 300 }}>
              <Text>It's the profile page!</Text>
              <Text>First Name: {data.dan.firstName}</Text>
              <Text>Last Name: {data.dan.lastName}</Text>
              <Text>Email: {data.dan.email}</Text>
              {/* {data.recommendationList.map(element => {
              <Text key={element.cocktail.id}>{element.cocktail.name}</Text>;
            })} */}
            </Card>
          </View>
        );
      }}
    </Query>
  );
}

ProfileScreen.navigationOptions = {
  title: "Profile",
};
