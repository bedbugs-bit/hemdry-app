import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
    paddingVertical: 37,
  },
});
