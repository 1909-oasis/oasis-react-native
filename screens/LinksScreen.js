import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {ExpoLinksView} from '@expo/samples'
import SwipeCards from './SwiperCard.js'

// import Icon, {drink} from 'react-native-vector-icons/Ionicons'

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <SwipeCards />
    </View>
  )
}

LinksScreen.navigationOptions = {
  title: 'Cocktail Swiper'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#D5B9B2'
  }
})
