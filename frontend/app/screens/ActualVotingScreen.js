import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import HeadingText from "../components/HeadingText";
import colors from "../config/colors";
import votingApi from "../api/voting";

function ActualVotingScreen({ navigation, route }) {
  console.log(route.params.votingSessionId);
  const [votingSession, setVotingSession] = useState({});

  useEffect(() => {
    getCurrentVotingSession();
  }, []);

  const getCurrentVotingSession = async () => {
    const data = await votingApi.getJustOneVotingSession(
      route.params.votingSessionId
    );

    setVotingSession(data.data.votingSession);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Vote Now</HeadingText>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("VotingSessionsScreen")}
        >
          <Ionicons name="arrow-back" size={25} color={colors.light} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    width: 70,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ActualVotingScreen;
