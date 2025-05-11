import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

// Import mock data and components
import { mockDiagnosis } from "./symptom-checker/mockDiagnosisData";
import SymptomForm from "./symptom-checker/SymptomForm";
import SymptomAnalysisResults from "./symptom-checker/SymptomAnalysisResults";
import EmergencyDialog from "./symptom-checker/EmergencyDialog";

// Other feature components
import MedicalTriage from "./symptom-checker/MedicalTriage";
import MedicationInfo from "./symptom-checker/MedicationInfo";
import HealthRecordSummary from "./symptom-checker/HealthRecordSummary";
import AppointmentScheduling from "./symptom-checker/AppointmentScheduling";
import LifestyleTips from "./symptom-checker/LifestyleTips";
import EmergencyResponse from "./symptom-checker/EmergencyResponse";
import HealthEducation from "./symptom-checker/HealthEducation";
import GeneralHealthEducation from "./symptom-checker/GeneralHealthEducation";

// Icons
import {
  Stethoscope,
  AlertTriangle,
  Pill,
  FileText,
  Calendar,
  HeartPulse,
  BookOpen,
  Activity as ActivityIcon,
} from "lucide-react";

const SymptomChecker = () => {
  const [activeTab, setActiveTab] = useState("symptoms");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisType>({
    possibleConditions: [],
    recommendations: "",
    urgencyLevel: "low",
  });
  const [emergencyDialog, setEmergencyDialog] = useState(false);

  const analyzeSymptomsHandler = () => {
    if (selectedSymptoms.includes("chest-pain") && selectedSymptoms.includes("shortness-of-breath")) {
      setEmergencyDialog(true);
      return;
    }

    const symptomKey = selectedSymptoms.sort().join("+");
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
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI Symptom Checker
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Get insights about your health, manage appointments, and access medical resources.
            <br />
            <span className="text-sm font-medium text-destructive">
              Note: This is not a substitute for professional medical advice.
            </span>
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
              <TabItem
                value="symptoms"
                icon={<Stethoscope size={18} />}
                label="Symptoms"
                color="bg-white text-blue-600 hover:bg-blue-100"
              />
              <TabItem
                value="triage"
                icon={<AlertTriangle size={18} />}
                label="Triage"
                color="bg-white text-yellow-600 hover:bg-yellow-100"
              />
              <TabItem
                value="medication"
                icon={<Pill size={18} />}
                label="Medication"
                color="bg-white text-green-600 hover:bg-green-100"
              />
              <TabItem
                value="records"
                icon={<FileText size={18} />}
                label="Records"
                color="bg-white text-gray-700 hover:bg-gray-100"
              />
              <TabItem
                value="appointments"
                icon={<Calendar size={18} />}
                label="Appointments"
                color="bg-white text-teal-600 hover:bg-teal-100"
              />
              <TabItem
                value="emergency"
                icon={<HeartPulse size={18} />}
                label="Emergency"
                color="bg-white text-red-600 hover:bg-red-100"
              />
              <TabItem
                value="education"
                icon={<BookOpen size={18} />}
                label="Resources"
                color="bg-white text-purple-600 hover:bg-purple-100"
              />
              <TabItem
                value="general-education"
                icon={<ActivityIcon size={18} />}
                label="Basics"
                color="bg-white text-indigo-600 hover:bg-indigo-100"
              />
            </TabsList>
          </div>

          {/* Tab Content Area */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 transition-all duration-300 transform hover:shadow-2xl">
            <TabsContent value="symptoms" className="mt-0">
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

            <TabsContent value="triage" className="mt-0">
              <MedicalTriage />
              <LifestyleTips />
            </TabsContent>

            <TabsContent value="medication" className="mt-0">
              <MedicationInfo />
            </TabsContent>

            <TabsContent value="records" className="mt-0">
              <HealthRecordSummary />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <AppointmentScheduling />
            </TabsContent>

            <TabsContent value="emergency" className="mt-0">
              <EmergencyResponse />
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <HealthEducation />
            </TabsContent>

            <TabsContent value="general-education" className="mt-0">
              <GeneralHealthEducation />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Emergency Dialog */}
      <EmergencyDialog open={emergencyDialog} onOpenChange={setEmergencyDialog} />
    </div>
  );
};

// Reusable Tab Item Component with Icon + Label
const TabItem = ({ value, icon, label, color }) => (
  <TabsTrigger
    value={value}
    className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
      color
    }`}
  >
    <span>{icon}</span>
    <span className="hidden sm:inline">{label}</span>
  </TabsTrigger>
);

export default SymptomChecker;