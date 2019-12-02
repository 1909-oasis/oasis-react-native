import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//this is where apollo starts
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AppNavigator from "./navigation/AppNavigator";




export default function App(props) {
  //Apollo Client
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/"
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  client.query({
    query: gql`
      {
        cocktailStarter(starterPack: true) {
          id
          name
          imageUrl
          ingredients {
            ingredient {
              id
              name
            }
          }
        },

        me{
          firstName
          lastName
          email
          id
          queue{
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
      }




    `
  });

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      //Passing apollo client to components/screens/navigation
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator client={client}/>
        </View>
      </ApolloProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
