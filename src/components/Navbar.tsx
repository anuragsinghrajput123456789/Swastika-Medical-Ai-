import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Menu,
  Home,
  MessageCircle,
  ClipboardList,
  Activity,
} from "lucide-react";

// Inline SVG for Logo
const HeartLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 text-red-500"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    {
      name: "Chat",
      href: "/chat",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      name: "Symptoms",
      href: "/symptoms",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      name: "Health Metrics",
      href: "/health-metrics",
      icon: <Activity className="h-5 w-5" />,
    },
    
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-lg transition-all duration-300">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 md:flex">
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transform transition-transform duration-200"
          >
            <HeartLogo />
            <span>Swastha</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:space-x-4">
          <nav className="flex ml-7 items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="group flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-primary hover:scale-105"
              >
                <span className="text-primary group-hover:scale-110 transform transition-transform duration-200">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex flex-1 items-center justify-end space-x-3 md:hidden">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-primary/30 bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="pr-0 w-[300px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white animate-slide-in-from-left"
            >
              <nav className="grid gap-6 pt-10 text-lg font-medium px-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:translate-x-1"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-white">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
