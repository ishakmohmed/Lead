import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogoutScreen from "../screens/LogoutScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="queue"
        component={LogoutScreen}
        initialParams={{ icon: "people" }}
      />
      <Tab.Screen
        name="order"
        component={LogoutScreen}
        initialParams={{ icon: "grading" }}
      />
      <Tab.Screen
        name="+food"
        component={LogoutScreen}
        initialParams={{ icon: "fastfood" }}
      />
      <Tab.Screen
        name="menu"
        component={LogoutScreen}
        initialParams={{ icon: "restaurant-menu" }}
      />
      <Tab.Screen
        name="logout"
        component={LogoutScreen}
        initialParams={{ icon: "logout" }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;