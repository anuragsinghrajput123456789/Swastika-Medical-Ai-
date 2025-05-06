
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Import our mock data
import { mockDiagnosis } from "./symptom-checker/mockDiagnosisData";

// Import our refactored components
import SymptomForm from "./symptom-checker/SymptomForm";
import SymptomAnalysisResults from "./symptom-checker/SymptomAnalysisResults";
import EmergencyDialog from "./symptom-checker/EmergencyDialog";

// Import our existing components
import MedicalTriage from "./symptom-checker/MedicalTriage";
import MedicationInfo from "./symptom-checker/MedicationInfo";
import HealthRecordSummary from "./symptom-checker/HealthRecordSummary";
import AppointmentScheduling from "./symptom-checker/AppointmentScheduling";
import LifestyleTips from "./symptom-checker/LifestyleTips";
import EmergencyResponse from "./symptom-checker/EmergencyResponse";
import HealthEducation from "./symptom-checker/HealthEducation";

const SymptomChecker = () => {
  const [activeTab, setActiveTab] = useState("symptoms");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [emergencyDialog, setEmergencyDialog] = useState(false);

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
    setActiveTab("symptoms");
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setAdditionalInfo("");
    setShowResults(false);
    setDiagnosis(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Health Assistant</h1>
          <p className="text-muted-foreground">
            Get insights about your health, manage appointments, and access medical resources.
            <br />
            <span className="text-sm font-medium text-destructive">
              Note: This is not a substitute for professional medical advice.
            </span>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-1">
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="triage">Triage</TabsTrigger>
              <TabsTrigger value="medication">Medication</TabsTrigger>
              <TabsTrigger value="records">Records</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="symptoms">
            {!showResults ? (
              <SymptomForm
                selectedSymptoms={selectedSymptoms}
                setSelectedSymptoms={setSelectedSymptoms}
                additionalInfo={additionalInfo}
                setAdditionalInfo={setAdditionalInfo}
                onSubmit={analyzeSymptomsHandler}
              />
            ) : (
              <SymptomAnalysisResults
                selectedSymptoms={selectedSymptoms}
                diagnosis={diagnosis}
                onResetChecker={resetChecker}
                onSetActiveTab={setActiveTab}
              />
            )}
          </TabsContent>
          
          <TabsContent value="triage">
            <MedicalTriage />
            <LifestyleTips />
          </TabsContent>
          
          <TabsContent value="medication">
            <MedicationInfo />
          </TabsContent>
          
          <TabsContent value="records">
            <HealthRecordSummary />
          </TabsContent>
          
          <TabsContent value="appointments">
            <AppointmentScheduling />
          </TabsContent>
          
          <TabsContent value="emergency">
            <EmergencyResponse />
          </TabsContent>
          
          <TabsContent value="education">
            <HealthEducation />
          </TabsContent>
        </Tabs>
      </div>

      {/* Emergency Dialog */}
      <EmergencyDialog 
        open={emergencyDialog} 
        onOpenChange={setEmergencyDialog} 
      />
    </div>
  );
};

export default SymptomChecker;
