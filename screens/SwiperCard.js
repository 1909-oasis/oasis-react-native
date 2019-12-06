"use strict";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";

//Apollo client query hooks
import gql from "graphql-tag";
import { Query } from "react-apollo";
import SwipeCards from "react-native-swipe-cards";
import { USER_TOKEN } from "../constants/constants.js";

const { createApolloFetch } = require("apollo-fetch");

//Schema for apollo client

const QUEUE_QUERY = gql`
  query {
    me {
      firstName
      lastName
      email
      id
      queue {
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
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <View>
          <ImageBackground
            style={styles.thumbnail}
            source={{ uri: this.props.imageUrl }}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: "rgb(69,211,193)",
              fontSize: 25,
              textAlign: "center",
            }}
          >
            {this.props.name.toUpperCase()}
          </Text>
          {this.props.ingredients.map((ingredient, idx) => {
            return (
              <Text style={styles.text} key={idx}>
                {ingredient.ingredient.name.toLowerCase()}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
}

async function handleSwipe(cocktailId, rating, token) {
  fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
          mutation{
            swipe(cocktailId:
            "${cocktailId}",
            rating: ${rating}){

            rating

          }
          }`,
    }),
  });
}

async function handleMaybe(token) {
  return await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation{
          shiftFromQueue{

          firstName

        }
        }`,
    }),
  });
}

async function refreshQueue(token) {
  const response = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation{
          updateQueue{
            id
            queue{
            id
            name
            imageUrl
            ingredients{
              ingredient{
                id
                name
              }
            }
          }
        }
        }`,
    }),
  });
  const json = await response.json();
  return json.data.updateQueue.queue;
}

function shuffleQueue(queue) {
  queue.sort(() => Math.random() - 0.5);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      token: "",
      outOfCards: false,
    };
    this.handleQueryComplete = this.handleQueryComplete.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.handleMaybe = this.handleMaybe.bind(this);
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    this.setState({
      token,
    });
    return;
  }

  handleYup(card) {
    handleSwipe(card.id, 1, this.state.token);
  }

  handleNope(card) {
    handleSwipe(card.id, -1, this.state.token);
  }

  handleMaybe(card) {
    handleMaybe(this.state.token);
  }

  async cardRemoved(index) {
    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(
        `There are only ${this.state.cards.length -
          index -
          1} cards left.`
      );

      //TODO add refresh logic here and put the queue on state again

      if (!this.state.outOfCards) {
        const queue = await refreshQueue(this.state.token);
        shuffleQueue(queue);
        if (queue) {
          await this.setState({
            cards: queue,
            outOfCards: false,
          });
        } else {
          this.setState({
            outOfCards: true,
          });
        }
      }
    }
  }

  handleQueryComplete = cocktails => {
    shuffleQueue(cocktails);
    this.setState({
      cards: cocktails,
    });
  };

  render() {
    if (!this.state.cards.length) {
      return (
        <View style={styles.noMoreCards}>
          <Query query={QUEUE_QUERY} fetchPolicy="network-only">
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <View style={{ alignContent: "center" }}>
                    <ActivityIndicator
                      size="large"
                      color="rgb(69,211,193)"
                    />
                  </View>
                );
              if (error)
                return <Text>Whoops! Something went wrong.</Text>;
              const cocktailCards = data.me.queue;
              this.handleQueryComplete(cocktailCards);
              return (
                <View>
                  {/* <StarterPack /> */}
                  <SwipeCards
                    cards={this.state.cards}
                    loop={false}
                    renderCard={cardData => <Card {...cardData} />}
                    renderNoMoreCards={() => <NoMoreCards />}
                    showYup={false}
                    showNope={false}
                    showMaybe={false}
                    hasMaybeAction={true}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    handleMaybe={this.handleMaybe}
                    cardRemoved={this.cardRemoved.bind(this)}
                  />
                </View>
              );
            }}
          </Query>
        </View>
      );
    }
    return (

      <View style=
      {{
            flex: 1,
            paddingVertical: 20,
            justifyContent: "flex-start",
            alignItems: "center",
            opacity: 1,
          }}

      >
        {/* <StarterPack /> */}
        <SwipeCards
          cards={this.state.cards}
          loop={false}
          renderCard={cardData => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={false}
          showNope={false}
          showMaybe={false}
          hasMaybeAction={true}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          handleMaybe={this.handleMaybe}
          cardRemoved={this.cardRemoved.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "rgb(19,4,4)",
    backgroundColor: "rgb(63,48,29)",
    borderWidth: 2,
    elevation: 1,
  },
  thumbnail: {
    width: 400,
    height: 400,
  },
  text: {
    color: "white",
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
