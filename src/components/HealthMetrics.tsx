import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChartContainer } from "./ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

// Sample data
const sampleBloodPressureData = [
  { date: "Jan 1", systolic: 120, diastolic: 80 },
  { date: "Jan 5", systolic: 122, diastolic: 82 },
  { date: "Jan 10", systolic: 118, diastolic: 79 },
  { date: "Jan 15", systolic: 121, diastolic: 81 },
  { date: "Jan 20", systolic: 119, diastolic: 80 },
  { date: "Jan 25", systolic: 123, diastolic: 83 },
  { date: "Jan 30", systolic: 120, diastolic: 80 },
];

const sampleBloodSugarData = [
  { date: "Jan 1", fasting: 95, afterMeal: 120 },
  { date: "Jan 5", fasting: 92, afterMeal: 118 },
  { date: "Jan 10", fasting: 98, afterMeal: 130 },
  { date: "Jan 15", fasting: 94, afterMeal: 122 },
  { date: "Jan 20", fasting: 90, afterMeal: 115 },
  { date: "Jan 25", fasting: 93, afterMeal: 125 },
  { date: "Jan 30", fasting: 96, afterMeal: 127 },
];

const sampleWeightData = [
  { date: "Jan 1", weight: 165 },
  { date: "Jan 5", weight: 164 },
  { date: "Jan 10", weight: 163 },
  { date: "Jan 15", weight: 163.5 },
  { date: "Jan 20", weight: 162 },
  { date: "Jan 25", weight: 161 },
  { date: "Jan 30", weight: 160 },
];

const sampleMedicationData = [
  { name: "Lisinopril", dosage: "10mg", schedule: "Daily", adherence: 90 },
  { name: "Metformin", dosage: "500mg", schedule: "Twice daily", adherence: 85 },
  { name: "Simvastatin", dosage: "20mg", schedule: "At night", adherence: 95 },
];

// Define type for health metrics data
interface BloodPressureData {
  date: string;
  systolic: number;
  diastolic: number;
}

interface BloodSugarData {
  date: string;
  fasting: number;
  afterMeal: number;
}

interface WeightData {
  date: string;
  weight: number;
}

interface MedicationData {
  name: string;
  dosage: string;
  schedule: string;
  adherence: number;
}

