<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/(teacher)/logout")
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back 👋</Text>
        <Text style={styles.name}>{teacher?.name || "Teacher"}</Text>
        <Text style={styles.role}>{teacher?.role}</Text>
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.grid}>
        <DashboardCard
          title="Add Notes"
          icon="document-text-outline"
          onPress={() => router.push("/(teacher)/add-notes")}
        />
        <DashboardCard
          title="Add Assignment"
          icon="clipboard-outline"
          onPress={() => router.push("/(teacher)/add-assignment")}
        />
        <DashboardCard
          title="Activate Quiz"
          icon="flash-outline"
          onPress={() => router.push("/(teacher)/activate-quiz")}
        />
        <DashboardCard
          title="Students"
          icon="people-outline"
          onPress={() => router.push("/(teacher)/students")}
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= CARD ================= */

function DashboardCard({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={30} color="#2563eb" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    backgroundColor: "#2563eb",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24
  },

  welcome: {
    color: "#c7d2fe",
    fontSize: 14
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6
  },

  role: {
    color: "#e0e7ff",
    marginTop: 2,
    fontSize: 14
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0f172a"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 16,
    elevation: 4
  },

  cardText: {
    marginTop: 10,
    fontWeight: "700",
    color: "#1e293b"
  },

  logoutBtn: {
    backgroundColor: "#dc2626",
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  }
});
=======
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/(teacher)/logout")
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back 👋</Text>
        <Text style={styles.name}>{teacher?.name || "Teacher"}</Text>
        <Text style={styles.role}>{teacher?.role}</Text>
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.grid}>
        <DashboardCard
          title="Add Notes"
          icon="document-text-outline"
          onPress={() => router.push("/(teacher)/add-notes")}
        />
        <DashboardCard
          title="Add Assignment"
          icon="clipboard-outline"
          onPress={() => router.push("/(teacher)/add-assignment")}
        />
        <DashboardCard
          title="Activate Quiz"
          icon="flash-outline"
          onPress={() => router.push("/(teacher)/activate-quiz")}
        />
        <DashboardCard
          title="Students"
          icon="people-outline"
          onPress={() => router.push("/(teacher)/students")}
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= CARD ================= */

function DashboardCard({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={30} color="#2563eb" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    backgroundColor: "#2563eb",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24
  },

  welcome: {
    color: "#c7d2fe",
    fontSize: 14
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6
  },

  role: {
    color: "#e0e7ff",
    marginTop: 2,
    fontSize: 14
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0f172a"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 16,
    elevation: 4
  },

  cardText: {
    marginTop: 10,
    fontWeight: "700",
    color: "#1e293b"
  },

  logoutBtn: {
    backgroundColor: "#dc2626",
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  }
});
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
