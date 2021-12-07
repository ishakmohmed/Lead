import React, { useEffect, useState } from "react";
import {
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
import Button from "../components/Button";
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
        <ScrollView style={styles.kindaLikeFlatList}>
          {votingSession.candidates &&
            votingSession.candidates.map((c, index) => {
              return (
                <View key={index} style={styles.candidateContainer}>
                  <View style={styles.candidateView}>
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
                    <Text style={styles.candidateName}>{c.name}</Text>
                  </View>
                  <Text style={styles.bio}>"{c.bio}"</Text>
                  <TouchableOpacity style={styles.selectButton}>
                    <Text
                      style={[
                        styles.selectButtonText,
                        { color: colors.medium },
                      ]}
                    >
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
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
    marginBottom: 150,
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
});

export default ActualVotingScreen;
