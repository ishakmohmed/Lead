import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Text from "../components/Text";
import Button from "../components/Button";
import HeadingText from "../components/HeadingText";
import colors from "../config/colors";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import AuthContext from "../auth/context";
import userApi from "../api/users";
import votingApi from "../api/voting";
import useApi from "../hooks/useApi";
import defaultStyles from "../config/styles";

const validationSchema = Yup.object().shape({
  nameOfSession: Yup.string()
    .required()
    .min(5)
    .max(20)
    .label("Name of Session"),
});

function ProfileScreen() {
  const [hasErrorForCandidates, setHasErrorForCandidates] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsersAsCandidates, setSelectedUsersAsCandidates] = useState(
    []
  );
  const [search, setSearch] = useState("");
  const getAllUserApi = useApi(userApi.getAllUsers);

  // Note: useApi() below is not utilized to its max capabilities, because I forgot about what it can do earlier since I borrowed this hook from a previous project I worked on

  const addVotingSessionApi = useApi(votingApi.addVotingSession);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const { data: usersFromBackend } = await getAllUserApi.request();

    setAllUsers(usersFromBackend);
  };

  const handleSubmit = async ({ nameOfSession }) => {
    if (selectedUsersAsCandidates.length < 2)
      return setHasErrorForCandidates(true);

    addVotingSessionApi.request({
      creatorId: user.id,
      candidates: selectedUsersAsCandidates,
      nameOfSession,
    });

    handleReset();
  };

  const handleReset = () => {
    setHasErrorForCandidates(false);
    setSelectedUsersAsCandidates([]);
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (selectedUsersAsCandidates.length > 4 === false) {
              let candidateCanBeAddedAsHeHasNeverBeenAdded = true;

              for (let c of selectedUsersAsCandidates)
                if (c._id == item._id)
                  candidateCanBeAddedAsHeHasNeverBeenAdded = false;

              if (candidateCanBeAddedAsHeHasNeverBeenAdded) {
                setSelectedUsersAsCandidates([
                  ...selectedUsersAsCandidates,
                  { _id: item._id, profilePic: item.profilePic },
                ]);
              }
            }
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
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
          style={styles.flatList}
        />
        <Text style={styles.text}>Selected Candidates</Text>
        <View style={styles.selectedCandidatesContainer}>
          {selectedUsersAsCandidates[0] && (
            <TouchableOpacity style={styles.makeItRound}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  uri: selectedUsersAsCandidates[0].profilePic,
                }}
              />
            </TouchableOpacity>
          )}
          {selectedUsersAsCandidates[1] && (
            <TouchableOpacity style={styles.makeItRound}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  uri: selectedUsersAsCandidates[1].profilePic,
                }}
              />
            </TouchableOpacity>
          )}
          {selectedUsersAsCandidates[2] && (
            <TouchableOpacity style={styles.makeItRound}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  uri: selectedUsersAsCandidates[2].profilePic,
                }}
              />
            </TouchableOpacity>
          )}
          {selectedUsersAsCandidates[3] && (
            <TouchableOpacity style={styles.makeItRound}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  uri: selectedUsersAsCandidates[3].profilePic,
                }}
              />
            </TouchableOpacity>
          )}
          {selectedUsersAsCandidates[4] && (
            <TouchableOpacity style={styles.makeItRound}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  uri: selectedUsersAsCandidates[4].profilePic,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <ErrorMessage
          error="You must select 2 to 5 candidates only."
          visible={hasErrorForCandidates}
        />
        <SubmitButton color="nicePink" title="Add Session" />
        <Button makeItSmall title="Reset" onPress={handleReset} color="blue" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.nicePink,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    width: 70,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  flatList: {
    borderColor: colors.superLightGray,
    borderWidth: 0.5,
    flexGrow: 0,
    height: 70,
    marginBottom: 20,
    padding: 10,
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
  selectedCandidatesContainer: {
    backgroundColor: colors.superLightGray,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 70,
    marginVertical: 10,
    padding: 10,
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
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 50,
  },
});

export default ProfileScreen;
