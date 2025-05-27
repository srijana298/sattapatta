import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search..."
            className="bg-muted/50 w-full pl-10 pr-4 py-2 text-sm rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button className="relative rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background"></span>
          </button>
          
          <button className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            <span>AD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;