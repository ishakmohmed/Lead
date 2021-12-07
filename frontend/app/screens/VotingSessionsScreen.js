import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ActivityIndicatorForScrollableView from "../components/ActivityIndicatorForScrollableView";
import HeadingText from "../components/HeadingText";
import EachVotingSession from "../components/EachVotingSession";
import useApi from "../hooks/useApi";
import votingApi from "../api/voting";
import colors from "../config/colors";

function VotingSessionsScreen({ navigation }) {
  // Note: useApi() below is not utilized to its max capabilities, because I forgot about what it can do earlier since I borrowed this hook from a previous project I worked on

  const getAllVotingSessionsApi = useApi(votingApi.getAllVotingSessions);
  const [allVotingSessions, setAllVotingSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllVotingSessions();
  }, []);

  const getAllVotingSessions = async () => {
    setLoading(true);

    const { data } = await getAllVotingSessionsApi.request();

    setAllVotingSessions(data.allVotingSessions.reverse());
    setLoading(false);
  };

  const handlePressReloadButton = async () => {
    await getAllVotingSessions();
  };

  const handlePressEndSessionButton = async (votingSessionId) => {
    await votingApi.endAVotingSession(votingSessionId);
    await getAllVotingSessions();
  };

  const handlePressVoteButton = (votingSessionId) => {
    navigation.navigate("ActualVotingScreen", { votingSessionId });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Voting Sessions</HeadingText>
        <TouchableOpacity onPress={handlePressReloadButton} style={styles.icon}>
          <Ionicons name="reload-circle" size={50} color={colors.light} />
        </TouchableOpacity>
        <ActivityIndicatorForScrollableView visible={loading} />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {allVotingSessions &&
            allVotingSessions.map((vs, index) => {
              return (
                <EachVotingSession
                  nameOfSession={vs.nameOfSession}
                  candidates={vs.candidates}
                  dateCreated={vs.dateCreated}
                  creatorId={vs.creatorId}
                  key={index}
                  votingSessionId={vs._id}
                  onPressEndSessionButton={handlePressEndSessionButton}
                  onPressVoteButton={handlePressVoteButton}
                />
              );
            })}
        </ScrollView>
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
  flatList: {
    borderColor: colors.superLightGray,
    borderWidth: 1,
    flexGrow: 0,
    height: 70,
    marginBottom: 20,
    padding: 10,
  },
  icon: {
    alignSelf: "center",
  },
  scrollView: {
    marginBottom: 200,
  },
});

export default VotingSessionsScreen;
