import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { Link, useRouter } from "expo-router";
import API from "../src/services/api.js";

export default function Register() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");


  const handleRegister = async () => {

    if (!email || !password || !role) {
      Alert.alert("All fields are required");
      return;
    }

    try {

      await API.post("/register", {
        name,
        email,
        password,
        role   // 👈 SEND ROLE
      });

      Alert.alert("Success", "Registered Successfully", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);

    } catch (error) {

      console.log("Register Error:", error);

      Alert.alert(
        "Registration Failed",
        error.response?.data?.msg || "Registration failed"
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Register</Text>

      {/* ROLE SELECT */}
      <View style={styles.roleContainer}>

        <TouchableOpacity
          style={[
            styles.roleBtn,
            role === "student" && styles.activeRole
          ]}
          onPress={() => setRole("student")}
        >
          <Text style={styles.roleText}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleBtn,
            role === "teacher" && styles.activeRole
          ]}
          onPress={() => setRole("teacher")}
        >
          <Text style={styles.roleText}>Teacher</Text>
        </TouchableOpacity>

      </View>
<TextInput
  placeholder="Name"
  style={styles.input}
  value={name}
  onChangeText={setName}
/>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link href="/login" style={{ marginTop: 15 }}>
        <Text style={{ color: "#2563eb" }}>
          Already have an account? Login
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
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },

  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  roleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    marginHorizontal: 8,
  },

  activeRole: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  roleText: {
    color: "#000",
    fontWeight: "600",
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
    backgroundColor: "#16a34a",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

});
