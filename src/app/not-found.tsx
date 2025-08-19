'use client';

import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft, BrainCog } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-transparent backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <BrainCog className="h-8 w-8 text-primary"/>
                {/* <FileQuestion className="h-8 w-8 text-primary" /> */}
                <h1 className="text-2xl font-bold">NewsAI</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <FileQuestion className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.

          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}