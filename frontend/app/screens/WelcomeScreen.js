import React from "react";
import { StyleSheet, Text, View } from "react-native";

import WorkingTogetherAnimation from "../components/workingTogetherAnimation";
import Screen from "../components/Screen";
import colors from "../config/colors";

function WelcomeScreen() {
  return (
    <Screen style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.title}>Lead!</Text>
        <WorkingTogetherAnimation />
        <View style={styles.secondView}>
          <Text style={styles.tagline}>
            "The best of leaders are elected using the best of voting means".
          </Text>
          <Text style={styles.ishak}>~ Mohmed Ishak, creator</Text>
        </View>
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
  ishak: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  secondView: {
    marginVertical: 15,
  },
  tagline: {
    color: colors.medium,
    fontSize: 25,
    fontStyle: "italic",
    textAlign: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
