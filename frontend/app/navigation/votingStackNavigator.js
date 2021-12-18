import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VotingSessionsScreen from "../screens/VotingSessionsScreen";
import ActualVotingScreen from "../screens/ActualVotingScreen";

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
