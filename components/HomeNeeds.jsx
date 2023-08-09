import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeNeeds({ navigateToLaundryScreen }) {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
          justifyContent: "space-around",
          backgroundColor: "#F8F8F8",
        }}
        // onPress={() => navigation.navigate("Laundry-Screen")}
        onPress={navigateToLaundryScreen}
      >
        <View>
          <Image
            source={require("../assets/images/house.png")}
            style={{ width: 70, height: 70 }}
          ></Image>
        </View>
        <View>
          <Text style={{ fontWeight: 700 }}>
            Individual Plan {"\n"}
            Simple solutions for your comfort
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
