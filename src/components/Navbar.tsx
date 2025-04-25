
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Bell, LogIn } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // Will be replaced with actual auth logic later

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">MediChat</span>
        </Link>
        
        <div className="flex-1" />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/chat" className="hover:text-primary transition-colors">
            Chat
          </Link>
          <Link to="/symptoms" className="hover:text-primary transition-colors">
            Symptoms
          </Link>
          <Link to="/health-metrics" className="hover:text-primary transition-colors">
            Health Metrics
          </Link>
          <div className="ml-4 flex items-center gap-2">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="default">Dashboard</Button>
              </>
            ) : (
              <Button variant="default">
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-2 py-1 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/chat" 
              className="px-2 py-1 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <Link 
              to="/symptoms" 
              className="px-2 py-1 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Symptoms
            </Link>
            <Link 
              to="/health-metrics" 
              className="px-2 py-1 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Health Metrics
            </Link>
            <div className="pt-2">
              {isLoggedIn ? (
                <Button variant="default" className="w-full">
                  Dashboard
                </Button>
              ) : (
                <Button variant="default" className="w-full">
                  <LogIn className="mr-2 h-5 w-5" /> Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
