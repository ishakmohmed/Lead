import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Text from "../components/Text";
import HeadingText from "../components/HeadingText";
import colors from "../config/colors";
import { ErrorMessage, Form, FormField } from "../components/forms";
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import defaultStyles from "../config/styles";
import Button from "../components/Button";

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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsersAsCandidates, setSelectedUsersAsCandidates] = useState(
    []
  );
  const [search, setSearch] = useState("");
  const getAllUserApi = useApi(userApi.getAllUsers);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const { data: usersFromBackend } = await getAllUserApi.request();

    setAllUsers(usersFromBackend);
  };

  const handleSubmit = async (data) => {
    console.log("HELLO, WORLD!");
  };

  const searchFilter = (textThatTheUserTypesInRealTime) => {
    if (textThatTheUserTypesInRealTime) {
      const newData = allUsers.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = textThatTheUserTypesInRealTime.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setFilteredUsers(newData);
      setSearch(textThatTheUserTypesInRealTime);
    } else {
      setFilteredUsers(allUsers);
      setSearch(textThatTheUserTypesInRealTime);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.userSearchView}>
        <TouchableOpacity style={styles.makeItRound}>
          <Image
            source={{
              width: 50,
              height: 50,
              resizeMode: "cover",
              uri: item.profilePic,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.text}>
          {item.name.length > 10
            ? item.name.substring(0, 10) + "..."
            : item.name}
        </Text>
        <Button
          title="Add"
          onPress={() => console.log("DAMN!")}
          color="black"
        />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: colors.superLightGray,
          marginVertical: 20,
        }}
      />
    );
  };

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
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInputStyle}
            value={search}
            placeholder="Search candidates..."
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
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
  makeItRound: {
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderRadius: 50 / 2,
    borderColor: colors.superLightGray,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
    width: 50,
  },
  searchContainer: {
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 5,
    padding: 15,
    width: "100%",
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  textInputStyle: {
    ...defaultStyles.text,
    fontWeight: "bold",
    height: "100%",
    width: "100%",
  },
  userSearchView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProfileScreen;
