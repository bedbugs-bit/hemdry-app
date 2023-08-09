import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import LaundryScreen from "./screens/LaundryScreen";
import PickUpScreen from "./screens/PickUpScreen";
import CartScreen from "./screens/CartScreen";
import UserScreen from "./screens/UserScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import AdminDashboard from "./screens/AdminDashboard";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickUp"
          component={PickUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Laundry-Screen"
          component={LaundryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderSuccessScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Admin"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
