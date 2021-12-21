import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import Text from "../components/Text";
import Button from "../components/Button";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";
import ImageUpload from "../components/ImageUpload";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  bio: Yup.string().required().min(5).max(50).label("Bio"),
  password: Yup.string().required().min(4).label("Password"),
});

function ProfileScreen() {
  // Note: useApi() below is not utilized to its max capabilities, because I forgot about what it can do earlier since I borrowed this hook from a previous project I worked on

  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [fullReponseFromImagePicker, setFullReponseFromImagePicker] =
    useState("");
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  useEffect(() => {
    getDetailsOfAUser();
  }, []);

  useEffect(() => console.log("CURRENT USER VALUE IS, ", user), [user]);

  const getDetailsOfAUser = async () => {
    const data = await userApi.getDetailsOfAUser(user.id);

    setUser(data.data.user);
    setProfilePic(data.data.user.profilePic);
  };

  const uploadPicToCloudinaryAndGetPicUrl = async () => {
    let base64Img = `data:image/jpg;base64,${fullReponseFromImagePicker.base64}`;
    let data = {
      file: base64Img,
      upload_preset: "hit_me_up",
    };

    const url = await fetch(
      "https://api.cloudinary.com/v1_1/ishaks-cloudinary/image/upload",
      {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }
    )
      .then(async (r) => {
        let data = await r.json();

        return data.secure_url;
      })
      .catch((err) => console.log(err));

    return url;
  };

  const handleSubmit = async (userInfo) => {
    try {
      if (!profilePic) return setError("Please upload a profile pic.");
      else setError("");

      const profilePicFromCloudinary =
        await uploadPicToCloudinaryAndGetPicUrl();

      if (!profilePicFromCloudinary)
        return setError("Please upload pic again.");

      userInfo.profilePic = profilePicFromCloudinary;

      const result = await registerApi.request(userInfo);

      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log(result);
        }

        return;
      }

      const { data: authToken } = await loginApi.request(
        userInfo.email,
        userInfo.password
      );
      auth.logIn(authToken);
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <View style={styles.veryTopView}>
          <TouchableOpacity style={styles.button} onPress={() => setUser(null)}>
            <MaterialIcons name="logout" size={24} color={colors.white} />
          </TouchableOpacity>
          <HeadingText>Update</HeadingText>
        </View>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <ImageUpload
            profilePic={profilePic}
            setProfilePic={setProfilePic}
            setFullReponseFromImagePicker={setFullReponseFromImagePicker}
          />
          <Text style={styles.text}>New Name</Text>
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
            value={user.name}
          />
          <Text style={styles.text}>New Email</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            value={user.email}
          />
          <Text style={styles.text}>New Bio</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="pen"
            name="bio"
            placeholder="Bio..."
            value={user.bio}
          />
          <Text style={styles.text}>New Password</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <Text style={styles.smallText}>
            Only fill-up new password if needed
          </Text>
          <SubmitButton color="nicePink" title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    width: 70,
    position: "absolute",
    right: 0,
  },
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  smallText: {
    color: colors.medium,
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  veryTopView: {
    display: "flex",
    flexDirection: "row",
  },
});

export default ProfileScreen;
