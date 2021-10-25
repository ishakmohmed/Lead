import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../config/colors";

function Tab({ color, icon, onPress, tab }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <FontAwesome5 name={icon} size={20} color={color} />}
      <Text style={styles.text}>{tab.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  text: {
    color: colors.black,
    marginTop: 5,
  },
});

export default Tab;
