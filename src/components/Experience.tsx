import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const Experience = () => {
  const experiences = [
    {
      title: "Founder & CEO",
      company: "Reverie Synaptic Pulse (RSP)",
      period: "2024 - Present",
      description: "Leading a fintech startup specializing in algorithmic trading and portfolio management with proven track record of delivering exceptional returns.",
      achievements: [
        "Built proprietary SMC/ICT-based trading algorithms with 89% win rate",
        "Delivered 21% portfolio returns in just 5 days",
        "Designed tiered wealth-management packages (PulseStart, PulseMomentum, PulsePrime)",
        "Successfully managed 10+ client portfolios with consistent returns"
      ],
      skills: ["Algorithmic Trading", "Portfolio Management", "Business Strategy", "Client Relations"]
    },
    {
      title: "Algorithmic Trading Specialist",
      company: "Independent Consultant",
      period: "2023 - Present",
      description: "Developing advanced trading systems and providing mentorship in forex markets with focus on institutional-grade strategies.",
      achievements: [
        "Created automated finance trackers for multi-client portfolio analysis",
        "Led 14-day forex mentorship programs with structured outcomes",
        "Developed MT4/MT5 Expert Advisors with order-block detection",
        "Implemented ATR-based risk management & stop-loss automation"
      ],
      skills: ["MQL4/5", "Pine Script", "Risk Management", "Mentorship"]
    },
    {
      title: "Software Developer",
      company: "Fintech Projects",
      period: "2024 - Present",
      description: "Building innovative financial applications using modern web technologies and VibeCoding methodologies for enhanced user engagement.",
      achievements: [
        "Developed interactive React/Next.js PWAs with gamified XP systems",
        "Created FIRE planners with automated projections",
        "Built debt management tools with visual analytics",
        "Implemented mobile-first responsive designs with dark/light modes"
      ],
      skills: ["React/Next.js", "TypeScript", "Tailwind CSS", "PWA Development"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From student to successful entrepreneur, building innovative fintech solutions 
            with proven results and measurable impact.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-8 shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-primary mb-2">{exp.title}</h3>
                  <p className="text-lg font-semibold text-secondary mb-2">{exp.company}</p>
                  <p className="text-muted-foreground font-medium">{exp.period}</p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Technologies & Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary"
                          className="bg-gradient-primary text-primary-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;