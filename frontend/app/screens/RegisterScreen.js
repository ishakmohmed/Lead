import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import ImgToBase64 from "react-native-image-base64";

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
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";
import ImageUpload from "../components/ImageUpload";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  bio: Yup.string().required().min(5).max(50).label("bio"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const [error, setError] = useState();
  const [profilePic, setProfilePic] = useState("");
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  const uploadPic = async (media) => {
    try {
      const form = new FormData();

      form.append("file", media);
      form.append("upload_preset", "hit_me_up");
      form.append("cloud_name", "ishaks_cloudinary");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ishaks-cloudinary/image/upload",
        form
      );

      console.log("CALLED");

      console.log("dude, res.data.url is >>> ", res.data.url);

      return res.data.url;
    } catch (error) {
      return;
    }
  };

  const handleSubmit = async (userInfo) => {
    if (!userInfo) return setError("Please upload a profile pic.");

    console.log("profile pic is >>> ", profilePic);

    try {
      console.log("nice001");
      // problem: next commandssss are not executed >
      ImgToBase64.getBase64String(profilePic).then((base64String) =>
        setProfilePic(base64String)
      );
      console.log("nice002");
    } catch (error) {
      return;
    }

    console.log("but now, ", profilePic);

    const profilePicFromCloudinary = await uploadPic(profilePic); // implement!

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
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <HeadingText>Register</HeadingText>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <ImageUpload profilePic={profilePic} setProfilePic={setProfilePic} />
          <ErrorMessage error={error} visible={error} />
          <Text style={styles.text}>Name</Text>
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <Text style={styles.text}>Email</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <Text style={styles.text}>Bio</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="pen"
            name="bio"
            placeholder="Bio..."
          />
          <Text style={styles.text}>Password</Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton color="nicePink" title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default RegisterScreen;
