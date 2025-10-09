import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import colors from "@/constants/colors";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Chargement des fonts
  const [fontsLoaded, fontError] = useFonts({
    HappyMonkey: require("../assets/font/HappyMonkey-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Cache le splash screen quand les fonts sont chargées
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Attend que les fonts soient chargées
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backTheme,
          },
          headerTintColor: colors.boldColor,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Inscription",
          }}
        />
        <Stack.Screen name="login" options={{ title: "Connexion" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
