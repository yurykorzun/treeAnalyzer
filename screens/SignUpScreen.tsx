import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/app";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackPrams";
import { StackNavigationProp } from "@react-navigation/stack";

type signUpScreenProp = StackNavigationProp<RootStackParamList, "SignUp">;

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<signUpScreenProp>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    return (
      firstName &&
      firstName.length > 0 &&
      lastName &&
      lastName.length > 0 &&
      email &&
      email.length > 0
    );
  };

  const handleSignup = () => {
    if (validate()) {
      setShowError(false);
      setErrorMessage("");

      dispatch(setUser({ firstName, lastName, email }));
      setFirstName("");
      setLastName("");
      setEmail("");

      navigation.navigate("Root");
    } else {
      setShowError(true);
      setErrorMessage("Invalid input");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{"Sign up"}</Text>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your First name"
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Last name"
          value={lastName}
          onChangeText={(value) => setLastName(value)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Email"
          value={email}
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
        />
        <TouchableOpacity
          disabled={!validate()}
          style={styles.loginButton}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {showError ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#76c893",
  },
  titleText: {
    fontSize: 22,
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  titleContainer: {
    padding: 20,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  touchableContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  error: {
    marginVertical: 20,
    color: "red",
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#34a0a4",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
