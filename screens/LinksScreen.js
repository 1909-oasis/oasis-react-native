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
  return (


    <ScrollView
      // style={styles.container}
      contentContainerStyle={{
        flex: 1,
        // padding: 15,
        // backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <ImageBackground source={require("../assets/images/Dan.jpg")} style={{width: '100%', height: '100%'}}>
        <SwipeCards />
      </ImageBackground>
    </ScrollView>


  );
}

LinksScreen.navigationOptions = {
  title: "Cocktail Swiper",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "rgb(69,211,193)",
  },
});

export default withApollo(LinksScreen);
