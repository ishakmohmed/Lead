import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Text from "../components/Text";
import HeadingText from "../components/HeadingText";
import colors from "../config/colors";
import { ErrorMessage, Form, FormField } from "../components/forms";

const validationSchema = Yup.object().shape({
  nameOfSession: Yup.string()
    .required()
    .min(5)
    .max(20)
    .label("Name of Session"),
});

function ProfileScreen() {
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);

    logIn(result.data);
  };

  return (
    <Screen style={styles.container}>
      <HeadingText>Add Session</HeadingText>
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
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default ProfileScreen;
