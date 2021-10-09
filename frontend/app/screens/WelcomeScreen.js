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
        <Text>Hello</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    padding: 10,
  },
});

export default WelcomeScreen;
