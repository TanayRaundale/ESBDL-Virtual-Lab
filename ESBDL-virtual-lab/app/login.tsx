import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";
import { Link } from "expo-router";
import API from "../src/services/api";
import { useRouter } from "expo-router";


export default function Login() {

const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {
      if (!email || !password) {
        Alert.alert("Please enter email and password");
        return;
      }

      const res = await API.post("/login", {
        email,
        password
      })
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert("Success", "Login Successfully", [
        {
          text: "OK",
          onPress: () => router.replace("/home"),
        },
      ]);



     
    } catch (error) {
      Alert.alert(error.response?.data?.msg || "Login failed");
    }




  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Lab Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Link href="/register" style={{ marginTop: 15 }}>
        <Text style={{ color: "#2563eb" }}>
          Don't have an account? Register
        </Text>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563eb",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
