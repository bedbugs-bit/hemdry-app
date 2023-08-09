import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";

export default function PickUpScreen({ route }) {
  const { location } = route.params;
  const [selectedDate, setSelectedDate] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [value, setInputText] = useState("Enter your details here");
  const handleTextChange = (text) => {
    setInputText(text);
  };
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 ",
    },
    {
      id: "1",
      time: "12:00 ",
    },
    {
      id: "2",
      time: "13:00 ",
    },
    {
      id: "2",
      time: "14:00 ",
    },
    {
      id: "4",
      time: "15:00 ",
    },
    {
      id: "5",
      time: "16:00 ",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert("Empty or Invalid", "Please fill all the details correctly", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.navigate("Cart", {
        pickUpDate: format(selectedDate, "dd/MM/yyyy"),
        selectedTime: selectedTime,
        noOfDays: delivery,
        addressAndInstructions: value.toString(),
        location: location,
      });
    }
  };

  return (
    <>
      <Pressable>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            marginHorizontal: 10,
            paddingTop: 30,
            paddingBottom: 10,
          }}
        >
          Laundry Instructions
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={6}
          maxLength={60}
          onChangeText={(text) => handleTextChange(text)}
          value={value}
          style={{
            padding: 20,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 70,
            borderRadius: 9,
            margin: 10,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginHorizontal: 10,
            color: "#088F8F",
          }}
        >
          Pick Up Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-08-01")}
          endDate={new Date("2023-12-28")}
          initialSelectedDate={new Date("2020-08-22")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginHorizontal: 10,
            color: "#088F8F",
          }}
        >
          Select Time
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginHorizontal: 10,
            color: "#088F8F",
          }}
        >
          Delivery Date
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={i}
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Pressable>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
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
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>

          <Pressable onPress={proceedToCart} style={{ padding: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
