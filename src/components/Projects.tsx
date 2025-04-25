
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  // Sample projects data
  const allProjects = [
    {
      id: 1,
      title: "AI Medical Chatbot",
      description: "An intelligent chatbot for medical consultations using NLP and machine learning.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Node.js", "TensorFlow", "OpenAI API"],
      demoUrl: "#",
      repoUrl: "#",
      category: "ai"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration and admin dashboard.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "MongoDB", "Stripe", "Redux"],
      demoUrl: "#",
      repoUrl: "#",
      category: "web"
    },
    {
      id: 3,
      title: "AI Image Generator",
      description: "Generate unique images based on text descriptions using advanced AI models.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Python", "Flask", "DALL-E API"],
      demoUrl: "#",
      repoUrl: "#",
      category: "ai"
    },
    {
      id: 4,
      title: "Task Management App",
      description: "A collaborative tool for teams to manage projects and track progress.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Firebase", "Redux", "Material UI"],
      demoUrl: "#",
      repoUrl: "#",
      category: "web"
    },
    {
      id: 5,
      title: "Fake Note Detector",
      description: "ML-based system to detect counterfeit currency using computer vision.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "TensorFlow", "OpenCV", "React"],
      demoUrl: "#",
      repoUrl: "#",
      category: "ai"
    },
    {
      id: 6,
      title: "Real-time Chat App",
      description: "End-to-end encrypted messaging application with real-time notifications.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Socket.io", "Node.js", "MongoDB"],
      demoUrl: "#",
      repoUrl: "#",
      category: "web"
    }
  ];

  // Filter categories
  const categories = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Development" },
    { value: "ai", label: "AI & ML" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(allProjects);

  const filterProjects = (category: string) => {
    setActiveCategory(category);
    if (category === "all") {
      setVisibleProjects(allProjects);
    } else {
      setVisibleProjects(allProjects.filter(project => project.category === category));
    }
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work spanning web development and AI innovation.
          </p>
          
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                onClick={() => filterProjects(category.value)}
                className="min-w-24"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 animate-fade-up">
              <div className="h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
