import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import ProfileScreen from "../screens/ProfileScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "GetMyRec",
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === "ios" ? `ios-wine` : "md-wine"}
    />
  ),
};

HomeStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Swipe",
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === "ios" ? "ios-albums" : "md-albums"}
    />
  ),
};

LinksStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Settings: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  ),
};

ProfileStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  ProfileStack,
});

tabNavigator.path = "";

export default tabNavigator;
