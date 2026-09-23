import { Text, View, Image, Pressable } from "react-native";
import React from "react";

export default function OfficeNeeds({ navigateToLaundryScreen }) {
  return (
    <View>
      <Pressable
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
          justifyContent: "space-around",
          backgroundColor: "#F8F8F8",
        }}
        onPress={navigateToLaundryScreen}
      >
        <View>
          <Image
            source={require("../assets/images/office.png")}
            style={{ width: 70, height: 70 }}
          ></Image>
        </View>
        <View>
          <Text style={{ fontWeight: 700 }}>
            Business Plan {"\n"}
            More time for business processes
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
