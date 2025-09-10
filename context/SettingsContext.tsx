import { unitsMap } from "@/services/weatherService";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Unit = keyof typeof unitsMap;
type NewsMode = "general" | "weatherBased";

interface Settings {
  unit: Unit;
  newsMode: NewsMode;
}

interface SettingsContextType {
  settings: Settings;
  setUnit: (unit: Unit) => void;
  setNewsMode: (mode: NewsMode) => void;
  toggleUnit: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({
    unit: "Celsius",
    newsMode: "weatherBased",
  });

  const setUnit = (unit: Unit) => {
    setSettings((prev) => ({ ...prev, unit }));
  };

  const setNewsMode = (mode: NewsMode) => {
    setSettings((prev) => ({ ...prev, newsMode: mode }));
  };

  const toggleUnit = () => {
    setSettings((prev) => ({
      ...prev,
      unit: prev.unit === "Celsius" ? "Farenheit" : "Celsius",
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setUnit,
        setNewsMode,
        toggleUnit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
