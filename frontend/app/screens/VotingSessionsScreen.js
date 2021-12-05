import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import EachVotingSession from "../components/EachVotingSession";
import useApi from "../hooks/useApi";
import votingApi from "../api/voting";
import colors from "../config/colors";

function VotingSessionsScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Voting Sessions</HeadingText>
        <Button
          title="Click Me"
          onPress={() => navigation.navigate("ActualVotingScreen")}
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
  flatList: {
    borderColor: colors.superLightGray,
    borderWidth: 0.5,
    flexGrow: 0,
    height: 70,
    marginBottom: 20,
    padding: 10,
  },
});

export default VotingSessionsScreen;
