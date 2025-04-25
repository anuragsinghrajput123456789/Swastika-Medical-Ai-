
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <section id="features" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                🤖
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Chatbot</h3>
              <p className="text-muted-foreground">Get instant answers to your medical questions with our intelligent AI assistant.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                🩺
              </div>
              <h3 className="text-xl font-semibold mb-2">Symptom Checker</h3>
              <p className="text-muted-foreground">Analyze your symptoms and get preliminary guidance on potential conditions.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
              <p className="text-muted-foreground">Monitor vital signs and health metrics with beautiful interactive charts.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                💊
              </div>
              <h3 className="text-xl font-semibold mb-2">Medication Reminders</h3>
              <p className="text-muted-foreground">Never miss a dose with personalized medication tracking and reminders.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask a Question</h3>
              <p className="text-muted-foreground">Type or speak your health question to our AI assistant.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-muted-foreground">Receive personalized information based on your health profile and concerns.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-muted-foreground">Follow recommendations or connect with healthcare providers if needed.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="cta" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-xl mb-8 opacity-90">Start your journey to better health with MediChat</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border border-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
