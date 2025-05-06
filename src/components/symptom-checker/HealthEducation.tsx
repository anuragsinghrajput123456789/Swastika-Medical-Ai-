
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Info } from "lucide-react";
import { healthEducationTopics } from "@/utils/healthUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock health education content for demonstration
const healthEducationContent = {
  "Understanding Blood Pressure": {
    definition: "Blood pressure is the force of blood pushing against the walls of your arteries. It is measured in millimeters of mercury (mmHg) and recorded as two numbers: systolic pressure (when the heart beats) over diastolic pressure (when the heart rests).",
    normal: "Normal blood pressure is less than 120/80 mmHg.",
    elevated: "Elevated blood pressure is when readings consistently range from 120-129 systolic and less than 80 mmHg diastolic.",
    hypertension: "Hypertension Stage 1 is when readings consistently range from 130-139 systolic or 80-89 mmHg diastolic. Hypertension Stage 2 is when readings consistently range at 140/90 mmHg or higher.",
    tips: [
      "Maintain a healthy weight",
      "Exercise regularly",
      "Eat a healthy diet (DASH diet)",
      "Reduce sodium intake",
      "Limit alcohol consumption",
      "Avoid smoking",
      "Manage stress",
      "Regular check-ups with your healthcare provider"
    ]
  },
  "Managing Diabetes": {
    types: "There are three main types of diabetes: Type 1, Type 2, and gestational diabetes. Type 1 is an autoimmune condition where the body doesn't produce insulin. Type 2 occurs when the body becomes resistant to insulin or doesn't produce enough. Gestational diabetes develops during pregnancy.",
    symptoms: "Common symptoms include increased thirst, frequent urination, extreme hunger, unexplained weight loss, fatigue, irritability, blurred vision, slow-healing sores, and frequent infections.",
    management: "Diabetes management focuses on keeping blood sugar levels as close to normal as possible through a combination of diet, exercise, medication, and regular monitoring.",
    tips: [
      "Regular blood sugar monitoring",
      "Balanced diet with carbohydrate counting",
      "Regular physical activity",
      "Taking medications as prescribed",
      "Regular check-ups with healthcare providers",
      "Foot care and regular eye exams",
      "Managing stress",
      "Getting adequate sleep"
    ]
  },
  "Heart Health Basics": {
    importance: "Your heart is a muscle that pumps blood throughout your body. It supplies oxygen and nutrients to your tissues and removes waste products.",
    risks: "Risk factors for heart disease include high blood pressure, high cholesterol, smoking, diabetes, obesity, physical inactivity, unhealthy diet, and family history.",
    prevention: "Heart disease is largely preventable through lifestyle changes and management of health conditions.",
    tips: [
      "Don't smoke or use tobacco products",
      "Exercise for at least 30 minutes most days",
      "Eat a heart-healthy diet",
      "Maintain a healthy weight",
      "Get enough quality sleep",
      "Manage stress",
      "Get regular health screenings",
      "Know your family history"
    ]
  },
  "FAQ": {
    questions: [
      {
        q: "How often should I get a physical examination?",
        a: "Adults should generally get a physical exam every 1-3 years depending on age and health status. Those over 50 or with chronic conditions may need more frequent check-ups."
      },
      {
        q: "How much water should I drink daily?",
        a: "While individual needs vary, a general guideline is about 8 cups (64 ounces) of water per day. However, factors like activity level, climate, and health conditions can affect your needs."
      },
      {
        q: "How much sleep do I need?",
        a: "Most adults need 7-9 hours of sleep per night. Children and teenagers need more, ranging from 8-13 hours depending on age."
      },
      {
        q: "What vaccinations do adults need?",
        a: "Common adult vaccinations include annual flu shots, Td/Tdap boosters every 10 years, shingles vaccine (for those 50+), pneumococcal vaccines (for those 65+), and others depending on risk factors and health conditions."
      },
      {
        q: "How can I tell if I'm having a heart attack?",
        a: "Common symptoms include chest pain/pressure, shortness of breath, pain in arms/back/neck/jaw, nausea, lightheadedness, and cold sweats. Women may experience more subtle symptoms like fatigue, indigestion, and back or jaw pain. If you suspect a heart attack, call emergency services immediately."
      }
    ]
  }
};

