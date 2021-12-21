import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";

function ImageUpload({
  profilePic,
  setProfilePic,
  setFullReponseFromImagePicker,
}) {
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted")
      alert("Sorry, Lead! needs gallery permissions to make this work!");
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });

      if (!response.cancelled) {
        try {
          setProfilePic(response.uri);
          setFullReponseFromImagePicker(response);
          // A better implementation would be to send just the entire response to parent instead of sending the reponse + response.uri and then the parent can derive whatever sub values from this big response object
        } catch (error) {
          console.log(error);
        }
      }
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
            <FontAwesome5
              name="cloud-upload-alt"
              size={20}
              color={colors.black}
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
    borderRadius: 75 / 2,
    height: 75,
    justifyContent: "center",
    overflow: "hidden",
    width: 75,
  },
});

export default ImageUpload;
