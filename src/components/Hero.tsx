
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background Animation - Subtle pulse effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-background ${
          isAnimating ? "animate-pulse" : ""
        }`}
        style={{ animationDuration: "10s" }}
      ></div>
      
      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Medical Assistant
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Get instant health guidance, track your medical metrics, and receive personalized
            recommendations with our AI-powered healthcare companion.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/chat">Start Chatting</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/symptoms">Check Symptoms</Link>
            </Button>
          </div>
          
          <div className="mt-16 rounded-lg border bg-card p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold">How it works</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-primary/20 p-1 text-primary">✓</span>
                    <span>Ask health questions via text or voice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-primary/20 p-1 text-primary">✓</span>
                    <span>Track your health metrics over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-primary/20 p-1 text-primary">✓</span>
                    <span>Get instant symptom assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-primary/20 p-1 text-primary">✓</span>
                    <span>Receive medication reminders</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="absolute w-48 h-48 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "3s" }}></div>
                  <div className="z-10 text-4xl">🩺</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
