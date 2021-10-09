import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import Screen from "../components/Screen";

function WelcomeScreen() {
  return (
    <Screen style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.tagline}>Lead!</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    padding: 10,
  },
  tagline: {
    fontSize: 50,
    fontWeight: "bold",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
