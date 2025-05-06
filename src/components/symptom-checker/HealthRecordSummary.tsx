
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Mock health record data
const healthRecords = {
  patientInfo: {
    name: "Demo Patient",
    dob: "1980-05-15",
    gender: "Female",
    bloodType: "O+",
    height: "5'6\"",
    weight: "150 lbs",
    bmi: "24.2"
  },
  allergies: [
    { type: "Medication", name: "Penicillin", severity: "Severe", reaction: "Hives, Difficulty Breathing" },
    { type: "Food", name: "Peanuts", severity: "Moderate", reaction: "Skin Rash, Swelling" }
  ],
  conditions: [
    { name: "Hypertension", diagnosedDate: "2018-03-10", status: "Ongoing", notes: "Well-controlled with medication" },
    { name: "Asthma", diagnosedDate: "2005-07-22", status: "Ongoing", notes: "Mild, occasional flare-ups" }
  ],
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2018-03-15", purpose: "Hypertension" },
    { name: "Albuterol Inhaler", dosage: "90mcg", frequency: "As needed", startDate: "2005-08-01", purpose: "Asthma" }
  ],
  immunizations: [
    { name: "Influenza", date: "2024-10-05", status: "Completed" },
    { name: "COVID-19", date: "2023-09-12", status: "Completed" },
    { name: "Tetanus", date: "2020-03-18", status: "Completed" }
  ],
  labResults: [
    { 
      name: "Complete Blood Count", 
      date: "2024-02-15", 
      results: [
        { test: "WBC", value: "7.2 K/uL", range: "4.5-11.0 K/uL", status: "Normal" },
        { test: "RBC", value: "4.8 M/uL", range: "4.2-5.4 M/uL", status: "Normal" },
        { test: "Hemoglobin", value: "14.2 g/dL", range: "12.0-16.0 g/dL", status: "Normal" },
        { test: "Platelets", value: "250 K/uL", range: "150-450 K/uL", status: "Normal" }
      ]
    },
    { 
      name: "Lipid Panel", 
      date: "2024-02-15", 
      results: [
        { test: "Total Cholesterol", value: "195 mg/dL", range: "< 200 mg/dL", status: "Normal" },
        { test: "LDL", value: "110 mg/dL", range: "< 100 mg/dL", status: "Elevated" },
        { test: "HDL", value: "55 mg/dL", range: "> 40 mg/dL", status: "Normal" },
        { test: "Triglycerides", value: "150 mg/dL", range: "< 150 mg/dL", status: "Borderline" }
      ]
    }
  ],
  visits: [
    { 
      type: "Primary Care Visit", 
      date: "2024-02-15", 
      provider: "Dr. Smith",
      reason: "Annual Physical",
      notes: "Patient is doing well overall. Recommended continued exercise and dietary changes to improve LDL levels.",
      followUp: "1 year"
    },
    { 
      type: "Specialist Visit", 
      date: "2023-10-10", 
      provider: "Dr. Johnson, Pulmonology",
      reason: "Asthma Follow-up",
      notes: "Asthma well-controlled. No changes to current management plan.",
      followUp: "As needed"
    }
  ]
};

export const HealthRecordSummary = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectEMR = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast.success("Successfully connected to health records");
    }, 1500);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <FileText className="h-5 w-5 text-teal-500" />
        <CardTitle>Health Record Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Connect to Your Health Records</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Access your medical history, medications, allergies, and lab results by connecting to your Electronic Medical Records.
            </p>
            <Button onClick={handleConnectEMR} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Connecting...
                </>
              ) : (
                "Connect EMR System"
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Demo Note: This is a simulation. No actual EMR integration is performed.
            </p>
          </div>
        ) : (
          <div>
            <div className="bg-teal-50 border border-teal-100 p-4 rounded-md mb-6 dark:bg-teal-950/20 dark:border-teal-900">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-teal-700 dark:text-teal-300">
                    {healthRecords.patientInfo.name}
                  </h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">
                    DOB: {healthRecords.patientInfo.dob} • {healthRecords.patientInfo.gender} • Blood Type: {healthRecords.patientInfo.bloodType}
                  </p>
                </div>
                <p className="text-sm text-teal-600 dark:text-teal-400">
                  Last Updated: May 1, 2025
                </p>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="allergies">
                <AccordionTrigger className="text-base font-medium">Allergies & Warnings</AccordionTrigger>
                <AccordionContent>
                  {healthRecords.allergies.length > 0 ? (
                    <div className="space-y-2">
                      {healthRecords.allergies.map((allergy, i) => (
                        <div key={i} className="p-2 border rounded-md">
                          <div className="flex justify-between">
                            <span className="font-medium">{allergy.name}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              allergy.severity === "Severe" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" : 
                              "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                            }`}>
                              {allergy.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Type:</span> {allergy.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Reaction:</span> {allergy.reaction}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No known allergies recorded.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="conditions">
                <AccordionTrigger className="text-base font-medium">Conditions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {healthRecords.conditions.map((condition, i) => (
                      <div key={i} className="p-2 border rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">{condition.name}</span>
                          <span className="text-sm text-muted-foreground">
                            Since {new Date(condition.diagnosedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Status:</span> {condition.status}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {condition.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="medications">
                <AccordionTrigger className="text-base font-medium">Current Medications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {healthRecords.medications.map((medication, i) => (
                      <div key={i} className="p-2 border rounded-md">
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage}, {medication.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">For:</span> {medication.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="labResults">
                <AccordionTrigger className="text-base font-medium">Recent Lab Results</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {healthRecords.labResults.map((lab, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{lab.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(lab.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="border rounded-md overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted">
                              <tr>
                                <th className="p-2 text-left">Test</th>
                                <th className="p-2 text-left">Result</th>
                                <th className="p-2 text-left">Range</th>
                                <th className="p-2 text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lab.results.map((result, j) => (
                                <tr key={j} className="border-t">
                                  <td className="p-2">{result.test}</td>
                                  <td className="p-2">{result.value}</td>
                                  <td className="p-2">{result.range}</td>
                                  <td className="p-2">
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                                      result.status === "Normal" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" : 
                                      result.status === "Elevated" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" :
                                      "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                                    }`}>
                                      {result.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="visits">
                <AccordionTrigger className="text-base font-medium">Recent Visits</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {healthRecords.visits.map((visit, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">{visit.type}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(visit.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Provider:</span> {visit.provider}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Reason:</span> {visit.reason}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Notes:</span> {visit.notes}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Follow-up:</span> {visit.followUp}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6 text-sm bg-primary/10 p-3 rounded-md">
              <p className="font-medium">
                This is a summary of your health records. For complete medical history, please consult with your healthcare provider.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthRecordSummary;
