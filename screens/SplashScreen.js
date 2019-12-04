import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result')
      }, 2000)
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    const data = await this.performTimeConsumingTask()

    if (data !== null) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.justWood2StackStack}>
          <View style={styles.justWood2Stack}>
            <Image
              source={require('../assets/images/oasis_Logo_(1)1.png')}
              resizeMode="cover"
              style={styles.justWood2}
            ></Image>
            <Image
              source={require('../assets/images/oasis_Logo_(2).png')}
              resizeMode="contain"
              style={styles.logo}
            ></Image>
          </View>
          <Image
            source={require('../assets/images/oasis_Logo_(1)1.png')}
            resizeMode="cover"
            style={styles.justWood}
          ></Image>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  justWood2: {
    top: 331,
    left: 0,
    height: 414,
    position: 'absolute',
    right: 0
  },
  logo: {
    top: 0,
    left: 0,
    position: 'absolute',
    bottom: 331,
    right: 0
  },
  justWood2Stack: {
    top: 216,
    left: 0,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  justWood: {
    top: 0,
    left: 0,
    height: 414,
    position: 'absolute',
    right: 0
  },
  justWood2StackStack: {
    flex: 1,
    marginBottom: -132,
    marginTop: -17
  }
})

export default SplashScreen
