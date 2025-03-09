import { Link, useLocation } from "react-router-dom";
import { Fish, Anchor, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
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
    <footer className="bg-sky-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Fish className="h-6 w-6" />
              <span className="font-bold text-xl">OceanPredict</span>
            </div>
            <p className="text-sky-100">
              Advanced species distribution prediction using machine learning models
              to help researchers and conservationists understand marine ecosystems.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Anchor className="h-5 w-5 mr-2" />
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sky-200 hover:text-white transition-colors">
                Home
              </Link>
              <button 
                onClick={() => scrollToSection("about")} 
                className="text-left text-sky-200 hover:text-white transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("models")} 
                className="text-left text-sky-200 hover:text-white transition-colors"
              >
                Models
              </button>
              <button 
                onClick={() => scrollToSection("research")} 
                className="text-left text-sky-200 hover:text-white transition-colors"
              >
                Research
              </button>
              <Link to="/predict" className="text-sky-200 hover:text-white transition-colors">
                Test Model
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@oceanpredict.org"
                className="flex items-center text-sky-200 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                contact@oceanpredict.org
              </a>
              <a
                href="https://github.com/adamkalmou/frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sky-200 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                Github
              </a>
              <a
                href="https://twitter.com/oceanpredict"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sky-200 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5 mr-2" />
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-10 pt-6 text-center text-sky-300 text-sm">
          <p>© {currentYear} OceanPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
