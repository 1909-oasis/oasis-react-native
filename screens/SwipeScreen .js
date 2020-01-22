import React from "react";
import {
  ScrollView,
  ImageBackground,
} from "react-native";
import SwipeCards from "./SwiperCard.js";
import { withApollo } from "react-apollo";

function SwipeScreen(props) {
  return (

    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ImageBackground source={require("../assets/images/Dan.jpg")} style={{width: '100%', height: '100%'}}>
        <SwipeCards />
      </ImageBackground>
    </ScrollView>

  );
}

SwipeScreen.navigationOptions = {
  title: "Cocktail Swiper",
};

export default SwipeScreen;
