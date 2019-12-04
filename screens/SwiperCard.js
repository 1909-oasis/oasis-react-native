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
import { useQuery, useMutation } from '@apollo/react-hooks';


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
  mutation {
    swipe(cocktailId: $cocktailId, rating: $rating){

        rating

    }
  }
`;

// const SWIPE_MUTATION = gql`
// mutation {
//   swipe(cocktailId:
//     "ck3gbpg0h0l8y0755nke7nayz",
//     rating: 1){

//       rating

//   }
// }
// `;

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

export default function App(props) {

  let cards = []

  const queryResponse = useQuery(QUEUE_QUERY)

  if(queryResponse.loading) return (<Text>Loading</Text>)
  cards = queryResponse.data.me.queue
  //swipe({variables: {cocktailId: "ck3gbnkrq0jbn0755tdmf7uqx", rating: 1}})

  const RIGHT_SWIPE_MUTATION = gql`
  mutation {
    swipe(cocktailId:
      ${cards[0].id},
      rating: 1){

        rating

    }
  }
  `;



  const [rightSwipe] = useMutation(RIGHT_SWIPE_MUTATION)

  //swipe takes cocktailId and rating
  function handleYup(card) {
    const cocktailId = card.id
    const rating = 1
    console.log('card.id, ', card.id)
    console.log("in yup");
    try {
      rightSwipe()
    } catch (error) {
      console.error(error)
    }

    console.log('after swipe!')
    // return(<Mutation mutation = {SWIPE_MUTATION} variables = {{cocktailId, rating}}>
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



  }

  function handleNope(card) {
    console.log("nope");
  }

  function handleMaybe(card) {
    console.log("maybe");
  }

  function cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(
        `There are only ${cards.length -
          index -
          1} cards left.`
      );

      //TODO add refresh logic here and put the queue on state again

      if (!cards.length) {

      }
    }
  }

    return (
      <View>
        {/* <StarterPack /> */}
        <SwipeCards
          cards={cards}
          loop={false}
          renderCard={cardData => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}
          showMaybe={true}
          hasMaybeAction={true}
          handleYup={handleYup}
          handleNope={handleNope}
          handleMaybe={handleMaybe}
          cardRemoved={cardRemoved.bind(this)}
        />
      </View>

  )
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
