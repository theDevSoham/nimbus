// services/newsService.ts
import { Article, NewsResponse } from "@/types/news";
import axios from "axios";

const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY; // Replace with your real key
const BASE_URL = "https://newsapi.org/v2";

export type WeatherType = "cold" | "hot" | "cool";

const keywordMap: Record<WeatherType, string[]> = {
  cold: ["depressing", "tragedy", "sad", "loss", "crisis"],
  hot: ["fear", "panic", "terror", "threat", "danger"],
  cool: ["win", "happy", "joy", "celebration", "success"],
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds
});

export async function fetchFilteredNews(
  country: string = "in",
  weather: WeatherType,
  filter: boolean = true
): Promise<Article[]> {
  try {
    const { data } = await axiosInstance.get<NewsResponse>("/top-headlines", {
      params: {
        apiKey: NEWS_API_KEY,
        country,
        pageSize: 50, // fetch more to allow filtering
      },
    });

    if (data.status !== "ok") {
      throw new Error("News API error");
    }

    if (!filter) {
      return data.articles;
    }

    const keywords = keywordMap[weather];

    // Filter articles based on weather keywords
    const filtered = data.articles.filter((article) =>
      keywords.some((kw) =>
        (article.title + " " + article.description)
          .toLowerCase()
          .includes(kw.toLowerCase())
      )
    );

    return filtered;
  } catch (err) {
    console.error("Error fetching news:", err);
    return [];
  }
}
