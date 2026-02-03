import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function TeacherLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0f172a",
        },
        headerTintColor: "#ffffff",

        // Drawer container
        drawerStyle: {
          backgroundColor: "#020617",
          width: 280,
        },

        // Drawer inner area
        drawerContentStyle: {
          paddingTop: 40,
        },

        // Screen background
        sceneContainerStyle: {
          backgroundColor: "#f8fafc",
        },

        drawerActiveBackgroundColor: "#1e293b",
        drawerActiveTintColor: "#38bdf8",
        drawerInactiveTintColor: "#cbd5f5",

        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -8,
        },

        drawerItemStyle: {
          borderRadius: 10,
          marginHorizontal: 12,
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="students"
        options={{
          title: "Students",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="add-assignment"
        options={{
          title: "Add Assignment",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="add-notes"
        options={{
          title: "Upload Notes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="activate-quiz"
        options={{
          title: "Activate Quiz",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
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

      <Drawer.Screen
        name="logout"
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
