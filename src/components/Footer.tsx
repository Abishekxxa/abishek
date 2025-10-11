const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <a 
              href="https://www.linkedin.com/in/abishek-s-j-241078254/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                Abishek S J
              </h3>
            </a>
            <p className="text-primary-foreground/80 leading-relaxed">
              Fintech entrepreneur and algorithmic trading expert, building the future of 
              wealth management through innovative technology and proven strategies.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#experience" className="hover:text-accent transition-colors">Experience</a></li>
              <li><a href="#projects" className="hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Algorithmic Trading</li>
              <li>Portfolio Management</li>
              <li>Fintech Consulting</li>
              <li>Trading Mentorship</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 Abishek S J | Reverie Synaptic Pulse. Building the future of fintech.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;