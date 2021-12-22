import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
import UploadScreen from "./UploadScreen";
import authApi from "../api/auth";
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import Text from "../components/Text";
import Button from "../components/Button";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";
import ImageUploadSmall from "../components/ImageUploadSmall";
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
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const updateUserApi = useApi(userApi.updateUser);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  useEffect(() => {
    getDetailsOfAUser();
  }, []);

  const getDetailsOfAUser = async () => {
    const data = await userApi.getDetailsOfAUser(user.id);

    setUser(data.data.user);
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
      if (!profilePic) {
        userInfo.profilePic = user.profilePic;
      } else {
        const profilePicFromCloudinary =
          await uploadPicToCloudinaryAndGetPicUrl();

        if (!profilePicFromCloudinary)
          return setError("Please upload pic again.");

        userInfo.profilePic = profilePicFromCloudinary;
      }

      setUploadVisible(true);

      const result = await updateUserApi.request(
        userInfo,
        user._id,
        (progress) => setProgress(progress)
      );

      setUploadVisible(false);

      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log(result);
        }

        return;
      } else {
        setUser(null);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <ActivityIndicator visible={updateUserApi.loading} />
      <Screen style={styles.container}>
        <UploadScreen progress={progress} visible={uploadVisible} />
        <View style={styles.veryTopView}>
          <TouchableOpacity style={styles.button} onPress={() => setUser(null)}>
            <MaterialIcons name="logout" size={24} color={colors.white} />
          </TouchableOpacity>
          <HeadingText>Profile</HeadingText>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Form
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={error} visible={error} />
            <View style={styles.profilePicView}>
              <TouchableOpacity style={styles.uploadBtn}>
                <Image
                  source={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    uri: user.profilePic,
                  }}
                />
              </TouchableOpacity>
              <ImageUploadSmall
                profilePic={profilePic}
                setProfilePic={setProfilePic}
                setFullReponseFromImagePicker={setFullReponseFromImagePicker}
              />
            </View>
            <Text style={styles.text}>Name</Text>
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder={user.name}
            />
            <Text style={styles.text}>Email</Text>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder={user.email}
              textContentType="emailAddress"
            />
            <Text style={styles.text}>Bio</Text>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="pen"
              name="bio"
              placeholder={user.bio}
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
            <SubmitButton color="nicePink" title="Update" />
          </Form>
        </ScrollView>
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
  profilePicView: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  scrollView: {
    marginBottom: 50,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  uploadBtn: {
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderColor: colors.superLightGray,
    borderRadius: 75 / 2,
    borderWidth: 1,
    height: 75,
    overflow: "hidden",
    width: 75,
  },
  veryTopView: {
    display: "flex",
    flexDirection: "row",
  },
});

export default ProfileScreen;
