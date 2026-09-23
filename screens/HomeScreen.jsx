import {
  Platform,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo, Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import HomeNeeds from "../components/HomeNeeds";
import OfficeNeeds from "../components/OfficeNeeds";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Relax, we are fetching you location...",
  );
  useEffect(() => {
    let active = true;
    const locate = async () => {
      try {
        if (!(await Location.hasServicesEnabledAsync())) {
          if (active)
            setDisplayCurrentAddress("Enter your pickup address at checkout");
          return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (active)
            setDisplayCurrentAddress("Enter your pickup address at checkout");
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        // Expo's reverse geocoding is native-only; the web checkout accepts an address.
        if (Platform.OS === "web") {
          if (active)
            setDisplayCurrentAddress("Enter your pickup address at checkout");
          return;
        }
        const [address] = await Location.reverseGeocodeAsync(coords);
        if (active) {
          setDisplayCurrentAddress(
            address
              ? [address.name, address.city, address.region, address.country]
                  .filter(Boolean)
                  .join(", ")
              : "Enter your pickup address at checkout",
          );
        }
      } catch {
        if (active)
          setDisplayCurrentAddress("Enter your pickup address at checkout");
      }
    };
    locate();
    return () => {
      active = false;
    };
  }, []);

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