export const HealthEducation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Simple matching algorithm for demo
    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    // Check if query matches any topic
    const matchedTopic = Object.keys(healthEducationContent).find(topic =>
      topic.toLowerCase().includes(normalizedQuery)
    );
    
    if (matchedTopic) {
      setSelectedTopic(matchedTopic);
    } else {
      // Check FAQ questions
      const faqQuestions = healthEducationContent["FAQ"].questions;
      const matchedQuestion = faqQuestions.find(item =>
        item.q.toLowerCase().includes(normalizedQuery) ||
        item.a.toLowerCase().includes(normalizedQuery)
      );
      
      if (matchedQuestion) {
        setSelectedTopic("FAQ");
        setActiveTab("faq");
      } else {
        setSelectedTopic(null);
      }
    }
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setActiveTab("general");
    setSearchQuery("");
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <FileText className="h-5 w-5 text-blue-500" />
        <CardTitle>Health Education & FAQ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Search health topics or questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        
        {!selectedTopic ? (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Popular Health Topics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {healthEducationTopics.map((topic, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleTopicSelect(topic)}
                >
                  <Info className="mr-2 h-4 w-4" />
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{selectedTopic}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTopic(null)}>
                Back to Topics
              </Button>
            </div>
            
            {selectedTopic === "FAQ" ? (
              <div className="space-y-4">
                {healthEducationContent["FAQ"].questions.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="font-medium">{item.q}</h4>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            ) : selectedTopic === "Understanding Blood Pressure" ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="readings">Readings</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4 pt-4">
                  <p>{healthEducationContent["Understanding Blood Pressure"].definition}</p>
                </TabsContent>
                <TabsContent value="readings" className="space-y-4 pt-4">
                  <div className="space-y-3">
                    <p><strong>Normal:</strong> {healthEducationContent["Understanding Blood Pressure"].normal}</p>
                    <p><strong>Elevated:</strong> {healthEducationContent["Understanding Blood Pressure"].elevated}</p>
                    <p><strong>Hypertension:</strong> {healthEducationContent["Understanding Blood Pressure"].hypertension}</p>
                  </div>
                </TabsContent>
                <TabsContent value="tips" className="space-y-4 pt-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {healthEducationContent["Understanding Blood Pressure"].tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            ) : selectedTopic === "Managing Diabetes" ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Types</TabsTrigger>
                  <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                  <TabsTrigger value="tips">Management</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4 pt-4">
                  <p>{healthEducationContent["Managing Diabetes"].types}</p>
                </TabsContent>
                <TabsContent value="symptoms" className="space-y-4 pt-4">
                  <p>{healthEducationContent["Managing Diabetes"].symptoms}</p>
                </TabsContent>
                <TabsContent value="tips" className="space-y-4 pt-4">
                  <p className="mb-2">{healthEducationContent["Managing Diabetes"].management}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {healthEducationContent["Managing Diabetes"].tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            ) : selectedTopic === "Heart Health Basics" ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="risks">Risk Factors</TabsTrigger>
                  <TabsTrigger value="tips">Prevention</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4 pt-4">
                  <p>{healthEducationContent["Heart Health Basics"].importance}</p>
                </TabsContent>
                <TabsContent value="risks" className="space-y-4 pt-4">
                  <p>{healthEducationContent["Heart Health Basics"].risks}</p>
                </TabsContent>
                <TabsContent value="tips" className="space-y-4 pt-4">
                  <p className="mb-2">{healthEducationContent["Heart Health Basics"].prevention}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {healthEducationContent["Heart Health Basics"].tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            ) : (
              <p className="text-muted-foreground">Information about this topic is being developed.</p>
            )}
            
            <div className="mt-6 text-sm bg-primary/10 p-3 rounded-md">
              <p className="font-medium">
                This information is for educational purposes only and is not intended as medical advice.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthEducation;
