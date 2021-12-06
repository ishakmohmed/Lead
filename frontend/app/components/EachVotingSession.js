import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../config/colors";
import Text from "./Text";

function EachVotingSession({ nameOfSession, candidates, dateCreated }) {
  let strDate = dateCreated;
  strDate = strDate.substring(0, 10);

  return (
    <View style={styles.container}>
      <Text style={styles.nameOfSessionText}>{nameOfSession}</Text>
      <Text style={styles.dateCreatedText}>session created at {strDate}</Text>
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Vote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endSessionButton}>
          <Text style={styles.buttonText}>End Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.nicePink,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5,
  },
  candidatesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  dateCreatedText: {
    alignSelf: "center",
    fontSize: 12,
    color: colors.medium,
  },
  endSessionButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
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
