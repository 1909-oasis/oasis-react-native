import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  Image,
  ImageBackground,
  View,
  Button,
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import SwipeCards from "./SwiperCard.js";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";

const RECOMMENDATION = gql`
  query {
    getRecommendation {
      id
      name
      imageUrl
      ingredients {
        ingredient {
          id
          name
        }
      }
    }
  }
`;

// import Icon, {drink} from 'react-native-vector-icons/Ionicons'

function LinksScreen(props) {
  // const query = gql`
  //   query {
  //     cocktailStarter(starterPack: true) {
  //       id
  //       name
  //       imageUrl
  //       ingredients {
  //         ingredient {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   }
  // `;

  return (
    <ScrollView style={styles.container}>
      <SwipeCards />
      <Button
        onPress={async () => {
          await props.client.reFetchObservableQueries();
          console.log("please");
          // try {
          //   const data = props.client.readQuery({
          //     query: RECOMMENDATION,
          //   });
          //   console.log("hello there?", data);
          // } catch (e) {
          //   console.log("woops", e);
          // }
        }}
        title="press"
      >
        Come On
      </Button>
    </ScrollView>
  );

  //   <View style={styles.container}>
  //     {/* <Query query={query}>
  //       {(response, error) => {
  //         if (error) {
  //           console.log("Response Error ----> ", error);
  //           return <Text>{error}</Text>;
  //         }

  //         if (response) {
  //           // console.log("response-data ----> ", response.data);
  //           return response.data.cocktailStarter.map((element, idx) => {
  //             return (
  //               <View key={idx}>
  //                 <Text>{element.name}</Text>
  //                 <Image
  //                   style={{ width: 66, height: 58 }}
  //                   source={{ uri: `${element.imageUrl}` }}
  //                 />
  //               </View>
  //             );
  //           });
  //         }
  //       }}
  //     </Query> */}

  //   </ScrollView>
  // );
}

LinksScreen.navigationOptions = {
  title: "Cocktail Swiper",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});

export default withApollo(LinksScreen);
