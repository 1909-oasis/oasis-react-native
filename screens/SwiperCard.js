"use strict";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";

import SwipeCards from "react-native-swipe-cards";
import { USER_TOKEN } from "../constants/constants.js";

const HTTP_URL = "http://oasis1909.herokuapp.com/"


async function loadQueue(token) {
  const response = await fetch(HTTP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
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
    `,
    }),
  });
  const json = await response.json();
  return json.data.me.queue;
}


async function handleSwipe(cocktailId, rating, token) {
  fetch(HTTP_URL, {
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
  return await fetch(HTTP_URL, {
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
  const response = await fetch(HTTP_URL, {
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

export default class Swiper extends React.Component {
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

  //Get the user token from async storage and use it to load the queue.
  async componentDidMount() {

    const token = await AsyncStorage.getItem(USER_TOKEN);

    //load queue and set it to state
    const queue = await loadQueue(token);
    shuffleQueue(queue);
    if (queue) {
      await this.setState({
        cards: queue,
        outOfCards: false,
        token
      });
    } else {
      this.setState({
        outOfCards: true,
        token
      });
    }
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

  //callback fired every time a card is dropped
  async cardRemoved(index) {
    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      // console.log(
      //   `There are only ${this.state.cards.length -
      //     index -
      //     1} cards left.`
      // );

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

    //If the queue isn't loaded yet, show the loading indicator.
    if (!this.state.cards.length) {
      return (
        <View style={styles.noMoreCards}>
    <View style={{ alignContent: "center" }}>
        <ActivityIndicator
          size="large"
          color="rgb(69,211,193)"
        />
    </View>
    </View>
      );
    }
    //if the queue is loaded (there are cards on state), show the deck and allow swiping.
    return (
      <View style=
      {{
            flex: 1,
            paddingVertical: 20,
            justifyContent: "flex-start",
            alignItems: "center",
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
     borderRadius: 8,
    overflow: "hidden",
    elevation: 1,

  },
  thumbnail: {
    width: 400,
    height: 400,
    opacity: 1
  },
  text: {
    color: "black",
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
        <View
        style={{
          backgroundColor: "rgb(242, 255, 253)",
          opacity:.9,
          width: "100%"
        }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "rgb(69,211,193)",
              fontSize: 25,
              textAlign: "center"
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
