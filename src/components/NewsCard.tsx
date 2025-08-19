import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NewsArticle } from '@/types/news';
import { ExternalLink, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="h-full pt-0 pb-6 top-0 hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        {article.imageUrl && !imageError ? (
          <Image 
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
              onError={handleImageError}
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <Image
                src="/placeholder.svg"
                alt="Placeholder"
                className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {article.source}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(article.publishedAt)}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 mb-4">
          {article.description}
        </CardDescription>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Read More <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}