import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {}
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'GetMyRec',
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === 'ios' ? `ios-wine` : 'md-wine'}
    />
  )
}

HomeStack.path = ''

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
)

LinksStack.navigationOptions = {
  tabBarLabel: 'Swipe',
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
    />
  )
}

LinksStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  )
}

SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
})

tabNavigator.path = ''

export default tabNavigator
