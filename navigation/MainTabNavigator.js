import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import RecScreen from "../screens/RecScreen";
import SwipeScreen from "../screens/SwipeScreen ";
import ProfileScreen from "../screens/ProfileScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const SwipeStack = createStackNavigator(
  {
    Swipes: SwipeScreen,
  },
  config
);

SwipeStack.navigationOptions = {
  tabBarLabel: "Swipe",
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === "ios" ? "ios-albums" : "md-albums"}
    />
  ),
  tabBarOptions: {
    activeTintColor: "rgb(69,211,193)",
  },
};

SwipeStack.path = "";

const RecStack = createStackNavigator(
  {
    Rec: RecScreen,
  },
  config
);

RecStack.navigationOptions = {
  tabBarLabel: "GetMyRec",
  tabBarIcon: () => (
    <TabBarIcon
      // focused={focused}
      name={Platform.OS === "ios" ? `ios-wine` : "md-wine"}
    />
  ),
  tabBarOptions: {
    activeTintColor: "rgb(69,211,193)",
  },
};

RecStack.path = "";

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
  tabBarOptions: {
    activeTintColor: "rgb(69,211,193)",
  },
};

ProfileStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    RecStack,
    SwipeStack,
    ProfileStack,
  },
  { initialRouteName: "SwipeStack" }
);

tabNavigator.path = "";

export default tabNavigator;
