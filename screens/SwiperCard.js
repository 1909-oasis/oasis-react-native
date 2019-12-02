"use strict";

import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

//Apollo client query
import gql from "graphql-tag";

import { Query } from "react-apollo";

import SwipeCards from "react-native-swipe-cards";
const cards = [];
const query = gql`
  query {
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
    }
  }
`;
class Test extends React.Component {
  render() {
    return (
      <Query query={query}>
        {(response, error) => {
          if (error) {
            console.log("Response Error ----> ", error);
            return <Text>{error}</Text>;
          }

          if (response) {
            console.log("response-data ----> ", response.data);
            return response.data.cocktailStarter.map((element, idx) => {
              cards.push(element);
            });
          }
        }}
      </Query>
    );
  }
}
// const test = () => (
//   <Query query={query}>
//     {({ loading, error, data }) => {
//       console.log("hi");
//       return data;
//     }}
//   </Query>
// );
// function test() {
//   const { loading, error, data } = Query(query);
//   if (loading) return "loading...";
//   if (error) return `Error! ${error.message}`;

//   console.log(data);
//   return 0;
// }
// console.log("am i hitting this?");
// console.log(useQuery(query));
// <Query query={query}>
//   {(response, error) => {
//     if (error) {
//       console.log("Response Error ----> ", error);
//       return <Text>{error}</Text>;
//     }

//     if (response) {
//       console.log("response-data ----> ");
//       return response.data.cocktailStarter.map((element, idx) => {
//         return (
//           <View key={idx}>
//             <Text>{element.name}</Text>
//             <Image
//               style={{ width: 66, height: 58 }}
//               source={{ uri: `${element.imageUrl}` }}
//             />
//           </View>
//         );
//       });
//     }
//   }}
// </Query>;

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{ uri: this.props.imageUrl }} />
        <Text style={styles.text}>{this.props.name}</Text>
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
//Query starterPack and creating array with cocktails

// const cards = [
//   { name: "1", image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif" },
//   { name: "2", image: "https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif" },
//   { name: "3", image: "https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif" },
//   { name: "4", image: "https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif" },
//   { name: "5", image: "https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif" },
//   { name: "6", image: "https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif" },
//   { name: "7", image: "https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif" },
//   { name: "8", image: "https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif" },
//   {
//     name: "9",
//     image: "https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif"
//   }
// ];

const cards2 = [
  {
    name: "10",
    image: "https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif"
  },
  {
    name: "11",
    imageUrl: "https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif"
  },
  {
    name: "12",
    imageUrl: "https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif"
  },
  {
    name: "13",
    imageUrl: "https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif"
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false
    };
  }

  handleYup(card) {
    console.log("yup");
  }

  handleNope(card) {
    console.log("nope");
  }

  handleMaybe(card) {
    console.log("maybe");
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(
        `There are only ${this.state.cards.length - index - 1} cards left.`
      );

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`);

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        });
      }
    }
  }

  render() {
    return (
      <View>
        <Test />
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
    elevation: 1
  },
  thumbnail: {
    width: 400,
    height: 400
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
