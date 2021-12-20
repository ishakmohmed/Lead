import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import Text from "../components/Text";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);

    logIn(result.data);
  };

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("welcome")}
      >
        <Ionicons name="arrow-back" size={24} color={colors.light} />
      </TouchableOpacity>
      <HeadingText>Login</HeadingText>
      <Form
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />
        <Text style={styles.text}>Email</Text>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="masteruser@email.com"
          textContentType="emailAddress"
        />
        <Text style={styles.text}>Password</Text>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Masteruser975"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton color="blue" title="Login" />
      </Form>
    </Screen>
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
  },
  container: {
    padding: 10,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginTop: 50,
    marginBottom: 20,
    width: 80,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default LoginScreen;
