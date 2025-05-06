
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

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

interface SymptomFormProps {
  selectedSymptoms: string[];
  setSelectedSymptoms: (symptoms: string[]) => void;
  additionalInfo: string;
  setAdditionalInfo: (info: string) => void;
  onSubmit: () => void;
}

export const SymptomForm = ({
  selectedSymptoms,
  setSelectedSymptoms,
  additionalInfo,
  setAdditionalInfo,
  onSubmit
}: SymptomFormProps) => {
  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(
      selectedSymptoms.includes(symptomId)
        ? selectedSymptoms.filter(id => id !== symptomId)
        : [...selectedSymptoms, symptomId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Checker</CardTitle>
        <CardDescription>
          Select all symptoms you're currently experiencing
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
          onClick={onSubmit} 
          disabled={selectedSymptoms.length === 0}
        >
          Analyze Symptoms
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomForm;
