import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";

export default function StudentLayout() {
  const router = useRouter();

  return (
   <Drawer
  screenOptions={{
  
    headerStyle: { backgroundColor: "#2563eb" },
    headerTintColor: "#fff",
    drawerActiveTintColor: "#2563eb",
  }}
>

      <Drawer.Screen name="home" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="notes" options={{ title: "Notes" }} />
      <Drawer.Screen name="quizzes" options={{ title: "Quizzes" }} />
      <Drawer.Screen name="results" options={{ title: "Results" }} />

      {/* LOGOUT AS SCREEN */}
      <Drawer.Screen
        name="logout"
        options={{ title: "🚪 Logout" }}
        listeners={{
          focus: () => {
            router.replace("/login");
          },
        }}
      />
    </Drawer>
  );
}
