import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Tab({ color, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <MaterialIcons name={icon} size={30} color={color} />}
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
});

export default Tab;