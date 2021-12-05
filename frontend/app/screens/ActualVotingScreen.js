import React from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";

function ActualVotingScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Vote Now</HeadingText>
        <Button
          title="Click Me"
          onPress={() => navigation.navigate("VotingSessionsScreen")}
          color="nicePink"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ActualVotingScreen;
