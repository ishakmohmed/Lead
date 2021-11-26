import React, { useEffect, useState } from "react";
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
  const [hasErrorForNameOfSession, setHasErrorForNameOfSession] =
    useState(false);
  const [hasErrorForCandidates, setHasErrorForCandidates] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const handleSubmit = async (data) => {
    console.log("dude, the data is ", data);
  };

  useEffect(() => {
    
  }, []);

  return (
    <Screen style={styles.container}>
      <HeadingText>Add Session</HeadingText>
      <Form
        initialValues={{
          nameOfSession: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Name of session must be of length 5 to 20."
          visible={hasErrorForNameOfSession}
        />
        <ErrorMessage
          error="You must select 2 to 5 candidates only."
          visible={hasErrorForCandidates}
        />
        <Text style={styles.text}>Name of Session</Text>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="vote"
          name="nameOfSession"
          placeholder="President of IT Club..."
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
