import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: require("../assets/images/laundry-machine.png"),
      name: "Wash & Fold",
    },
    {
      id: "11",
      image: require("../assets/images/dry-cleaning.png"),
      name: "Dry Clean",
    },
    {
      id: "12",
      image: require("../assets/images/ironing-board.png"),
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: require("../assets/images/stain-remover.png"),
      name: "Stain Treatment",
    },
  ];
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        How can we help you?
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable
            style={{
              margin: 10,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 7,
            }}
            key={index}
          >
            <Image source={service.image} style={{ width: 70, height: 70 }} />

            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
