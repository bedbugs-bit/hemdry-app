import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signInWithCredential, signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { cleanCart } from "../CartReducer";

export default function UserScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
        dispatch(cleanCart());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userString = user.email.split("@");
  const userName = userString[0];

  return (
    <>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          onPress={() => navigation.navigate("Home")}
          name="arrow-back"
          size={30}
          color="black"
        />
        <Text style={{ fontSize: 16 }}> Back to Home</Text>
      </View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          marginLeft: 10,
        }}
      >
        Hemdry
      </Text>
      <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <Image
          style={{ width: 300, height: 250, borderRadius: 10 }}
          source={require("../assets/images/sign-out.avif")}
        ></Image>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
              marginBottom: 3,
              marginTop: 70,
            }}
          >
            Hello, {userName}!
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 13}}>Your favourite Laudry App</Text>
        </View>
        <TouchableOpacity
          onPress={signOutUser}
          style={{
            borderColor: "#088F8F",
            backgroundColor: "#088F8F",

            borderWidth: 4,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 8,
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "400", color: "white", }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
