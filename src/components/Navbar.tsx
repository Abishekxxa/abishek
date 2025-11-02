import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll to anchors when hash changes (e.g., navigating from /journal to /#about)
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 0);
      }
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleNav = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
  };
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-violet-600 shadow-elegant" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className={`text-lg sm:text-xl font-bold transition-colors ${
            isScrolled ? "text-white" : "bg-gradient-primary bg-clip-text text-transparent"
          }`}>
            Abishek S J
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => handleNav("about")}
              className={`transition-colors text-sm lg:text-base ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNav("experience")}
              className={`transition-colors text-sm lg:text-base ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Experience
            </button>
            <button 
              onClick={() => handleNav("projects")}
              className={`transition-colors text-sm lg:text-base ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Projects
            </button>
            <Link 
              to="/journal"
              className={`transition-colors text-sm lg:text-base ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Journal
            </Link>
            <button 
              onClick={() => handleNav("contact")}
              className={`transition-colors text-sm lg:text-base ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Contact
            </button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => handleNav("contact")}
              className="text-sm"
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
            }`}
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
              onClick={() => handleNav("about")}
              className={`block w-full text-left py-2 transition-colors ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNav("experience")}
              className={`block w-full text-left py-2 transition-colors ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Experience
            </button>
            <button 
              onClick={() => handleNav("projects")}
              className={`block w-full text-left py-2 transition-colors ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Projects
            </button>
            <Link 
              to="/journal"
              className={`block w-full text-left py-2 transition-colors ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Journal
            </Link>
            <button 
              onClick={() => handleNav("contact")}
              className={`block w-full text-left py-2 transition-colors ${
                isScrolled ? "text-white hover:text-violet-200" : "text-foreground hover:text-primary"
              }`}
            >
              Contact
            </button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => handleNav("contact")}
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
