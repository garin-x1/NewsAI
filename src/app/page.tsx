'use client';

import { useState, useEffect } from 'react';
import { NewsCard } from '@/components/NewsCard';
import { SearchBar } from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { ModeToggle } from '@/components/ModeToggle';
import { NewsArticle } from '@/types/news';
import { fetchAllNews } from '@/lib/newsAPI';
import { Newspaper, BrainCog } from 'lucide-react';

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadNews = async (query?: string) => {
    setLoading(true);
    try {
      const news = await fetchAllNews(query);
      setArticles(news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadNews(query || undefined);
  };

  return (
    <div className="flex-1 bg-background">

      {/* Header */}
      <header className="border-b bg-transparent backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <BrainCog className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">NewsAI</h1>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Newspaper className="h-4 w-4" />
                {articles.length} articles
              </div>
              <div>
                <ModeToggle/>
              </div>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </header>

      {/* News Feed */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No articles found</h2>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms' : 'Unable to fetch news at this time'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}