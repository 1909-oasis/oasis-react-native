import React from "react";
import { ScrollView, StyleSheet, FlatList, Text } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import SwipeCards from "./SwiperCard.js";
import gql from "graphql-tag";
import { Query } from "react-apollo";

// import Icon, {drink} from 'react-native-vector-icons/Ionicons'

export default function LinksScreen() {
  // console.log(JSON.stringify(gql));
  // const GET_COCKTAILS = gql`
  //   {
  //     cocktails {
  //       id
  //     }
  //   }
  // `;

  // const collection = () => {
  //   <Query query={GET_COCKTAILS}>
  //     {({ loading, error, data }) => {
  //       console.log(loading, error, data);
  //       if (loading) {
  //         console.log(loading);
  //       }
  //       return "HI";
  //     }}
  //   </Query>;
  // };
  // console.log(collection());

  // <Query client={}></Query>;
  // query({
  //   query: gql`
  //     {
  //       cocktails {
  //         id
  //       }
  //     }
  //   `
  // }).then(response =>
  //   response.data.cocktails.map(element => {
  //     console.log(element.id);
  //   })
  // );
  // console.log(Query);

  const query = gql`
    query {
      cocktails {
        id
      }
    }
  `;

  return (
    <ScrollView>
      <Query query={query}>
        {(response, error) => {
          if (error) {
            console.log("Response Error ----> ", error);
            return <Text>{error}</Text>;
          }

          if (response) {
            console.log("response-data ----> ");
            return response.data.cocktails.map(element => {
              return <Text key={element.id}>{element.id}</Text>;
            });

            // response.data.cocktails.map(element => {
            //   console.log("this is element", element);
            //   return <FlatList element />;
            // });
          }
        }}
      </Query>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Cocktail Swiper"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
