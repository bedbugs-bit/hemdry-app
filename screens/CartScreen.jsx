import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { cleanCart } from "../CartReducer";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

export default function CartScreen({ route }) {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const deliveryFee = total * 0.8;
  const navigation = useNavigation();
  const { selectedTime, noOfDays, pickUpDate } = route.params;
  const dispatch = useDispatch();
  const userUid = auth.currentUser.uid;
  const userName = auth.currentUser.email;

  const html = `
  <html> 
    <body> 
      <h1> HEMDRY APP 
      <br>*************************************</h1>
      <h2> CASH RECEIPTS
      <br>************************************</h2>

      <h3> Selected Time for Delivery </h3>
      <p>${selectedTime}
      <br>************************************</p>
      <h3>Pick Up date</h3>
      <p>${pickUpDate}
      <br>************************************</P>
      <h3>Total</h3>
      <p>${deliveryFee}
      <br>************************************</P>
      <h4>THANK YOU!</h4>
      
    </body>
  </html>`;

  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(doc(db, "userOrders", `${userUid}`), {
      orders: { ...cart },
      orderDetails: route.params,
      customerEmail: userName.toString(),
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={30}
                color="black"
              />
              <Text style={{ fontSize: 16 }}> Back to Cart</Text>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 25, fontWeight: 800, marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    ${total}
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {pickUpDate}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {noOfDays}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {selectedTime}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Delivery Fee
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {deliveryFee}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                    $ {total + deliveryFee}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <>
          <Pressable
            style={{
              backgroundColor: "#84c7c7",
              marginTop: "auto",
              padding: 10,
              marginBottom: 10,
              margin: 15,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "black",
              borderWidth: 3,
            }}
          >
            <Pressable onPress={printToFile}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                Save Billing Details
              </Text>
            </Pressable>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#088F8F",
              marginTop: "auto",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                {cart.length} items | $ {total}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: "white",
                  marginVertical: 6,
                }}
              >
                Extra charges might apply
              </Text>
            </View>

            <Pressable onPress={placeOrder}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                Place Order
              </Text>
            </Pressable>
          </Pressable>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
