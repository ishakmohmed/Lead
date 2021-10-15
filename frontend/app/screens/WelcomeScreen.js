import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import WorkingTogetherAnimation from "../components/workingTogetherAnimation";
import Screen from "../components/Screen";
import Button from "../components/Button";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={{ flex: 1 }}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="crown-outline"
          size={100}
          color="black"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.innerViewOne}>
            <Text style={styles.title}>Lead!</Text>
            <Text style={styles.smallText}>
              E-Voting App for UNITAR International University
            </Text>
          </View>
          <WorkingTogetherAnimation />
          <View style={styles.innerViewTwo}>
            <Text style={styles.tagline}>
              "The best of leaders are elected using the best of voting
              methods".
            </Text>
            <Text style={styles.ishak}>~ Mohmed Ishak, creator</Text>
          </View>
          <View style={styles.innerViewThree}>
            <Button
              title="Login"
              color="blue"
              onPress={() => navigation.navigate(routes.LOGIN)}
            />
            <Button
              title="Register"
              color="orange"
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    padding: 10,
  },
  icon: {
    textAlign: "center",
  },
  ishak: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  innerViewOne: {
    marginVertical: 10,
  },
  innerViewTwo: {
    marginVertical: 10,
  },
  innerViewTwo: {
    marginVertical: 10,
  },
  innerViewThree: {
    marginVertical: 10,
  },
  smallText: {
    color: colors.medium,
    textAlign: "center",
  },
  tagline: {
    color: colors.medium,
    fontSize: 25,
    fontStyle: "italic",
    textAlign: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
