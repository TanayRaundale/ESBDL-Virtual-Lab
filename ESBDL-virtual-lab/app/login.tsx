import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";

import { router, Link } from "expo-router";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../src/services/api";   // your base url

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {

      if (!email || !password) {
        Alert.alert("Error", "Enter email and password");
        return;
      }

      setLoading(true);

      const res = await API.post("/login", {
  email,
  password
});


      const data = res.data;

      // ✅ STORE TOKEN & ROLE
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("role", data.user.role);

      // OPTIONAL: store user
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      Alert.alert("Success", "Login Successful");

      // ✅ ROLE BASED ROUTING
      if (data.user.role === "teacher") {
        router.replace("/(teacher)/dashboard");
      } else {
        router.replace("/(student)/home");
      }

    } catch (error) {

      console.log("Login Error:", error);

      const message =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Invalid email or password";

      Alert.alert("Login Failed", message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>College App Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <Link href="/register" style={styles.registerLink}>
  <Text style={styles.registerText}>
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
    padding: 24,
    backgroundColor: "#f8fafc"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#0f172a"
  },
registerLink: {
  marginTop: 20,
},

registerText: {
  color: "#2563eb",
  textAlign: "center",
  fontWeight: "bold"
}
,
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff"
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  }

});
