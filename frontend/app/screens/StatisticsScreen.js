import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ConfettiAnimation from "../components/confettiAnimation";
import userApi from "../api/users";
import HeadingText from "../components/HeadingText";
import Text from "../components/Text";
import colors from "../config/colors";

function StatisticsScreen({ navigation, route }) {
  // Note: useApi() below is not utilized to its max capabilities, because I forgot about what it can do earlier since I borrowed this hook from a previous project I worked on

  const [winner, setWinner] = useState({});
  const [voteCountForWinner, setVoteCountForWinner] = useState(0);
  const statistics = route.params.allVotingSessions[0];
  const winnerId = route.params.allVotingSessions[0].winnerId;

  useEffect(() => {
    getDetailsOfAUser();
    getVoteCountForWinner();

    console.log(route.params.allVotingSessions[0]);
  }, []);

  const getDetailsOfAUser = async () => {
    const data = await userApi.getDetailsOfAUser(winnerId);

    setWinner(data.data.user);
  };

  const getVoteCountForWinner = () => {
    const candidates = statistics.candidates;

    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i]._id == winnerId) {
        const result = candidates[i].voteCountForThisCandidate;
        setVoteCountForWinner(result);
      }
    }
  };

  return (
    <>
      <Screen>
        <View style={styles.container}>
          <HeadingText>Statistics</HeadingText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ResultsScreen")}
          >
            <Ionicons name="arrow-back" size={25} color={colors.light} />
          </TouchableOpacity>
          <View style={styles.winnerView}>
            <Text style={styles.text}>Winner: {winner.name}</Text>
            <Text style={styles.text}>
              Number of voters: {statistics.votersCount}
            </Text>
            <Text style={styles.text}>
              Name of Session: {statistics.nameOfSession}
            </Text>
            <Text style={styles.text}>
              Vote count for winner: {voteCountForWinner}
            </Text>
            <Text style={styles.text}>
              Date created: {statistics.dateCreated}
            </Text>
            <Text style={styles.text}>Date ended: {statistics.dateEnded}</Text>
            <Text>
              Note: so now just display faces of winners and other candidates
              and add confetti
            </Text>
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    width: 70,
  },
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  winnerView: {
    margin: 10,
    padding: 10,
  },
});

export default StatisticsScreen;
