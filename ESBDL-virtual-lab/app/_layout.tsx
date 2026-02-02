import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";


export default function Layout() {
  SplashScreen.preventAutoHideAsync();
  return (
    <Stack 
    screenOptions={{ headerShown: false }}/>    

  );
}
