import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import EachVotingSession from "../components/EachVotingSession";
import useApi from "../hooks/useApi";
import votingApi from "../api/voting";

function VotingSessionsScreen({ navigation }) {
  const [allVotingSessions, setAllVotingSessions] = useState([]);
  const getAllVotingSessionsApi = useApi(votingApi.getAllVotingSessions);

  useEffect(() => {
    getAllVotingSessions();
  }, []);

  const getAllVotingSessions = async () => {
    try {
      const { data: allVotingSessionsFromBackend } =
        await getAllVotingSessionsApi.request();

      setAllVotingSessions(allVotingSessionsFromBackend);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Voting Sessions</HeadingText>
        <Button
          title="Click Me"
          onPress={() => navigation.navigate("ActualVotingScreen")}
          color="nicePink"
        />
        {/* {allVotingSessions &&
          allVotingSessions.map((vs) => {
            <HeadingText>YO</HeadingText>;
          })} */}
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
});

export default VotingSessionsScreen;
