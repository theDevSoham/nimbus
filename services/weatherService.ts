import { CurrentWeatherResponse, ForecastResponse } from "@/types/weather";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const OPENWEATHER_API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
// const OPENWEATHER_API_KEY = "bf8e9df927c53e548be9d17bb2bdb668";

if (!OPENWEATHER_API_KEY) {
  throw new Error("OPENWEATHER_API_KEY is required in .env file");
}

export const unitsMap = {
  Celsius: "metric",
  Farenheit: "imperial",
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds
});

// Function to fetch current weather
export const getCurrentWeather = async (
  lat: number,
  lon: number,
  unit: keyof typeof unitsMap
) => {
  try {
    const response = await axiosInstance.get<CurrentWeatherResponse>(
      "/weather",
      {
        params: {
          lat: lat.toString(),
          lon: lon.toString(),
          appid: OPENWEATHER_API_KEY,
          units: unitsMap[unit], // Use metric units for Celsius
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching current weather:", error?.message);
    throw error;
  }
};

// Function to fetch future weather forecast
export const getWeatherForecast = async (
  lat: number,
  lon: number,
  unit: keyof typeof unitsMap
) => {
  try {
    const response = await axiosInstance.get<ForecastResponse>("/forecast", {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        appid: OPENWEATHER_API_KEY,
        units: unitsMap[unit],
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching weather forecast:", error?.message);
    throw error;
  }
};
