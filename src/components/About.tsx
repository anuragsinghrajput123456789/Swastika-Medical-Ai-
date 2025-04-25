
import { Progress } from "./ui/progress";

const About = () => {
  const skills = [
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "TensorFlow/PyTorch", level: 70 },
    { name: "MongoDB/PostgreSQL", level: 85 }
  ];

  const experiences = [
    {
      year: "2023 - Present",
      position: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      description: "Leading development of AI-powered web applications using React, Node.js, and TensorFlow."
    },
    {
      year: "2021 - 2023",
      position: "Full-Stack Developer",
      company: "WebSolutions Ltd.",
      description: "Built and maintained MERN stack applications with a focus on responsive design and performance optimization."
    },
    {
      year: "2019 - 2021",
      position: "Frontend Developer",
      company: "CreativeDesign Agency",
      description: "Developed interactive web interfaces using React and collaborated with designers to implement pixel-perfect designs."
    }
  ];

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate full-stack developer with a focus on creating efficient, 
            user-friendly applications that leverage the power of artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-xl font-bold mb-6">My Journey</h3>
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={index} className="relative pl-8 border-l border-primary pb-8 last:pb-0">
                  <div className="absolute top-0 left-[-8px] w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-sm text-accent font-medium">{experience.year}</span>
                  <h4 className="font-bold mt-1">{experience.position}</h4>
                  <p className="text-muted-foreground">{experience.company}</p>
                  <p className="mt-2 text-sm">{experience.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <h3 className="text-xl font-bold mb-6">Skills &amp; Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
