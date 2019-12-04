import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
//Apollo client query hooks
import gql from "graphql-tag";

import { MonoText } from "../components/StyledText";
import { Query } from "react-apollo";
const RECOMINDATION = gql`
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

export default function HomeScreen() {
  return (
    <Query query={RECOMINDATION}>
      {({ loading, error, data }) => {
        if (loading) {
          return <ActivityIndicator size="large" color="grey" />;
        }
        if (error) return <Text>Whoops! Something went wrong.</Text>;
        if (data) {
          console.log(
            "this is image",
            data.getRecommendation.imageUrl
          );
          return (
            <View style={styles.card}>
              <Text>This is Our Recommendation!!!!</Text>
              <View>
                <ImageBackground
                  style={styles.thumbnail}
                  source={{ uri: data.getRecommendation.imageUrl }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    fontSize: 50,
                  }}
                >
                  {data.getRecommendation.name}
                </Text>
              </View>
              <View>
                {data.getRecommendation.ingredients.map(
                  (ingredient, idx) => {
                    return (
                      <Text style={styles.text} key={idx}>
                        {ingredient.ingredient.name}
                      </Text>
                    );
                  }
                )}
              </View>
            </View>
          );
        }
      }}
    </Query>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 400,
    height: 400,
  },
  text: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
