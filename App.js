import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import StackNavigator from "./StackNavigator";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
    paddingVertical: 37,
    marginTop: 20,
    
  },
});
