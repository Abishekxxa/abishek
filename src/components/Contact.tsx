import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(100, "Subject must be less than 100 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    try {
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: "Abishek S J"
      };

      await emailjs.send(
        "service_utassbz",
        "template_a3y7nx9", 
        templateParams,
        "-n0zywPUsfgJ1wXH5"
      );

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      toast({
        title: "Failed to Send Message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Ready to discuss algorithmic trading, fintech innovation, or potential collaborations?
            I'm always open to new opportunities and partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">Get In Touch</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Whether you're interested in algorithmic trading strategies, portfolio management services,
                or exploring fintech partnerships, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm sm:text-base">@</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Email</h4>
                    <p className="text-sm sm:text-base text-primary break-all">sjabishek5@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary-foreground font-bold text-sm sm:text-base">📱</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Phone</h4>
                    <p className="text-sm sm:text-base text-secondary">+91 6380005613</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm sm:text-base">in</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">LinkedIn</h4>
                    <p className="text-sm sm:text-base text-primary">Abishek S J</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary-foreground font-bold text-xs sm:text-sm">RSP</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Company</h4>
                    <p className="text-sm sm:text-base text-secondary">Reverie Synaptic Pulse</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-gradient-subtle p-4 sm:p-6 rounded-lg border border-primary/20">
              <h4 className="text-sm sm:text-base font-bold text-foreground mb-2">Areas of Interest</h4>
              <ul className="space-y-1 text-sm sm:text-base text-muted-foreground">
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
          <Card className="p-4 sm:p-6 md:p-8 shadow-elegant">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What's this about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project, collaboration ideas, or any questions you have..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;