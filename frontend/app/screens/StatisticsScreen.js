import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

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
  const statistics = route.params.theSession;
  const winnerId = route.params.theSession.winnerId;
  let startDate = statistics.dateCreated;
  let endDate = statistics.dateEnded;

  startDate = startDate.substring(0, 10);
  endDate = endDate.substring(0, 10);

  useEffect(() => {
    getDetailsOfAUser();
    getVoteCountForWinner();
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

  console.log("HEY, ", statistics.candidates);

  return (
    <>
      <ConfettiAnimation />
      <Screen>
        <View style={styles.container}>
          <HeadingText>Statistics</HeadingText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ResultsScreen")}
          >
            <Ionicons name="arrow-back" size={25} color={colors.light} />
          </TouchableOpacity>
          <Text style={styles.text}>{statistics.nameOfSession}</Text>
          <Text style={styles.dateText}>
            {startDate} until {endDate}
          </Text>
          <View style={styles.winnerView}>
            <View style={styles.faceAndTrophyContainer}>
              <TouchableOpacity style={styles.makeItRound}>
                <Image
                  source={{
                    width: 50,
                    height: 50,
                    resizeMode: "cover",
                    uri: winner.profilePic,
                  }}
                />
              </TouchableOpacity>
              <FontAwesome5 name="trophy" size={24} color={colors.gold} />
            </View>
            <Text style={styles.winnerText}>Congrats, {winner.name}!</Text>
          </View>
          <View style={styles.candidatesContainer}>
            {statistics.candidates.map((c, index) => {
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
          <Text style={styles.dateText}>candidates for this session</Text>

          {/* <Text style={styles.text}>
            Number of voters: {statistics.votersCount}
          </Text>
          <Text style={styles.text}>
            Vote count for winner: {voteCountForWinner}
          </Text>
          <Text>
            Note: so now just display faces of winners and other candidates and
            add confetti
          </Text> */}
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
  candidatesContainer: {
    backgroundColor: colors.superLightGray,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 70,
    marginVertical: 10,
    padding: 10,
  },
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },
  dateText: {
    alignSelf: "center",
    fontSize: 12,
    color: colors.medium,
  },
  faceAndTrophyContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  makeItRound: {
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderRadius: 50 / 2,
    borderColor: colors.superLightGray,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    marginRight: 20,
    overflow: "hidden",
    width: 50,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  winnerView: {
    backgroundColor: colors.white,
    margin: 10,
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  winnerText: {
    fontWeight: "bold",
  },
});

export default StatisticsScreen;
