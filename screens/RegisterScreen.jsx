import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  //   const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigation = useNavigation();
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

          <Pressable
            //   onPress={login}
            style={styles.signUpButton}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Login
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
