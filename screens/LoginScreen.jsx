import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  //   const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //   useEffect(() => {
  //     setLoading(true);
  //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //       if(!authUser){
  //         setLoading(false);
  //       }
  //       if(authUser){
  //         navigation.replace("Home");
  //       }
  //     });

  //     return unsubscribe;
  //   },[])

  //   const login = () => {
  //     signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
  //       console.log("user credential",userCredential);
  //       const user = userCredential.user;
  //       console.log("user details",user)
  //     })
  //   }

  return (
    <SafeAreaView style={styles.container}>
      {/* {loading ? (
        <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
          <Text style={{marginRight:10}}>Loading</Text>
          <ActivityIndicator size="large" color={"red"}/>
        </View>
      ) : ( */}
      <KeyboardAvoidingView>
        <View>
          <Text style={styles.pageHeading}>Hemdry</Text>
        </View>
        <View
          style={styles.containerHeading}
        >
          <Text style={{ fontSize: 20, color: "#05668d", fontWeight: "bold" }}>
            Welcome, Sign In
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Sign In to your account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-variant"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={styles.containerInput}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={styles.containerInput}
            />
          </View>

          <Pressable
            //   onPress={login}
            style={styles.loginButton}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.signUpButtonText}>
              Don't have a account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      {/* )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageHeading: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 13,
  },

  containerHeading: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  containerInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    marginVertical: 10,
  },

  loginButton: {
    width: 200,
    backgroundColor: "#00a896",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  signUpButtonText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
});
