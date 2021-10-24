import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";

function ImageUpload({ profilePic, setProfilePic }) {
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted")
      alert("Sorry, Lead! needs gallery permissions to make this work!");
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) setProfilePic(response.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtn}>
        {profilePic ? (
          <Image
            source={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              uri: profilePic,
            }}
          />
        ) : (
          <>
            <Text
              style={{
                color: colors.medium,
                fontSize: 16,
                fontWeight: "bold",
                margin: 10,
                textAlign: "center",
              }}
            >
              Profile Pic
            </Text>
            <FontAwesome5
              name="cloud-upload-alt"
              size={20}
              color={colors.medium}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  uploadBtn: {
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderRadius: 125 / 2,
    height: 125,
    justifyContent: "center",
    overflow: "hidden",
    width: 125,
  },
});

export default ImageUpload;
