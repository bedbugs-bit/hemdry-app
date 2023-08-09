import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import HomeNeeds from "../components/HomeNeeds";
import OfficeNeeds from "../components/OfficeNeeds";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Relax, we are fetching you location..."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services to continue",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    let { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //   console.log(response);

      for (let item of response) {
        let address = `  ${item.name} ${item.city}, ${item.region}, ${item.country} `;
        setDisplayCurrentAddress(address);
        // console.log(address);
      }
    }
  };

  const navigation = useNavigation();

  const navigateToLaundryScreen = () => {
    navigation.navigate("Laundry-Screen", { displayCurrentAddress });
  };

  return (
    <ScrollView style={{ marginTop: 30 }}>
      {/* LOCATION AND PROFILE */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Entypo name="location" size={33} color="#c1121f" />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 3 }}>
            Hemdry
          </Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable
          style={{ marginLeft: "auto", marginRight: 7 }}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Image
            style={{ width: 30, height: 30, borderRadius: 20 }}
            source={require("../assets/images/user.png")}
          ></Image>
        </Pressable>
      </View>

      {/* SEARCH BAR */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for icons" />
        <Feather name="search" size={24} color="black" />
      </View>

      {/* IMAGE CAROUSEL */}
      <Carousel />

      {/* LAUNDRY SERVICES */}
      <Services />

      {/* HOME AND OFFICE NEEDS */}
      <HomeNeeds navigateToLaundryScreen={navigateToLaundryScreen} />

      <OfficeNeeds navigateToLaundryScreen={navigateToLaundryScreen} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
