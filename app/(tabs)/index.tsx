import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { getCurrentWeather } from "@/services/weatherService";
import { fetchFilteredNews, WeatherType } from "@/services/newsService";
import { Article } from "@/types/news";
import { CurrentWeatherResponse } from "@/types/weather";
import { useLocation } from "@/context/LocationContext";

export default function WeatherAndNews() {
  const { location } = useLocation();
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadWeatherAndNews = async () => {
      if (!location) return;

      try {
        setLoading(true);

        const { latitude, longitude } = location;

        const currentWeather = await getCurrentWeather(
          latitude,
          longitude,
          "Celsius"
        );
        setWeather(currentWeather);

        const temp = currentWeather.main.temp;
        let type: WeatherType = "cool";
        if (temp <= 15) type = "cold";
        else if (temp >= 30) type = "hot";

        const news = await fetchFilteredNews("us", type);
        setArticles(news);
      } catch (err) {
        console.error("Error loading weather/news:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherAndNews();
  }, [location]);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text>No location available. Please enable location services.</Text>
      </View>
    );
  }

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* Weather Section */}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>
            {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>

          {/* Extra Weather Details */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Feels Like</Text>
              <Text style={styles.detailValue}>
                {Math.round(weather.main.feels_like)}°C
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Pressure</Text>
              <Text style={styles.detailValue}>
                {weather.main.pressure} hPa
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>
                {weather.wind.speed} m/s ({weather.wind.deg}°)
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Sunrise</Text>
              <Text style={styles.detailValue}>
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Sunset</Text>
              <Text style={styles.detailValue}>
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* News Section */}
      <View style={styles.newsContainer}>
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openModal(item)}
            >
              {item.urlToImage && (
                <Image
                  source={{ uri: item.urlToImage }}
                  style={styles.cardImg}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.cardDesc}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal for Full News */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}
          >
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {selectedArticle?.urlToImage && (
              <Image
                source={{ uri: selectedArticle.urlToImage }}
                style={styles.modalImg}
              />
            )}
            <Text style={styles.modalTitle}>{selectedArticle?.title}</Text>
            <Text style={styles.modalDesc}>{selectedArticle?.description}</Text>
            <Text style={styles.modalContent}>{selectedArticle?.content}</Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },

  weatherContainer: {
    flex: 0.55,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e6f0f3",
    borderBottomWidth: 1,
    borderColor: "#d0d7de",
  },
  city: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  temp: { fontSize: 46, fontWeight: "300", color: "#333" },
  desc: { fontSize: 16, color: "#555", marginBottom: 12 },

  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  detailCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  detailLabel: { fontSize: 13, color: "#666" },
  detailValue: { fontSize: 15, fontWeight: "600", color: "#333" },

  newsContainer: { flex: 0.45, padding: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImg: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  cardTitle: { fontWeight: "bold", marginBottom: 4 },
  cardDesc: { color: "#555", fontSize: 13 },

  modalContainer: { flex: 1, backgroundColor: "#fefefe" },
  closeBtn: { padding: 10, alignSelf: "flex-end" },
  modalImg: { width: "100%", height: 200, borderRadius: 8, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  modalDesc: { fontSize: 16, marginBottom: 10, color: "#444" },
  modalContent: { fontSize: 15, color: "#333" },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
