import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ResultsScreen from "../screens/ResultsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Stack = createStackNavigator();
const StackNavigator = () => {
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerShown: false,
    }}
  >
    <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
    <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />
  </Stack.Navigator>;
};

export default function resultStackNavigator() {
  return <StackNavigator />;
}
