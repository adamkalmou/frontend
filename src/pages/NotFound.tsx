
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-bold text-primary animate-slide-up">404</h1>
        <h2 className="text-2xl font-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Page not found
        </h2>
        <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            asChild 
            className="animated-gradient-button"
          >
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
