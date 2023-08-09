import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderSuccessScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <LottieView
        source={require("../assets/animation-json/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      ></LottieView>

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has Been Placed Successfully!
      </Text>

      <LottieView
        source={require("../assets/animation-json/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      ></LottieView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={{
          borderColor: "#088F8F",
          backgroundColor: "#088F8F",

          borderWidth: 4,
          padding: 10,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 8,
          marginTop: 15,
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "400",
            color: "white",
          }}
        >
          Home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
