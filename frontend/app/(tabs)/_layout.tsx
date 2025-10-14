import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { EvilIcons, Feather, FontAwesome } from "@expo/vector-icons";
import colors from "@/constants/colors";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.boldColor,
        tabBarStyle: {
          backgroundColor: colors.backTheme,
          borderTopColor: colors.lightColor,
          borderTopWidth: 1.5
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recherche"
        options={{
          title: "Recherche",
          tabBarIcon: ({ color }) => (
            <Feather name="map" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="user" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
