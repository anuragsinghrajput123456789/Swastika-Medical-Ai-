
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

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

interface DiagnosisType {
  possibleConditions: string[];
  recommendations: string;
  urgencyLevel: "low" | "medium" | "high";
}

interface SymptomAnalysisResultsProps {
  selectedSymptoms: string[];
  diagnosis: DiagnosisType;
  onResetChecker: () => void;
  onSetActiveTab: (tab: string) => void;
}

export const SymptomAnalysisResults = ({
  selectedSymptoms,
  diagnosis,
  onResetChecker,
  onSetActiveTab
}: SymptomAnalysisResultsProps) => {
  return (
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
          
          <div>
            <Button onClick={() => onSetActiveTab("triage")} variant="outline" size="sm" className="mr-2">
              Get Triage Assessment
            </Button>
            <Button onClick={() => onSetActiveTab("appointments")} variant="outline" size="sm">
              Schedule Appointment
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onResetChecker}>
          Check Different Symptoms
        </Button>
        <Button>
          Find Healthcare Provider
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomAnalysisResults;
