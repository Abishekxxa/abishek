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
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Abishek S J
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <Link
              to="/journal"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors"
            >
              Journal
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button
              variant="hero"
              size="sm"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>

          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in-up">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Projects
            </button>
            <Link
              to="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Journal
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Contact
            </button>
            <Button
              variant="hero"
              className="w-full"
              onClick={() => scrollToSection("contact")}
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