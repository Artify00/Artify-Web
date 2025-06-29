import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Palette className="text-accent-500 h-8 w-8 mr-3" />
              <span className="text-2xl font-bold text-primary-900">Artify</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary-900' : 'text-gray-500 hover:text-accent-500'
              }`}>
                Home
              </Link>
              <a href="#features" className="text-gray-500 hover:text-accent-500 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-500 hover:text-accent-500 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-500 hover:text-accent-500">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                Get Started
              </Button>
            </Link>
            <button
              className="md:hidden text-gray-500 hover:text-accent-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent-500">
              Home
            </Link>
            <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent-500">
              Features
            </a>
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-accent-500">
              About
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
