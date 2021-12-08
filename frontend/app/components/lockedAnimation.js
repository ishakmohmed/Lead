import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

function WorkingTogetherAnimation() {
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/lockedAnimation.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.white,
    height: "100%",
    opacity: 1,
    width: "100%",
    zIndex: 1,
  },
});

export default WorkingTogetherAnimation;
