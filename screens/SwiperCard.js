"use strict";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  AsyncStorage
} from "react-native";

//Apollo client query hooks
import gql from "graphql-tag";
import { Query } from "react-apollo";
import SwipeCards from "react-native-swipe-cards";
import {USER_TOKEN} from '../constants/constants.js'

const { createApolloFetch } = require('apollo-fetch')

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
//component to make a call to DB through apollo client and load up to

// class StarterPack extends React.Component {
//   render() {
//     return (
//       <Query query={query}>
//         {(response, error) => {
//           if (error) {
//             return <Text>{error}</Text>;
//           }

//           if (response) {
//             console.log("are we hitting this");
//             return response.data.cocktailStarter.map((element, idx) => {
//               cards.push(element);
//             });
//           }
//         }}
//       </Query>
//     );
//   }
// }
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
            {this.props.name}
          </Text>
        </View>
        <View>
          {this.props.ingredients.map((ingredient, idx) => {
            return (
              <Text style={styles.text} key={idx}>
                {ingredient.ingredient.name}
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

async function handleSwipe(cocktailId, rating, token){
    console.log('token:, ', token)
    console.log('token type:, ', typeof(token))
    console.log("in yup");

      fetch('http://oasis1909.herokuapp.com/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ query: `
          mutation{
            swipe(cocktailId:
            "${cocktailId}",
            rating: ${rating}){

            rating

          }
          }` }),
})
}

async function handleMaybe(){
  console.log('token:, ', token)
  console.log('token type:, ', typeof(token))
  console.log("in yup");

    return await fetch('http://oasis1909.herokuapp.com/',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ query: `
        mutation{
          shiftFromQueue{

          firstName

        }
        }` }),
      })
}

async function refreshQueue(token){
  return await fetch('http://oasis1909.herokuapp.com/',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ query: `
        mutation{
          updateQueue{
          queue{
            id
            name
            imageUrl
          }
        }
        }` }),
}).then((data) =>  {if(data.updateQueue.queue){
      this.setState({
        cards: data.updateQueue.queue,
        outOfCards: false,
      });
    } else {
      this.setState({
        outOfCards: true
      })
}})
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      token: '',
      outOfCards: false,
    };
    this.handleQueryComplete = this.handleQueryComplete.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.handleMaybe = this.handleMaybe.bind(this);
    console.log("in constructor, this.props:, ", props);
  }

  async componentDidMount() {
    const token =  await AsyncStorage.getItem(USER_TOKEN)
    this.setState({
      token
    })
    console.log('in componentDidMount. Token: ', token)
    return;
  }

  handleYup(card) {
    console.log("yup");
    handleSwipe(card.id, 1, this.state.token)
  }

  handleNope(card) {
    console.log("nope");
    handleSwipe(card.id, -1, this.state.token)
  }

  handleMaybe(card) {
    console.log("maybe");
    handleMaybe();
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(
        `There are only ${this.state.cards.length -
          index -
          1} cards left.`
      );

      //TODO add refresh logic here and put the queue on state again

      if (!this.state.outOfCards) {
        const data = refreshQueue(this.state.token)
        if(data.updateQueue.queue){
          this.setState({
            cards: data.updateQueue.queue,
            outOfCards: false,
          });
        } else {
          this.setState({
            outOfCards: true
          })
        }

      }
    }
  }

  handleQueryComplete = cocktails => {
    this.setState({
      cards: cocktails,
    });
  };

  render() {
    if (!this.state.cards.length) {
      return (
        <Query query={QUEUE_QUERY} fetchPolicy="network-only">
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading Profile!</Text>;
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
                  showYup={true}
                  showNope={true}
                  showMaybe={true}
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
      );
    }
    return (
      <View>
        {/* <StarterPack /> */}
        <SwipeCards
          cards={this.state.cards}
          loop={false}
          renderCard={cardData => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}
          showMaybe={true}
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
});
