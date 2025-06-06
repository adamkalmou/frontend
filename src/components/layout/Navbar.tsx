import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Fish, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're already on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to home with the hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center space-x-2">
            <Fish className="h-8 w-8 text-sky-600" />
            <span className="font-bold text-xl">OceanPredict</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("models")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Models
            </button>
            <button
              onClick={() => scrollToSection("research")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Research
            </button>
            <Button asChild className="bg-sky-600 hover:bg-sky-700">
              <Link to="/predict">Test Model</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden py-4 px-4 bg-background border-b animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("about")}
              className="py-2 text-left text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("models")}
              className="py-2 text-left text-foreground hover:text-primary transition-colors"
            >
              Models
            </button>
            <button
              onClick={() => scrollToSection("research")}
              className="py-2 text-left text-foreground hover:text-primary transition-colors"
            >
              Research
            </button>
            <Button 
              asChild 
              className="bg-sky-600 hover:bg-sky-700 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to="/predict">Test Model</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
