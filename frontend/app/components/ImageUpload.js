import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function ImageUpload() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={{ textAlign: "center" }}>Upload Profile Pic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: {
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderRadius: 100 / 2,
    height: 100,
    justifyContent: "center",
    width: 100,
  },
});

export default ImageUpload;
