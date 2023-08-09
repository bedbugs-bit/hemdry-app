import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import LaundryItems from "../components/LaundryItems";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";

export default function LaundryScreen({ route }) {
  const { displayCurrentAddress } = route.params;

  const navigation = useNavigation();

  const laundryServices = [
    {
      id: "001",
      image: require("../assets/images/hawaiian-shirt.png"),
      name: "Shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "002",
      image: require("../assets/images/dress.png"),
      name: "Dress",
      quantity: 0,
      price: 10,
    },
    {
      id: "003",
      image: require("../assets/images/t-shirt.png"),
      name: "Top",
      quantity: 0,
      price: 10,
    },
    {
      id: "004",
      image: require("../assets/images/trouser.png"),
      name: "Trouser",
      quantity: 0,
      price: 10,
    },
    {
      id: "005",
      image: require("../assets/images/sweater.png"),
      name: "Sweater",
      quantity: 0,
      price: 10,
    },

    {
      id: "006",
      image: require("../assets/images/suit.png"),
      name: "Suit",
      quantity: 0,
      price: 10,
    },
    {
      id: "007",
      image: require("../assets/images/shorts.png"),
      name: "Shorts",
      quantity: 0,
      price: 10,
    },

    {
      id: "008",
      image: require("../assets/images/undergarment.png"),
      name: "Undergarment",
      quantity: 0,
      price: 10,
    },
    {
      id: "009",
      image: require("../assets/images/double-bed.png"),
      name: "Bedding",
      quantity: 0,
      price: 10,
    },

    {
      id: "010",
      image: require("../assets/images/footware.png"),
      name: "Footware",
      quantity: 0,
      price: 10,
    },

    {
      id: "011",
      image: require("../assets/images/fabric.png"),
      name: "Fabric",
      quantity: 0,
      price: 10,
    },

    {
      id: "012",
      image: require("../assets/images/garment.png"),
      name: "Lace",
      quantity: 0,
      price: 10,
    },
  ];

  // REDUX
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = () => {
      laundryServices.map((service) => {
        dispatch(getProducts(service));
      });
    };
    fetchProducts();
  }, []);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  console.log(total);
  return (
    <>
      <ScrollView style={{ marginTop: 20 }}>
        {/* Laundry Services Available  */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
        >
          <Entypo name="location" size={33} color="#c1121f" />
          <View>
            <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 3 }}>
              Hemdry
            </Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 30, height: 30, borderRadius: 20 }}
              source={require("../assets/images/user.png")}
            ></Image>
          </Pressable>
        </View>

        {/* DISPLAY LAUNDRY GARMENTS */}

        <SafeAreaView>
          {product.map((item, index) => (
            <LaundryItems item={item} key={index} />
          ))}
        </SafeAreaView>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} item(s) | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                marginVertical: 4,
              }}
            >
              Extra charges might apply
            </Text>
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate("PickUp", {
                location: displayCurrentAddress,
              })
            }
            style={{ padding: 8 }}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
