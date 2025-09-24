import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss algorithmic trading, fintech innovation, or potential collaborations? 
            I'm always open to new opportunities and partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're interested in algorithmic trading strategies, portfolio management services, 
                or exploring fintech partnerships, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">@</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-primary">sjabishek5@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-secondary-foreground font-bold">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-secondary">+91 6380005613</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">in</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">LinkedIn</h4>
                    <p className="text-primary">Abishek S J</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-secondary-foreground font-bold">RSP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Company</h4>
                    <p className="text-secondary">Reverie Synaptic Pulse</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-gradient-subtle p-6 rounded-lg border border-primary/20">
              <h4 className="font-bold text-foreground mb-2">Areas of Interest</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Algorithmic Trading Partnerships</li>
                <li>• Portfolio Management Services</li>
                <li>• Fintech Innovation Collaborations</li>
                <li>• Investment Opportunities</li>
                <li>• Speaking Engagements</li>
                <li>• Research Collaborations</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 shadow-elegant">
            <h3 className="text-2xl font-bold mb-6 text-primary">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input placeholder="Your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Your last name" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input placeholder="What's this about?" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell me about your project, collaboration ideas, or any questions you have..."
                  rows={6}
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full text-lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;