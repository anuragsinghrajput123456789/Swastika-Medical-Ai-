
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

// Mock symptom data
const commonSymptoms = [
  { id: "headache", label: "Headache" },
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "fatigue", label: "Fatigue" },
  { id: "sore-throat", label: "Sore Throat" },
  { id: "shortness-of-breath", label: "Shortness of Breath" },
  { id: "body-aches", label: "Body Aches" },
  { id: "nausea", label: "Nausea" },
  { id: "dizziness", label: "Dizziness" },
  { id: "rash", label: "Rash" },
  { id: "chest-pain", label: "Chest Pain" },
  { id: "abdominal-pain", label: "Abdominal Pain" },
];

// Mock diagnosis data
const mockDiagnosis = {
  "headache+fever+fatigue": {
    possibleConditions: ["Common Cold", "Flu", "COVID-19"],
    recommendations: "Rest, hydrate well, and monitor your symptoms. If fever persists over 101°F for more than 2 days, consult a doctor.",
    urgencyLevel: "medium",
  },
  "headache+fever": {
    possibleConditions: ["Common Cold", "Flu", "Sinus Infection"],
    recommendations: "Rest, stay hydrated, and take over-the-counter pain relievers if needed.",
    urgencyLevel: "low",
  },
  "chest-pain+shortness-of-breath": {
    possibleConditions: ["Anxiety Attack", "Asthma", "Heart Issue"],
    recommendations: "This combination of symptoms requires immediate medical attention. Please consult a healthcare provider right away.",
    urgencyLevel: "high",
  },
  "default": {
    possibleConditions: ["Multiple possibilities"],
    recommendations: "Based on your symptoms, I recommend consulting with a healthcare provider for proper diagnosis.",
    urgencyLevel: "medium",
  }
};

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [emergencyDialog, setEmergencyDialog] = useState(false);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptomsHandler = () => {
    if (selectedSymptoms.includes("chest-pain") && selectedSymptoms.includes("shortness-of-breath")) {
      setEmergencyDialog(true);
      return;
    }

    // Create a key based on selected symptoms
    const symptomKey = selectedSymptoms.sort().join("+");
    
    // Get diagnosis or default
    const result = mockDiagnosis[symptomKey as keyof typeof mockDiagnosis] || mockDiagnosis.default;
    
    setDiagnosis(result);
    setShowResults(true);
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setAdditionalInfo("");
    setShowResults(false);
    setDiagnosis(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Symptom Checker</h1>
          <p className="text-muted-foreground">
            Select your symptoms below to receive an initial assessment.
            <br />
            <span className="text-sm font-medium text-destructive">
              Note: This is not a substitute for professional medical advice.
            </span>
          </p>
        </div>

        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Symptoms</CardTitle>
              <CardDescription>
                Check all symptoms you're currently experiencing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={symptom.id} 
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={() => handleSymptomToggle(symptom.id)}
                    />
                    <Label htmlFor={symptom.id}>{symptom.label}</Label>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  placeholder="Describe when symptoms started, any recent events, or other relevant information..."
                  className="mt-2"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={analyzeSymptomsHandler} 
                disabled={selectedSymptoms.length === 0}
              >
                Analyze Symptoms
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Symptom Analysis</CardTitle>
              <CardDescription>
                Based on the symptoms you selected:
                {selectedSymptoms.map((id) => (
                  <span key={id} className="inline-block bg-primary/10 text-primary rounded-full px-2 py-1 text-xs mr-1 mt-1">
                    {commonSymptoms.find(s => s.id === id)?.label}
                  </span>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Possible Conditions</h3>
                  <ul className="list-disc pl-5">
                    {diagnosis.possibleConditions.map((condition: string, index: number) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Note: These are possible conditions based on your symptoms and not a definitive diagnosis.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                  <div className={`p-4 rounded-md ${
                    diagnosis.urgencyLevel === "high" ? "bg-destructive/10 text-destructive" :
                    diagnosis.urgencyLevel === "medium" ? "bg-amber-500/10 text-amber-600" :
                    "bg-green-500/10 text-green-600"
                  }`}>
                    {diagnosis.recommendations}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetChecker}>
                Check Different Symptoms
              </Button>
              <Button>
                Find Healthcare Provider
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Emergency Dialog */}
      <Dialog open={emergencyDialog} onOpenChange={setEmergencyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Seek Immediate Medical Attention</DialogTitle>
            <DialogDescription>
              The combination of chest pain and shortness of breath could indicate a serious medical emergency.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            <p className="font-medium">Please: </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Call emergency services (911) immediately</li>
              <li>Do not drive yourself to the hospital</li>
              <li>Stay calm and sit or lie down while waiting for help</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setEmergencyDialog(false)}>
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SymptomChecker;
