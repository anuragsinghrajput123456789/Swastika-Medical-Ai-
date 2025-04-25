
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const [role, setRole] = useState(0);
  const roles = ["Full-Stack Developer", "AI Specialist", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRole((prevRole) => (prevRole + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="section-padding min-h-screen flex items-center pt-20">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col order-2 md:order-1 animate-fade-up">
          <p className="text-accent mb-2 font-medium">👋 Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
            John Doe
          </h1>
          <div className="h-12 mb-4">
            <h2 className="text-2xl md:text-3xl font-medium opacity-85 typing-container">
              {roles[role]}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            I build modern, responsive web applications with a focus on AI integration.
            Passionate about creating intuitive and scalable digital experiences.
          </p>

          <div className="flex gap-4 flex-wrap mb-8">
            <Button>
              Contact Me <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              Download CV <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 items-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:example@domain.com" className="text-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="relative order-1 md:order-2 flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="glass-card relative overflow-hidden rounded-full border-4 border-white/20 shadow-xl h-64 w-64 md:h-80 md:w-80 animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
              alt="John Doe - Developer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
