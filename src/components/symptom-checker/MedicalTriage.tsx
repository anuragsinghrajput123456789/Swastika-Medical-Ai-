
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Heart, AlertCircle } from "lucide-react";
import { determineTriageSeverity, getTriageAdvice, TriageSeverity } from "@/utils/healthUtils";

// Expanded symptom list for triage
const triageSymptoms = [
  { id: "fever", label: "Fever above 101°F" },
  { id: "chest-pain", label: "Chest Pain" },
  { id: "shortness-of-breath", label: "Shortness of Breath" },
  { id: "severe-headache", label: "Severe Headache" },
  { id: "abdominal-pain", label: "Abdominal Pain" },
  { id: "vomiting", label: "Persistent Vomiting" },
  { id: "dizziness", label: "Dizziness or Lightheadedness" },
  { id: "rash", label: "Skin Rash" },
  { id: "joint-pain", label: "Joint Pain or Swelling" },
  { id: "stroke-symptoms", label: "Facial Drooping, Arm Weakness, or Speech Difficulty" },
  { id: "severe-bleeding", label: "Severe Bleeding" },
  { id: "severe-burn", label: "Severe Burns" },
];

export const MedicalTriage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [triageResult, setTriageResult] = useState<{
    severity: TriageSeverity;
    advice: string;
  } | null>(null);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleTriage = () => {
    if (selectedSymptoms.length === 0) return;
    
    const severity = determineTriageSeverity(selectedSymptoms);
    const advice = getTriageAdvice(severity);
    
    setTriageResult({ severity, advice });
  };

  const resetTriage = () => {
    setSelectedSymptoms([]);
    setTriageResult(null);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Heart className="h-5 w-5 text-red-500" />
        <CardTitle>Medical Triage</CardTitle>
      </CardHeader>
      <CardContent>
        {!triageResult ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Select all symptoms you are currently experiencing to get an urgency assessment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {triageSymptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`triage-${symptom.id}`}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={() => handleSymptomToggle(symptom.id)}
                  />
                  <Label htmlFor={`triage-${symptom.id}`}>{symptom.label}</Label>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleTriage}
              disabled={selectedSymptoms.length === 0}
              className="w-full"
            >
              Assess Urgency
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-md ${
              triageResult.severity === "emergency" ? "bg-red-500/10 border border-red-500/20" : 
              triageResult.severity === "high" ? "bg-amber-500/10 border border-amber-500/20" :
              triageResult.severity === "medium" ? "bg-yellow-500/10 border border-yellow-500/20" :
              "bg-green-500/10 border border-green-500/20"
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {triageResult.severity === "emergency" && <AlertCircle className="h-5 w-5 text-red-500" />}
                <h3 className={`font-medium ${
                  triageResult.severity === "emergency" ? "text-red-500" : 
                  triageResult.severity === "high" ? "text-amber-500" :
                  triageResult.severity === "medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  {triageResult.severity === "emergency" ? "EMERGENCY" :
                   triageResult.severity === "high" ? "Urgent Care Needed" :
                   triageResult.severity === "medium" ? "Medical Attention Recommended" :
                   "Non-Urgent"
                  }
                </h3>
              </div>
              
              <p>{triageResult.advice}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Selected Symptoms:</h4>
              <ul className="list-disc pl-5">
                {selectedSymptoms.map(id => (
                  <li key={id}>
                    {triageSymptoms.find(s => s.id === id)?.label}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-sm bg-primary/10 p-3 rounded-md">
              <p className="font-medium">
                Disclaimer: This is an automated assessment tool only and not a substitute for professional medical judgment. 
                When in doubt, always seek medical attention.
              </p>
            </div>
            
            <Button onClick={resetTriage} variant="outline" className="w-full">
              Start Over
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalTriage;
