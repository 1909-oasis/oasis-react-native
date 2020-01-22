import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

//this is where apollo starts
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

import AppNavigator from "./navigation/AppNavigator";
import { USER_TOKEN } from "./constants/constants";

export default function App(props) {
  // Apollo Client
  const httpLink = createHttpLink({
    uri: "http://oasis1909.herokuapp.com/",
    // uri: "http://localhost:4000/",
  });

  // This middleware gets the authentication token from AsyncStorage if it exists.
  // This middleware will be invoked every time ApolloClient sends a request to the server (as seen below).
  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // Apollo Links allow you to create middlewares that let you modify requests before they are sent to the server.
  // https://github.com/apollographql/apollo-link
  // We return the headers to the context so httpLink can read them.

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  };

  const client = new ApolloClient({
    // ssrMode: true,
    // ssr: true,
    // disableNetworkFetches: true,
    // resultCaching: true,
    link: authLink.concat(httpLink),
    defaultOptions: defaultOptions,
    cache: new InMemoryCache(),
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
          <AppNavigator />
        </View>
      </ApolloProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
    }),
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
    backgroundColor: "#fff",
  },
});
