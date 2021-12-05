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

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: colors.superLightGray,
          marginVertical: 20,
        }}
      />
    );
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
        {allVotingSessions && (
          <FlatList
            data={allVotingSessions}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={EachVotingSession}
            style={styles.flatList}
          />
        )}
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
