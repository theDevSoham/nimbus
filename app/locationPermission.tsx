// screens/LocationPermissionScreen.tsx
import React, { useCallback } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useLocation } from "@/context/LocationContext";

export default function LocationPermissionScreen() {
  const router = useRouter();
  const { refreshLocation } = useLocation();

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // You could also fetch location here if needed
        console.log("Granted");
        await refreshLocation();
        router.replace("/(tabs)"); // Replace with your home route
      } else {
        Alert.alert(
          "Location Required",
          "We need your location to provide accurate weather updates. Please enable it in Settings.",
          [
            {
              text: "Open Settings",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong while requesting location.");
    }
  }, [router, refreshLocation]);

  return (
    <View style={styles.container}>
      <Ionicons name="location-outline" size={96} color="#007AFF" />
      <Text style={styles.title}>Enable Location</Text>
      <Text style={styles.subtitle}>
        We need access to your location to show you local weather and news.
      </Text>

      <Pressable style={styles.button} onPress={requestLocationPermission}>
        <Text style={styles.buttonText}>Allow Location</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#555",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
