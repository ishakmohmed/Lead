import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import LogoutScreen from "../screens/LogoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddSessionScreen from "../screens/AddSessionScreen";
import ResultsScreen from "../screens/ResultsScreen";
import votingStackNavigator from "./votingStackNavigator";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={routes.VOTE}
        component={votingStackNavigator}
        initialParams={{ icon: "vote-yea" }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={routes.RESULTS}
        component={ResultsScreen}
        initialParams={{ icon: "trophy" }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={routes.ADD}
        component={AddSessionScreen}
        initialParams={{ icon: "crown" }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={routes.ACCOUNT}
        component={ProfileScreen}
        initialParams={{ icon: "user-edit" }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
