import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

class SplashScreen extends React.Component {
  timeOut = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    const data = await this.timeOut();

    if (data !== null) {
      this.props.navigation.navigate("Auth");
    }
  }

  render() {
    return (
      <Image
        source={require("../assets/images/oasislandingimage.jpg")}
        resizeMode="cover"
        style={styles.image}
      ></Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
  },
});

export default SplashScreen;
