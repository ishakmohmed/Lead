import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Screen from "../components/Screen";
import AuthContext from "../auth/context";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import ImageUpload from "../components/ImageUpload";

function ProfileScreen() {
  const { user, setUser } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [fullReponseFromImagePicker, setFullReponseFromImagePicker] =
    useState("");

  return (
    <Screen>
      <View style={styles.container}>
        <Button color="blue" title="Logout!" onPress={() => setUser(null)} />
        <HeadingText>Update Profile</HeadingText>
        <ImageUpload
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          setFullReponseFromImagePicker={setFullReponseFromImagePicker}
        />
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
