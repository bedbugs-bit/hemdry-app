import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { PricingCard, lightColors } from "@rneui/themed";
import { db } from "../firebase";
import { useState } from "react";
import { FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { signInWithCredential, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AntDesign } from '@expo/vector-icons';

export default function AdminDashboard() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch user orders from Firestore
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "userOrders");
        const querySnapshot = await getDocs(ordersRef);

        const ordersData = [];
        querySnapshot.forEach((doc) => {
          // Process and structure data as needed
          ordersData.push({ id: doc.id, ...doc.data() });
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            marginLeft: 10,
            marginBottom:10,
          }}
        >
          Hemdry
        </Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>Admin Dashboard</Text>
          <AntDesign name="shoppingcart" size={30} color="black" paddingLeft={120} />

        </View>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.orderTitle}>Order ID:</Text>
              <Text style={styles.orderValue}>{item.id}</Text>
              <Text style={styles.orderTitle}>Customer Email:</Text>
              <Text style={styles.orderValue}>{item.customerEmail}</Text>
              {/* Display other order details as needed */}
            </View>
          )}
        />
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
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "400", color: "white" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#088F8F",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",

  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  orderTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  orderValue: {
    color: "#555",
  },
});
