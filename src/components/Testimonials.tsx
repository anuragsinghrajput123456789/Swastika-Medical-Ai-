
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      content:
        "Working with John was an absolute pleasure. His ability to translate complex requirements into elegant solutions is exceptional. Our AI-powered platform exceeded expectations.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "David Chen",
      role: "Project Manager",
      content:
        "John is an outstanding developer who consistently delivers high-quality work on time. His expertise in both frontend and backend technologies makes him an invaluable asset to any project.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer at CreativeHub",
      content:
        "I've collaborated with John on multiple projects, and his attention to detail and commitment to creating seamless user experiences is impressive. He's a true professional.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">
            Testimonials
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What others say about my work and collaboration experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-up">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none shadow-md bg-background glass-card">
                    <CardContent className="p-8 md:p-10 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
