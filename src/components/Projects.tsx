import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "Advanced Algo Trading Systems",
      description: "Proprietary MT4/MT5 Expert Advisors with institutional-grade precision targeting Forex & XAUUSD markets.",
      features: [
        "Order-block detection algorithms",
        "ATR-based risk management",
        "RSI divergence filters",
        "SAR-MA overlays",
        "89% win rate achievement"
      ],
      technologies: ["MQL4/5", "Pine Script", "TradingView", "Risk Management"],
      metrics: { winRate: "89%", returns: "21%" },
      status: "Production"
    },
    {
      title: "Fintech Dashboard Suite",
      description: "Interactive React/Next.js PWAs with gamified user experiences for financial planning and portfolio management.",
      features: [
        "FIRE planners with automated projections",
        "Debt management with visual analytics",
        "Gamified XP systems",
        "Mobile-first responsive design",
        "Dark/light mode support"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PWA"],
      metrics: { clients: "10+", satisfaction: "95%" },
      status: "Active"
    },
    {
      title: "RSP Portfolio Management Platform",
      description: "Comprehensive wealth management system with tiered service packages and automated client onboarding.",
      features: [
        "PulseStart/Momentum/Prime tiers",
        "Automated portfolio analysis",
        "Client relationship management",
        "Performance tracking dashboards",
        "Risk assessment tools"
      ],
      technologies: ["React", "Node.js", "Database Design", "API Development"],
      metrics: { portfolios: "10+", aum: "Growing" },
      status: "Production"
    },
    {
      title: "TradingView Scripts & Indicators",
      description: "Custom Pine Script indicators and automated trading strategies with advanced market analysis capabilities.",
      features: [
        "Dynamic entry/SL/TP dialogs",
        "SAR-MA automation with backtesting",
        "RSI divergence signals",
        "Binocular toolkit for analysis",
        "Real-time notifications"
      ],
      technologies: ["Pine Script v5/v6", "TradingView", "Market Analysis"],
      metrics: { indicators: "15+", users: "500+" },
      status: "Published"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative fintech solutions delivering real value with proven results 
            and measurable impact across trading and portfolio management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <Badge 
                  variant="secondary"
                  className={`${
                    project.status === 'Production' ? 'bg-success text-success-foreground' :
                    project.status === 'Active' ? 'bg-accent text-accent-foreground' :
                    'bg-primary text-primary-foreground'
                  }`}
                >
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="flex space-x-4 text-sm">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground capitalize">{key}: </span>
                      <span className="font-semibold text-primary">{value}</span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="cta" size="lg" className="text-lg px-8 py-3">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;