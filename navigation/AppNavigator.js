import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import LogInScreen from "../screens/LogInScreen";
import MainTabNavigator from "./MainTabNavigator";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

// const AppStack = createStackNavigator({
//   Home: HomeScreen,
//   Links: LinksScreen,
//   Settings: SettingsScreen
// Main: MainTabNavigator
// });
const AuthStack = createStackNavigator({ LogIn: LogInScreen });

export default createAppContainer(
  // SwitchNavigator allows for only one screen to be viewed at a time.
  createSwitchNavigator(
    {
      // Added additional route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      // App: AppStack,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
