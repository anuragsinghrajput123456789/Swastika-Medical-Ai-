
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarDays } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Mock data for demonstration
const specialties = [
  { id: "gp", name: "General Practitioner" },
  { id: "cardio", name: "Cardiologist" },
  { id: "derm", name: "Dermatologist" },
  { id: "neuro", name: "Neurologist" },
  { id: "ortho", name: "Orthopedist" },
  { id: "psych", name: "Psychiatrist" },
  { id: "ped", name: "Pediatrician" },
  { id: "ophth", name: "Ophthalmologist" },
  { id: "ent", name: "ENT Specialist" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

export const AppointmentScheduling = () => {
  const [appointmentType, setAppointmentType] = useState<string>("new");
  const [specialty, setSpecialty] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [step, setStep] = useState(1);
  const [confirmationDetails, setConfirmationDetails] = useState<{
    specialty: string;
    date: Date;
    time: string;
    reason: string;
  } | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    // Don't allow past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date && date >= today) {
      setDate(date);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!specialty) {
        toast.error("Please select a specialty");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!date) {
        toast.error("Please select a date");
        return;
      }
      if (!time) {
        toast.error("Please select a time");
        return;
      }
      setStep(3);
    }
  };

  const handleSchedule = () => {
    if (!specialty || !date || !time) {
      toast.error("Please complete all required fields");
      return;
    }
    
    setConfirmationDetails({
      specialty,
      date,
      time,
      reason
    });
    
    toast.success("Appointment request submitted!");
  };

  const resetForm = () => {
    setStep(1);
    setSpecialty("");
    setDate(undefined);
    setTime("");
    setReason("");
    setConfirmationDetails(null);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <CalendarDays className="h-5 w-5 text-indigo-500" />
        <CardTitle>Appointment Scheduling</CardTitle>
      </CardHeader>
      <CardContent>
        {!confirmationDetails ? (
          <div>
            <div className="flex items-center mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === i ? "bg-primary text-primary-foreground" : 
                    step > i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {i}
                  </div>
                  {i < 3 && (
                    <div className={`h-1 w-10 ${
                      step > i ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Appointment Type</Label>
                  <RadioGroup 
                    value={appointmentType} 
                    onValueChange={setAppointmentType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">New Patient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="followup" id="followup" />
                      <Label htmlFor="followup">Follow-up</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Specialty</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((spec) => (
                        <SelectItem key={spec.id} value={spec.id}>
                          {spec.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleNext} className="w-full">
                  Next: Select Date & Time
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          
                          // Disable past dates
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Select Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next: Appointment Details
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Reason for Visit</Label>
                  <Input
                    placeholder="Brief description of your symptoms or reason for visit"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Appointment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Type:</span> {appointmentType === "new" ? "New Patient" : "Follow-up"}</p>
                    <p>
                      <span className="font-medium">Provider:</span> {
                        specialties.find(s => s.id === specialty)?.name || "Not selected"
                      }
                    </p>
                    <p><span className="font-medium">Date:</span> {date ? format(date, "PPP") : "Not selected"}</p>
                    <p><span className="font-medium">Time:</span> {time || "Not selected"}</p>
                  </div>
                </div>
                
                <div className="text-sm bg-primary/10 p-3 rounded-md">
                  <p>
                    This is a request for an appointment. You will receive confirmation via email once your appointment is scheduled.
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSchedule}>
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center dark:bg-green-950/20 dark:border-green-900">
              <h3 className="text-xl font-medium text-green-700 dark:text-green-300 mb-2">
                Appointment Request Submitted
              </h3>
              <p className="mb-6 text-green-600 dark:text-green-400">
                A confirmation email will be sent to you shortly.
              </p>
              
              <div className="bg-white dark:bg-background p-4 rounded-md text-left max-w-md mx-auto mb-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Provider:</span> {
                      specialties.find(s => s.id === confirmationDetails.specialty)?.name
                    }
                  </p>
                  <p><span className="font-medium">Date:</span> {format(confirmationDetails.date, "PPP")}</p>
                  <p><span className="font-medium">Time:</span> {confirmationDetails.time}</p>
                  {confirmationDetails.reason && (
                    <p><span className="font-medium">Reason:</span> {confirmationDetails.reason}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Button onClick={resetForm} className="w-full">
              Schedule Another Appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduling;
