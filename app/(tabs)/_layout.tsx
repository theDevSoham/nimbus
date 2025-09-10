import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useLocation } from "@/context/LocationContext"; // ✅ context hook

// Reusable TabBarIcon component
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { location } = useLocation(); // ✅ get location + loading state

  // If no location (meaning permission denied or not set), redirect
  if (!location) {
    return <Redirect href="/locationPermission" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true), // Fix hydration issue
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Weather",
          tabBarIcon: ({ color }) => <TabBarIcon name="sun-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="wrench" color={color} />,
        }}
      />
    </Tabs>
  );
}
