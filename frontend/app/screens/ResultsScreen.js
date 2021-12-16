import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ActivityIndicatorForScrollableView from "../components/ActivityIndicatorForScrollableView";
import HeadingText from "../components/HeadingText";
import EachVotingResult from "../components/EachVotingResult";
import useApi from "../hooks/useApi";
import votingApi from "../api/voting";
import colors from "../config/colors";

function ResultsScreen({ navigation }) {
  // Note: useApi() below is not utilized to its max capabilities, because I forgot about what it can do earlier since I borrowed this hook from a previous project I worked on

  const getAllEndedVotingSessionsApi = useApi(
    votingApi.getAllEndedVotingSessions
  );
  const [allVotingSessions, setAllVotingSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllEndedVotingSessions();
  }, []);

  const getAllEndedVotingSessions = async () => {
    setLoading(true);

    const { data } = await getAllEndedVotingSessionsApi.request();

    setAllVotingSessions(data.allVotingSessions.reverse());

    console.log("well >>> ", data.allVotingSessions.reverse());

    setLoading(false);
  };

  const handlePressReloadButton = async () => {
    await getAllEndedVotingSessions();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Final Result</HeadingText>
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
                <EachVotingResult
                  nameOfSession={vs.nameOfSession}
                  candidates={vs.candidates}
                  dateEnded={vs.dateEnded}
                  winnerId={vs.winnerId}
                  creatorId={vs.creatorId}
                  key={index}
                  votingSessionId={vs._id}
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

export default ResultsScreen;
