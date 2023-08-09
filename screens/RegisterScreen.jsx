import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (email === "" || password === "" || phoneNum === "") {
      Alert.alert(
        "Invalid sign up details",
        "Please fill all the details correctly",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Current User's Credential:  ", userCredential);
        const user = userCredential.user;
        const myUserUid = auth.currentUser.uid;

        // Set Phone Number
        setDoc(doc(db, "users", `${myUserUid}`), {
          email: email,
          phone: phoneNum,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);

        if (errorMessage) {
          Alert.alert("Invalid sign up details", errorMessage.substr(10, 40), [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }

        // ..
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View>
          <Text style={styles.pageHeading}>Hemdry</Text>
        </View>
        <View style={styles.containerHeading}>
          <Text style={{ fontSize: 20, color: "#05668d", fontWeight: "bold" }}>
            Welcome, Register
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create a new account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-variant"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={styles.containerInput}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={styles.containerInput}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SimpleLineIcons name="phone" size={24} color="black" />
            <TextInput
              value={phoneNum}
              onChangeText={(text) => setPhoneNum(text)}
              placeholder="Phone Number"
              placeholderTextColor="black"
              style={styles.containerInput}
            />
          </View>

          <Pressable onPress={handleSignUp} style={styles.signUpButton}>
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Sign Up
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageHeading: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 13,
  },
  containerHeading: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  containerInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    marginVertical: 10,
  },
  signUpButton: {
    width: 200,
    backgroundColor: "#00a896",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  loginButtonText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
});
