'use strict'

import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const QUEUE_QUERY = gql`
{
  dan {
    queue{
      name
      imageUrl
    }
  }
}
`


class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      outOfCards: false
    }

  }

  handleYup(card) {
    console.log('yup')
  }

  handleNope(card) {
    console.log('nope')
  }

  handleMaybe(card) {
    console.log('maybe')
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`)

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(
        `There are only ${this.state.cards.length - index - 1} cards left.`
      )

      //TODO add refresh logic here and put the queue on state again

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }
    }
  }

  render() {
    if(!this.state.cards.length){
      return (
        <Query query={QUEUE_QUERY}>
          {({loading, error, data}) => {
             if(loading) return <Text>Loading Profile!</Text>
             if(error) return <Text>Whoops! Something went wrong.</Text>
            console.log('inside query tag, data:', data)
          const cocktailCards = data.dan.queue.map((cocktail) => ({
            name: cocktail.name,
            image: cocktail.imageUrl
          }))
          this.setState({
            cards: cocktailCards
          })
          }}
        </Query>
      )
    }
    return (
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
    )
  }
}



const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})
