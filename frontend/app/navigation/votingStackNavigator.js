import React from "react";
import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import VotingSessionsScreen from "../screens/VotingSessionsScreen";
import ActualVotingScreen from "../screens/ActualVotingScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      title: "ALL TWEETS",
      headerStyle: { backgroundColor: "tomato" },
      headerTintColor: "white",
      // headerShown: false,
    }}
  >
    <Stack.Screen
      name="VotingSessionsScreen"
      component={VotingSessionsScreen}
      options={{
        title: "ALL TWEETS",
        headerStyle: { backgroundColor: "tomato" },
        headerTintColor: "white",
        // headerShown: false,
      }}
    />
    <Stack.Screen
      name="ActualVotingScreen"
      component={ActualVotingScreen}
      // options={({ route }) => ({ title: route.params.id })}
    />
  </Stack.Navigator>
);

export default function votingStackNavigator() {
  return (
    // <NavigationContainer>
      <StackNavigator />
    // </NavigationContainer>
  );
}
