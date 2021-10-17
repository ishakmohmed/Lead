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
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="result"
        component={LogoutScreen}
        initialParams={{ icon: "percentage" }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="add"
        component={LogoutScreen}
        initialParams={{ icon: "plus-square" }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="edit"
        component={LogoutScreen}
        initialParams={{ icon: "user-edit" }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="logout"
        component={LogoutScreen}
        initialParams={{ icon: "running" }}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
