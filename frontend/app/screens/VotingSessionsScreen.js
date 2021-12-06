import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import EachVotingSession from "../components/EachVotingSession";
import useApi from "../hooks/useApi";
import votingApi from "../api/voting";
import colors from "../config/colors";

function VotingSessionsScreen({ navigation }) {
  const getAllVotingSessionsApi = useApi(votingApi.getAllVotingSessions);
  const [allVotingSessions, setAllVotingSessions] = useState([]);

  useEffect(() => {
    getAllVotingSessions();
  }, []);

  const getAllVotingSessions = async () => {
    const { data } = await getAllVotingSessionsApi.request();

    setAllVotingSessions(data.allVotingSessions);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Voting Sessions</HeadingText>
        {/* <Button
          title="Click Me"
          onPress={() => navigation.navigate("ActualVotingScreen")}
          color="nicePink"
        /> */}
        {allVotingSessions &&
          allVotingSessions.map((vs, index) => {
            return (
              <EachVotingSession
                nameOfSession={vs.nameOfSession}
                candidates={vs.candidates}
                dateCreated={vs.dateCreated}
                key={index}
              />
            );
          })}
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
  flatList: {
    borderColor: colors.superLightGray,
    borderWidth: 0.5,
    flexGrow: 0,
    height: 70,
    marginBottom: 20,
    padding: 10,
  },
});

export default VotingSessionsScreen;
