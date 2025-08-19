import axios from "axios";
import { NewsArticle } from "@/types/news";

const gnewsClient = axios.create({
  baseURL: "https://gnews.io/api/v4",
});
const newsdataClient = axios.create({
  baseURL: "https://newsdata.io/api/1",
});
const guardianClient = axios.create({
  baseURL: "https://content.guardianapis.com",
});
const nytClient = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2",
});
const wordlNewsClient = axios.create({
  baseURL: "https://api.worldnewsapi.com",
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const fetchGNewsAPI = async (query: string = "artificial intelligence"): Promise<NewsArticle[]> => {
  try {
    const response = await gnewsClient.get("/search", {
      params: {
        apikey: process.env.NEXT_PUBLIC_GNEWS_API_KEY,
        q: query,
        lang: "en",
        max: 10,
        sortBy: 'publishedAt',
      },
    });

    return response.data.articles.map((article: any) => ({
      id: `gnews-${article.publishedAt}-${article.title.slice(0, 10)}`,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
      imageUrl: article.image,
    }));
  } catch (error) {
    console.error("Failed to fetch news from GNews API:", error);
    return [];
  }
};

const fetchNewsDataAPI = async (query: string = "artificial intelligence"): Promise<NewsArticle[]> => {
  try {
    const response = await newsdataClient.get("/latest", {
      params: {
        apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY,
        qInMeta: query,
        language: "en",
        size: 10,
      },
    });

    return response.data.results.map((article: any) => ({
      id: `newsdata-${article.pubDate}-${article.title.slice(0, 10)}`,
      title: article.title,
      description: article.description,
      url: article.link,
      publishedAt: article.pubDate,
      source: article.source_id,
      imageUrl: article.image_url,
    }));
  } catch (error) {
    console.error("Failed to fetch news from NewsData API:", error);
    return [];
  }
};

const fetchWorldNewsAPI = async (query: string = "artificial intelligence"): Promise<NewsArticle[]> => {
  try {
    const response = await wordlNewsClient.get("/search-news", {
      params: {
        'api-key': process.env.NEXT_PUBLIC_WORLD_NEWS_API_KEY,
        text: query,
        language: 'en',
      }
    });
    return response.data.news.map((article: any) => ({
      id: `worldnews-${article.publish_date}-${article.title.slice(0, 10)}`,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publish_date,
      source: article.author,
      imageUrl: article.image,
    }));
  } catch (error) {
    console.error("Failed to fetch news from World News API:", error);
    return [];
  }
};

const fetchGuardianAPI = async (query: string = "artificial intelligence"): Promise<NewsArticle[]> => {
  try {
    const response = await guardianClient.get("/search", {
      params: {
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
        q: query,
        lang: 'en',
        'order-by': 'newest',
        'show-fields': 'all',
        'page-size': 10,
      },
    });

    return response.data.response.results.map((article: any) => ({
      id: `guardian-${article.id}`,
      title: article.webTitle,
      description: article.fields.trailText,
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      source: article.sectionName,
      imageUrl: article.fields.thumbnail || '',
    }));
  } catch (error) {
    console.error("Failed to fetch news from Guardian API:", error);
    return [];
  } 
};

const fetchNYTimesAPI = async (query: string = "artificial intelligence"): Promise<NewsArticle[]> => {
  try {
    const response = await nytClient.get("/articlesearch.json", {
      params: {
        'api-key': process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
        q: query,
      },
    });

    return response.data.response.docs.map((article: any) => ({
      id: `nyt-${article.pub_date}-${article.headline.main.slice(0, 10)}`,
      title: article.headline.main,
      description: article.lead_paragraph,
      url: article.web_url,
      publishedAt: article.pub_date,
      source: 'The New York Times',
      imageUrl: article.multimedia.length > 0 ? `https://www.nytimes.com/${article.multimedia.default.url}` : '',
    }));
  } catch (error) {
    console.error("Failed to fetch news from NY Times API:", error);
    return [];
  }
};

export const fetchAllNews = async (query?: string): Promise<NewsArticle[]> => {
  const searchQuery = query || 'artificial intelligence';

  const apiCalls = [
    fetchGNewsAPI(searchQuery),
    fetchNewsDataAPI(searchQuery),
    fetchWorldNewsAPI(searchQuery),
    fetchGuardianAPI(searchQuery),
    fetchNYTimesAPI(searchQuery),
  ];

  const results = await Promise.allSettled(apiCalls);
  
  const allArticles: NewsArticle[] = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allArticles.push(...result.value);
    } else {
      console.warn(`API ${index + 1} failed:`, result.reason);
    }
  });

  const uniqueArticles = allArticles
    .filter((article, index, self) => 
      index === self.findIndex(a => 
        a.title.toLowerCase().trim() === article.title.toLowerCase().trim() ||
        a.url === article.url
      )
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return uniqueArticles.map((article, index) => ({
    ...article,
    id: `${article.id}-${index}`
  }));
};