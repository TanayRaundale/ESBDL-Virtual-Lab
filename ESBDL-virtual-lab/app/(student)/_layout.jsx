<<<<<<< HEAD
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

export default function StudentLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#2563eb" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },

        drawerActiveBackgroundColor: "#e0e7ff",
        drawerActiveTintColor: "#2563eb",
        drawerInactiveTintColor: "#334155",

        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
          fontWeight: "600",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="assignments"
        options={{
          title: "Assignments",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="notes"
        options={{
          title: "Notes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="quizzes"
        options={{
          title: "Quizzes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="diagrams"
        options={{
          title: "Diagram Practice",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="brush-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Logout */}
      <Drawer.Screen
        name="logout"
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          focus: () => router.replace("/login"),
        }}
      />
    </Drawer>
  );
}

/* ================= CUSTOM DRAWER ================= */

function CustomDrawer(props) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);

  const loadProfileImage = async () => {
    const img = await AsyncStorage.getItem("profileImage");
    setProfileImage(img || null);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadProfileImage();
    });

    return unsubscribe;
  }, [props.navigation]);

  const goToProfile = () => {
    props.navigation.closeDrawer();
    router.push("/(student)/profile");
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={goToProfile}
        style={styles.drawerHeader}
      >
        {profileImage ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
            style={styles.profileImage}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={80} color="#fff" />
        )}

        <Text style={styles.drawerTitle}>Student</Text>
        <Text style={styles.drawerSubtitle}>Tap to view profile</Text>
      </TouchableOpacity>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  drawerHeader: {
    height: 180,
    backgroundColor: "#2563eb",
    padding: 20,
    justifyContent: "flex-end",
  },

  drawerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  drawerSubtitle: {
    color: "#c7d2fe",
    fontSize: 14,
    marginTop: 4,
  },
});
=======
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

export default function StudentLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#2563eb" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },

        drawerActiveBackgroundColor: "#e0e7ff",
        drawerActiveTintColor: "#2563eb",
        drawerInactiveTintColor: "#334155",

        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
          fontWeight: "600",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="assignments"
        options={{
          title: "Assignments",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="notes"
        options={{
          title: "Notes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="quizzes"
        options={{
          title: "Quizzes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="diagrams"
        options={{
          title: "Diagram Practice",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="brush-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Logout */}
      <Drawer.Screen
        name="logout"
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          focus: () => router.replace("/login"),
        }}
      />
    </Drawer>
  );
}

/* ================= CUSTOM DRAWER ================= */

function CustomDrawer(props) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);

  const loadProfileImage = async () => {
    const img = await AsyncStorage.getItem("profileImage");
    setProfileImage(img || null);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadProfileImage();
    });

    return unsubscribe;
  }, [props.navigation]);

  const goToProfile = () => {
    props.navigation.closeDrawer();
    router.push("/(student)/profile");
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={goToProfile}
        style={styles.drawerHeader}
      >
        {profileImage ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
            style={styles.profileImage}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={80} color="#fff" />
        )}

        <Text style={styles.drawerTitle}>Student</Text>
        <Text style={styles.drawerSubtitle}>Tap to view profile</Text>
      </TouchableOpacity>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  drawerHeader: {
    height: 180,
    backgroundColor: "#2563eb",
    padding: 20,
    justifyContent: "flex-end",
  },

  drawerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  drawerSubtitle: {
    color: "#c7d2fe",
    fontSize: 14,
    marginTop: 4,
  },
});
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
