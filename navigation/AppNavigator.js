import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainTabNavigator from "./MainTabNavigator";

const AuthStack = createStackNavigator({
  LogIn: LogInScreen,
  SignUp: SignUpScreen
});

export default createAppContainer(
  // SwitchNavigator allows for only one screen to be viewed at a time.
  createSwitchNavigator(
    {
      // Added additional route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
