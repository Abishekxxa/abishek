import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/95 backdrop-blur-md shadow-card" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Abishek S J
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("experience")}
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              Projects
            </button>
            <Link 
              to="/journal"
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              Journal
            </Link>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              Contact
            </button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => scrollToSection("contact")}
              className="text-sm"
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <button 
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("experience")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <Link 
              to="/journal"
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Journal
            </Link>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => scrollToSection("contact")}
              className="w-full"
            >
              Get In Touch
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
