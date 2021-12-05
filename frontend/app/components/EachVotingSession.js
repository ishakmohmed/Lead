import React from "react";
import { View, StyleSheet } from "react-native";
import HeadingText from "./HeadingText";

function EachVotingSession() {
  return (
    <View style={styles.container}>
      <HeadingText>EACH SESSION</HeadingText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EachVotingSession;
