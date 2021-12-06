import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";
import Text from "./Text";

function EachVotingSession({ nameOfSession, candidates, dateCreated }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameOfSessionText}>{nameOfSession}</Text>
      <View style={styles.candidatesContainer}>
        {candidates.map((c, index) => {
          return (
            <TouchableOpacity key={index} style={styles.makeItRound}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  uri: c.profilePic,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  candidatesContainer: {
    backgroundColor: colors.light,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 70,
    marginVertical: 10,
    padding: 10,
  },
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  makeItRound: {
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderRadius: 50 / 2,
    borderColor: colors.superLightGray,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
    width: 50,
  },
  nameOfSessionText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default EachVotingSession;
