import React, { useState } from "react";
import { Dimensions, StatusBar, View, StyleSheet } from "react-native";

import Tab from "./Tab";
import colors from "../config/colors";

const { width } = Dimensions.get("screen");

function TabBar({ navigation, state }) {
  const [selected, setSelected] = useState("vote");
  const { routes } = state;
  const renderColor = (currentTab) =>
    currentTab === selected ? colors.nicePink : colors.black;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopColor: colors.superLightGray,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    width: "100%",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "absolute",
    bottom: 0,
    width,
  },
});

export default TabBar;
