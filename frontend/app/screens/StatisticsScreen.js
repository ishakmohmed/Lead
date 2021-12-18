import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import HeadingText from "../components/HeadingText";
import colors from "../config/colors";

function StatisticsScreen({ navigation, route }) {
  // Note: useApi() below is not utilized to its max capabilities, because I forgot about what it can do earlier since I borrowed this hook from a previous project I worked on

  useEffect(() => {
    console.log(
      "route.params.allVotingSessions is > ",
      route.params.allVotingSessions
    );
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>ABCDEFG</HeadingText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },
});

export default StatisticsScreen;
