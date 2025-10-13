import { Card } from "./ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Computer Science student turned fintech entrepreneur, combining technical expertise 
            with financial innovation to democratize algorithmic trading.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Education & Foundation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing <strong>B.E. Computer Science & Engineering</strong> at Panimalar Engineering College, Chennai 
                (Expected 2026). My academic journey in Software Engineering, Data Science, and UI/UX design 
                provides the technical foundation for my fintech innovations.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">Entrepreneurial Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                As <strong>Founder & CEO of Reverie Synaptic Pulse (RSP)</strong>, I'm building the future of 
                algorithmic trading and portfolio management. Our mission is to democratize access to 
                institutional-grade financial strategies through innovative technology.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Technical Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Specialized in <strong>SMC/ICT-based trading algorithms</strong>, I develop proprietary systems 
                for MT4/MT5 and TradingView platforms. My expertise spans from VibeCoding methodologies 
                for addictive UI/UX to advanced financial modeling and risk management systems.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
              <h4 className="text-xl font-bold mb-3 text-primary">Core Values</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Innovation through technology
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Data-driven decision making
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Client-first approach
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Continuous learning & growth
                </li>
              </ul>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
              <h4 className="text-xl font-bold mb-3 text-secondary">Future Goals</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Scale RSP globally
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Publish Scopus-indexed research
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Democratize wealth strategies
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                  Lead fintech innovation
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;