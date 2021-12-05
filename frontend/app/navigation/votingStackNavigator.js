import React from "react";
import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import VotingSessionsScreen from "../screens/VotingSessionsScreen";
import ActualVotingScreen from "../screens/ActualVotingScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="VotingSessionsScreen"
      component={VotingSessionsScreen}
    />
    <Stack.Screen name="ActualVotingScreen" component={ActualVotingScreen} />
  </Stack.Navigator>
);

export default function votingStackNavigator() {
  return (
    <StackNavigator />
  );
}
