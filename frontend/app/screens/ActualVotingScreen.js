import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import HeadingText from "../components/HeadingText";
import Text from "../components/Text";
import colors from "../config/colors";
import votingApi from "../api/voting";
import AuthContext from "../auth/context";
import LockedAnimation from "../components/lockedAnimation";

function ActualVotingScreen({ navigation, route }) {
  const [votingSession, setVotingSession] = useState({});
  const [arrayIndexOfSelectedCandidate, setArrayIndexOfSelectedCandidate] =
    useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCurrentVotingSession();
  }, []);

  const getCurrentVotingSession = async () => {
    const data = await votingApi.getJustOneVotingSession(
      route.params.votingSessionId
    );

    setVotingSession(data.data.votingSession);
  };

  const handlePressSelectButton = (selectedCandidateIndex) => {
    setArrayIndexOfSelectedCandidate(selectedCandidateIndex);
    Alert.alert(
      "Confirmation",
      `Cast vote for ${votingSession.candidates[selectedCandidateIndex].name}? Remember, you cannot vote again for this session.`,
      [
        {
          text: "Yes",
          onPress: () => handlePressYesButton(selectedCandidateIndex),
        },
        { text: "Cancel" },
      ]
    );
  };

  const handlePressYesButton = async (index) => {
    const personWhoReceivedVote = votingSession.candidates[index]._id;
    const personWhoCastedVote = user.id;
    const votingSessionId = votingSession._id;

    await votingApi.updateVotingSessionWithNewVote(
      personWhoReceivedVote,
      personWhoCastedVote,
      votingSessionId
    );

    navigation.navigate("VotingSessionsScreen");
  };

  return (
    <Screen>
      <View style={styles.container}>
        {!(
          votingSession &&
          votingSession.whoVotedForThisSession &&
          votingSession.whoVotedForThisSession.includes(user.id)
        ) ? (
          <>
            <HeadingText>Vote Now</HeadingText>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("VotingSessionsScreen")}
            >
              <Ionicons name="arrow-back" size={25} color={colors.light} />
            </TouchableOpacity>
            <ScrollView
              style={styles.kindaLikeFlatList}
              showsVerticalScrollIndicator={false}
            >
              {votingSession.candidates &&
                votingSession.candidates.map((c, index) => {
                  return (
                    <View key={index} style={styles.candidateContainer}>
                      <View style={styles.candidateView}>
                        <TouchableOpacity
                          key={index}
                          style={styles.makeItRound}
                        >
                          <Image
                            source={{
                              width: 50,
                              height: 50,
                              resizeMode: "cover",
                              uri: c.profilePic,
                            }}
                          />
                        </TouchableOpacity>
                        <Text style={styles.candidateName}>{c.name}</Text>
                      </View>
                      <Text style={styles.bio}>"{c.bio}"</Text>
                      <TouchableOpacity
                        style={[
                          styles.selectButton,
                          {
                            backgroundColor:
                              index == arrayIndexOfSelectedCandidate
                                ? colors.nicePink
                                : colors.light,
                          },
                        ]}
                        onPress={() => handlePressSelectButton(index)}
                      >
                        <Text
                          style={[
                            styles.selectButtonText,
                            {
                              color:
                                index == arrayIndexOfSelectedCandidate
                                  ? colors.white
                                  : colors.medium,
                            },
                          ]}
                        >
                          Select
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </ScrollView>
          </>
        ) : (
          <>
            <HeadingText>Session Blocked</HeadingText>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("VotingSessionsScreen")}
            >
              <Ionicons name="arrow-back" size={25} color={colors.light} />
            </TouchableOpacity>
            <Text style={styles.warningText}>
              You already voted for this session. You may cast your vote in
              other sessions.
            </Text>
            <View style={styles.lockedAnimationContainer}>
              <LockedAnimation />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bio: {
    fontSize: 16,
    color: colors.medium,
    textAlign: "center",
    fontStyle: "italic",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    width: 70,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  candidateContainer: {
    borderColor: colors.superLightGray,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  candidateName: {
    fontWeight: "bold",
    marginVertical: 20,
  },
  candidateView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  kindaLikeFlatList: {
    marginTop: 20,
    marginBottom: 180,
  },
  lockedAnimationContainer: {
    width: "50%",
    alignSelf: "center",
    marginBottom: 600,
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
  selectButton: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    marginTop: 30,
    marginLeft: "auto",
    width: 140,
  },
  selectButtonText: {
    color: colors.medium,
    fontSize: 16,
    fontWeight: "bold",
  },
  warningText: {
    backgroundColor: colors.nicePink,
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    padding: 20,
    marginTop: 50,
  },
});

export default ActualVotingScreen;
