import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";

// I didn't use Formik here although I used in other parts of the app
// The reason is because I just wanna move fast and there's only one input field in this screen

function ProfileScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <HeadingText>Add Session</HeadingText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ProfileScreen;
