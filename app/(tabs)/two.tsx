import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useSettings } from "@/context/SettingsContext";

interface SettingItem<T extends string> {
  key: string;
  title: string;
  options: T[];
  currentValue: string;
  onSelect: (value: T) => void;
}

const Settings = () => {
  const { settings, setUnit, setNewsMode } = useSettings();

  const settingsData: SettingItem<any>[] = [
    {
      key: "unit",
      title: "Temperature Unit",
      options: ["Celsius", "Fahrenheit"],
      currentValue: settings.unit,
      onSelect: setUnit,
    },
    {
      key: "newsMode",
      title: "News Mode",
      options: ["general", "weatherBased"],
      currentValue: settings.newsMode,
      onSelect: setNewsMode,
    },
  ];

  const renderItem = ({ item }: { item: SettingItem<any> }) => {
    return (
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        <View style={styles.optionButtons}>
          {item.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.button,
                item.currentValue === option && styles.buttonSelected,
              ]}
              onPress={() => item.onSelect(option)}
            >
              <Text
                style={[
                  styles.buttonText,
                  item.currentValue === option && styles.buttonTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionContainer: {
    marginBottom: 25,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  optionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    marginBottom: 10,
  },
  buttonSelected: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  buttonTextSelected: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
