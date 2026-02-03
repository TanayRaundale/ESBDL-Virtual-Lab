import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

import { router } from "expo-router";

export default function TeacherDashboard() {

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeacher();
  }, []);

  const loadTeacher = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setTeacher(JSON.parse(userData));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          router.replace("/(teacher)/logout");
        }
      }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Teacher Dashboard</Text>

      <Text style={styles.info}>
        Welcome: {teacher?.name || "Teacher"}
      </Text>

      <Text style={styles.info}>
        Role: {teacher?.role}
      </Text>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },

  info: {
    fontSize: 18,
    marginBottom: 10
  },

  logoutBtn: {
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 8,
    marginTop: 30
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});
