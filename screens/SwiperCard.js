"use strict";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

//Apollo client query hooks
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import SwipeCards from "react-native-swipe-cards";
import { useMutation } from '@apollo/react-hooks';
import { client } from '../App.js'

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

const SWIPE_MUTATION = gql`
  mutation Swipe($cocktailId: String!, $rating: Int!) {
    swipe(cocktailId: $cocktailId, rating: $rating){

        rating

    }
  }
  `

// const swipeMutation = (cocktailId, rating) => gql`
//   mutation
//     swipe(cocktailId: ${cocktailId}, rating: ${rating}){
//       userCocktail{
//         rating
//       }
//     }

// `

// const MAYBE_MUTATION = gql`
//   mutation maybeMutation(){
//     shiftFromQueue(){
//       user{
//         name
//       }
//     }
//   }

// `

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      outOfCards: false,
    };
    this.handleQueryComplete = this.handleQueryComplete.bind(this);
  }

  //swipe takes cocktailId and rating
  async handleYup(card) {
    const cocktailId = card.id
    const rating = 1
    console.log("in yup");
    // const mutation = swipeMutation(cocktailId, rating)
    // console.log(mutation)

    let response = client.mutate({
      variables: {
        cocktailId,
        rating
      },
      mutation: SWIPE_MUTATION
    }
    )
    // return(<Mutation mutation = {swipeMutation} variables = {{cocktailId, rating}}>
    //   {(mutation, {data, loading, error}) => {
    //     if(loading){
    //       console.log('loading')
    //     }
    //     if(error){
    //       console.error(error)
    //     }
    //     console.log('in mutation component')
    //   }
    //   }
    // </Mutation>)

    console.log(response)

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
        `There are only ${this.state.cards.length -
          index - 1} cards left.`
      );

      //TODO add refresh logic here and put the queue on state again

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`);

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true,
        });
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
        <Query query={QUEUE_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading Profile!</Text>;
            if (error)
              return <Text>Whoops! Something went wrong.</Text>;
            const cocktailCards = data.me.queue;
            this.handleQueryComplete(cocktailCards);
            return <Text>Loading Profile!</Text>
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
