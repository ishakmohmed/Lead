import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import LogoutScreen from "../screens/LogoutScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="vote"
        component={LogoutScreen}
        initialParams={{ icon: "vote-yea" }}
      />
      <Tab.Screen
        name="results"
        component={LogoutScreen}
        initialParams={{ icon: "trophy" }}
      />
      <Tab.Screen
        name="add"
        component={LogoutScreen}
        initialParams={{ icon: "plus-circle" }}
      />
      <Tab.Screen
        name="edit"
        component={LogoutScreen}
        initialParams={{ icon: "user-edit" }}
      />
      <Tab.Screen
        name="logout"
        component={LogoutScreen}
        initialParams={{ icon: "running" }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
