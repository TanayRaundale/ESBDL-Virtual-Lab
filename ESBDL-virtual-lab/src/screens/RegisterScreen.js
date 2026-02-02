import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from "react-native";
import { Link } from "expo-router";
import API from "../services/api.js"
import { useRouter } from "expo-router";

export default function RegisterScreen() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if ( !email || !password) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      const res = await API.post('/register',{
        email,
        password
      });

     Alert.alert("Success", "Registered  Successfully", [
             {
               text: "OK",
               onPress: () => router.replace("/login"),
             },
           ]);
          
      
    } catch (error) {
      Alert.alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Register</Text>

     

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    marginBottom: 30,
    color: "#000",
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#000",
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
