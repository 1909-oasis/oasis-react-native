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
  ActivityIndicator,
} from "react-native";

function LoadingScreen(props) {
  return (
    <ImageBackground
      source={require("../assets/images/Dan.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{
          alignContent: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "rgb(69,211,193)",
            fontSize: 40,
            textAlign: "center",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          HANG ON
        </Text>

        <Image
          style={{
            width: 250,
            height: 250,
            alignSelf: "center",
            opacity: 0.95,
            borderRadius: 125,
          }}
          source={require("../assets/images/cocktails.gif")}
        />
        <Text
          style={{
            color: "white",
            fontSize: 30,
            paddingTop: 20,
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          WE ARE SHAKIN' UP YOUR COCKTAIL!
        </Text>
      </View>
    </ImageBackground>
  );
}

export default LoadingScreen;
