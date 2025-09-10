import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import * as Location from "expo-location";

type LocationDetails = {
  latitude: number;
  longitude: number;
  city?: string | null;
  country?: string | null;
};

type LocationContextType = {
  location: LocationDetails | null;
  setLocation: (location: LocationDetails | null) => void;
  refreshLocation: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationDetails | null>(null);

  const refreshLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      let city, country;
      try {
        const geocode = await Location.reverseGeocodeAsync(loc.coords);
        if (geocode.length > 0) {
          city = geocode[0].city;
          country = geocode[0].country;
        }
      } catch (err) {
        console.warn("Reverse geocoding failed:", err);
      }

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        city,
        country,
      });
    } catch (err) {
      console.error("Failed to fetch location:", err);
    }
  };

  // fetch once on mount
  useEffect(() => {
    refreshLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, refreshLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used inside LocationProvider");
  }
  return context;
};
