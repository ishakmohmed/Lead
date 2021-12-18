import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

function ConfettiAnimation() {
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/confettiAnimation.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.black,
    opacity: 0.5,
    height: "50%",
    width: "100%",
    zIndex: 5,
  },
});

export default ConfettiAnimation;
