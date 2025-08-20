'use client';

import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm md:text-base font-medium">Built by <span className="font-semibold">Garin Janu Nugraha</span></p>
            <p className="text-xs text-muted-foreground">© {currentYear} All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/garin-x1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Link>
            
            <Link 
              href="https://github.com/garin-x1/NewsAI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Source Code"
            >
              Source Code
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}