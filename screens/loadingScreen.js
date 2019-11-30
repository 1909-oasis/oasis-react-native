import React from "react";
import { View, Image, Text } from "react-native";

class LoadScreen extends React.Component {
  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          Hang on, we are finding your next drink!
        </Text>
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

export default LoadScreen;
