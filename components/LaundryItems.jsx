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
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

export default function LaundryItems({ item }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); // cart
    dispatch(incrementQty(item)); // product
  };

  return (
    <View
      style={{
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 14,
      }}
    >
      <Image
        style={{ width: 70, height: 70 }}
        source={ item.image }
      ></Image>
      <View>
        <Text
          style={{
            width: 83,
            fontSize: 17,
            fontWeight: "500",
            marginBottom: 7,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ width: 60, color: "gray", fontSize: 15 }}>
          ${item.price}
        </Text>
      </View>

      {cart.some((c) => c.id === item.id) ? (
        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(decrementQuantity(item)); // FOR THE CART REDUCER
              dispatch(decrementQty(item)); // FOR THE PRODUCT REDUCER
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8F",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              -
            </Text>
          </Pressable>

          <Pressable>
            <Text
              style={{
                fontSize: 19,
                color: "#088F8F",
                paddingHorizontal: 8,
                fontWeight: "600",
              }}
            >
              {item.quantity}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              dispatch(incrementQuantity(item)); // cart
              dispatch(incrementQty(item)); //product
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8F",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              +
            </Text>
          </Pressable>
        </Pressable>
      ) : (
        <TouchableOpacity onPress={addItemToCart} style={{ width: 80 }}>
          <Text
            style={{
              borderColor: "gray",
              borderRadius: 4,
              borderWidth: 0.8,
              marginVertical: 10,
              color: "#088F8F",
              textAlign: "center",
              padding: 5,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
