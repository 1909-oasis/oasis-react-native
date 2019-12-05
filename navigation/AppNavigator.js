import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from "react-navigation";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/SplashScreen";

const AuthStack = createStackNavigator({
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(
  // SwitchNavigator allows for only one screen to be viewed at a time.
  createSwitchNavigator({
    // Added additional route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Splash: SplashScreen,
    // AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: MainTabNavigator,
  })
);
