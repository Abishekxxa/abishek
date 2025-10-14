import { Button } from "./ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <a 
              href="https://www.linkedin.com/in/abishek-s-j-241078254/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:text-accent transition-colors"
            >
              Abishek S J
            </a>
            <span className="block text-accent text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2">
              Fintech Entrepreneur & Algorithmic Trading Expert
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90 px-4">
            Founder of <span className="text-accent font-semibold">Reverie Synaptic Pulse (RSP)</span> • 
            Delivering <span className="text-success font-semibold">89% win rates</span> with proprietary trading algorithms • 
            <span className="text-accent font-semibold">21% portfolio returns</span> in 5 days
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection("experience")}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
            >
              View My Work
            </Button>
            <Button 
              variant="elegant" 
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
            >
              Contact Me
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">89%</div>
              <div className="text-sm sm:text-base text-white/80">Algorithm Win Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-success mb-2">21%</div>
              <div className="text-sm sm:text-base text-white/80">5-Day Returns</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">10+</div>
              <div className="text-sm sm:text-base text-white/80">Client Portfolios</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