const HealthMetrics = () => {
  const [activeTab, setActiveTab] = useState("bloodPressure");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // State for health metrics data
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureData[]>(sampleBloodPressureData);
  const [bloodSugarData, setBloodSugarData] = useState<BloodSugarData[]>(sampleBloodSugarData);
  const [weightData, setWeightData] = useState<WeightData[]>(sampleWeightData);
  const [medicationData, setMedicationData] = useState<MedicationData[]>(sampleMedicationData);
  
  // Form states
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [readingType, setReadingType] = useState("fasting");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  const [notes, setNotes] = useState("");
  
  // Medication form states
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddReading = async () => {
    try {
      switch (activeTab) {
        case "bloodPressure":
          if (!systolic || !diastolic) {
            toast({
              title: "Missing information",
              description: "Please fill in all required fields.",
              variant: "destructive",
            });
            return;
          }
          
          // Add new blood pressure data
          const newBpData = {
            date: format(new Date(date), 'MMM d'),
            systolic: parseInt(systolic),
            diastolic: parseInt(diastolic)
          };
          
          setBloodPressureData([...bloodPressureData, newBpData]);
          break;
          
        case "bloodSugar":
          // Handle blood sugar data...
          break;
          
        case "weight":
          // Handle weight data...
          break;
          
        case "medications":
          // Handle medication data...
          break;
      }
      
      // Reset form
      setSystolic("");
      setDiastolic("");
      setBloodSugar("");
      setReadingType("fasting");
      setWeight("");
      setDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
      setNotes("");
      setMedName("");
      setDosage("");
      setFrequency("");
      setInstructions("");
      
      // Close dialog
      setShowAddDialog(false);
      
      toast({
        title: "Health data added",
        description: "Your health metrics have been saved successfully.",
      });
      
    } catch (error) {
      console.error("Error adding health metrics:", error);
      toast({
        title: "Error saving health metrics",
        description: "Could not save your health data.",
        variant: "destructive",
      });
    }
  };

  const getDialogTitle = () => {
    switch(activeTab) {
      case "bloodPressure": return "Add Blood Pressure Reading";
      case "bloodSugar": return "Add Blood Sugar Reading";
      case "weight": return "Add Weight Reading";
      case "medications": return "Add Medication";
      default: return "Add Data";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Health Metrics Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
            <TabsTrigger value="bloodSugar">Blood Sugar</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>Add Reading</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{getDialogTitle()}</DialogTitle>
                <DialogDescription>
                  Enter your new health data below.
                </DialogDescription>
              </DialogHeader>
              
              {activeTab === "bloodPressure" && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="systolic">Systolic (mmHg)</Label>
                      <Input 
                        id="systolic" 
                        type="number"
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                      <Input 
                        id="diastolic" 
                        type="number"
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="date">Date & Time</Label>
                    <Input 
                      id="date" 
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Input 
                      id="notes" 
                      placeholder="Any relevant information..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === "bloodSugar" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="reading">Blood Sugar Level (mg/dL)</Label>
                    <Input id="reading" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="readingType">Reading Type</Label>
                    <select id="readingType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="fasting">Fasting</option>
                      <option value="afterMeal">After Meal</option>
                      <option value="random">Random</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date & Time</Label>
                    <Input id="date" type="datetime-local" />
                  </div>
                </div>
              )}
              
              {activeTab === "weight" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input id="weight" type="number" step="0.1" />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
              )}
              
              {activeTab === "medications" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="medName">Medication Name</Label>
                    <Input id="medName" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" placeholder="e.g., 10mg" />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" placeholder="e.g., Daily" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Input id="instructions" placeholder="e.g., Take with food" />
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={handleAddReading}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <TabsContent value="bloodPressure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure History</CardTitle>
              <CardDescription>
                Track your systolic and diastolic blood pressure over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ systolic: { color: "#2563eb" }, diastolic: { color: "#10b981" } }}>
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[60, 140]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="var(--color-systolic)" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="var(--color-diastolic)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{bloodPressureData[bloodPressureData.length - 1].systolic}/{bloodPressureData[bloodPressureData.length - 1].diastolic}</p>
                  <p className="text-sm text-muted-foreground">mmHg</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">120/81</p>
                  <p className="text-sm text-muted-foreground">30-day average</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-xl font-medium text-green-500">Normal</p>
                  <p className="text-sm text-muted-foreground">Based on AHA guidelines</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bloodSugar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Sugar History</CardTitle>
              <CardDescription>
                Track your fasting and after-meal glucose levels
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ fasting: { color: "#2563eb" }, afterMeal: { color: "#d946ef" } }}>
                <LineChart data={bloodSugarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[70, 140]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="fasting" stroke="var(--color-fasting)" strokeWidth={2} />
                  <Line type="monotone" dataKey="afterMeal" stroke="var(--color-afterMeal)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest Fasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{bloodSugarData[bloodSugarData.length - 1].fasting}</p>
                  <p className="text-sm text-muted-foreground">mg/dL</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Latest After-Meal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{bloodSugarData[bloodSugarData.length - 1].afterMeal}</p>
                  <p className="text-sm text-muted-foreground">mg/dL</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-xl font-medium text-green-500">Normal</p>
                  <p className="text-sm text-muted-foreground">Based on ADA guidelines</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
              <CardDescription>
                Track your weight changes over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ weight: { color: "#8b5cf6" } }}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="var(--color-weight)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Current</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{weightData[weightData.length - 1].weight}</p>
                  <p className="text-sm text-muted-foreground">lbs</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Change</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">-5.0</p>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>BMI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">23.4</p>
                  <p className="text-sm text-muted-foreground">Normal range</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medication Adherence</CardTitle>
              <CardDescription>
                Track your medication schedule and adherence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {medicationData.map((med, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium">{med.name}</h3>
                        <p className="text-sm text-muted-foreground">{med.dosage} - {med.schedule}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm font-medium ${
                          med.adherence >= 90 ? "text-green-500" :
                          med.adherence >= 80 ? "text-amber-500" : "text-red-500"
                        }`}>
                          {med.adherence}% taken
                        </span>
                        <Button variant="outline" size="sm">Log</Button>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          med.adherence >= 90 ? "bg-green-500" :
                          med.adherence >= 80 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${med.adherence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-primary">💊</span>
                    </div>
                    <div>
                      <p className="font-medium">Lisinopril 10mg</p>
                      <p className="text-sm text-muted-foreground">8:00 AM</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-green-500">✓ Taken</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-primary">💊</span>
                    </div>
                    <div>
                      <p className="font-medium">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">8:00 AM</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-green-500">✓ Taken</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-md border border-dashed">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-primary">💊</span>
                    </div>
                    <div>
                      <p className="font-medium">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">8:00 PM</p>
                    </div>
                  </div>
                  <div>
                    <Button size="sm">Take Now</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-md border border-dashed">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-primary">💊</span>
                    </div>
                    <div>
                      <p className="font-medium">Simvastatin 20mg</p>
                      <p className="text-sm text-muted-foreground">9:00 PM</p>
                    </div>
                  </div>
                  <div>
                    <Button size="sm">Take Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMetrics;
