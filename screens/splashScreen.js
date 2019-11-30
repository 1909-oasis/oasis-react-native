import React from "react";
import { View, Text, Image } from "react-native";

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 2000)
    );
  };

  async componentDidMount() {
    // We can preload data here, and once the data is loaded - the page will navigate away to the Main route, which is our normal tabs and homescreen etc.
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate("Main");
    }
  }

  render() {
    return (
      // here we will style accordingly
      <View style={styles.viewStyles}>
        <Image
          style={{ width: 450, height: 450 }}
          source={require("../assets/images/oasisLogo.png")}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  textStyles: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
};

export default SplashScreen;
