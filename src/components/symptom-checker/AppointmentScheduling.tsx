import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { CalendarDays, Clock, UserPlus, CheckCircle2 } from "lucide-react";
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
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export const AppointmentScheduling = () => {
  const [appointmentType, setAppointmentType] = useState("new");
  const [specialty, setSpecialty] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  const handleDateSelect = (date) => {
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
      reason,
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
    <Card className="mb-6 shadow-lg border-none bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
      <CardHeader className="flex flex-row items-center space-x-2 pb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-xl px-6 py-4">
        <CalendarDays className="h-6 w-6 animate-pulse" />
        <CardTitle className="text-xl font-bold">Schedule an Appointment</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {!confirmationDetails ? (
          <div className="space-y-6 animate-fade-in">
            {/* Progress Indicator */}
            <div className="flex justify-between items-center mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      step === i
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                        : step > i
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    } transition-all duration-300 transform ${
                      step === i ? "scale-110" : ""
                    }`}
                  >
                    {step > i ? <CheckCircle2 /> : i}
                  </div>
                  <span className="mt-2 text-sm font-medium">{["Select Specialty", "Pick Time", "Confirm"][i - 1]}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Choose Specialty */}
            {step === 1 && (
              <div className="space-y-6 animate-slide-left">
                <div className="space-y-2">
                  <Label className="font-medium">Appointment Type</Label>
                  <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new" className="flex items-center gap-1">
                        <UserPlus size={16} /> New Patient
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="followup" id="followup" />
                      <Label htmlFor="followup" className="flex items-center gap-1">
                        <Clock size={16} /> Follow-up
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Specialty</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600">
                      <SelectValue placeholder="Choose a specialist..." />
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

                <Button
                  onClick={handleNext}
                  className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:shadow-lg hover:scale-105"
                >
                  Next: Pick Date & Time
                </Button>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div className="space-y-6 animate-slide-left">
                <div className="space-y-2">
                  <Label className="font-medium">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {date ? format(date, "PPP") : "Pick a date"}
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
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Select Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="border border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Choose a time slot" />
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

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Next: Confirm Details</Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm Details */}
            {step === 3 && (
              <div className="space-y-6 animate-slide-left">
                <div className="space-y-2">
                  <Label className="font-medium">Reason for Visit</Label>
                  <Input
                    placeholder="Brief description of your symptoms or reason for visit"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Appointment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Type:</span>{" "}
                      {appointmentType === "new" ? "New Patient" : "Follow-up"}
                    </p>
                    <p>
                      <span className="font-medium">Provider:</span>{" "}
                      {specialties.find((s) => s.id === specialty)?.name || "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {date ? format(date, "PPP") : "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {time || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="text-sm bg-primary/10 p-3 rounded-md">
                  <p>This is a request for an appointment. You will receive confirmation via email once your appointment is scheduled.</p>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSchedule}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-medium text-green-700 dark:text-green-300 mb-2">
                Appointment Request Submitted
              </h3>
              <p className="mb-6 text-green-600 dark:text-green-400">
                A confirmation email will be sent to you shortly.
              </p>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-left max-w-md mx-auto mb-4 shadow-sm">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Provider:</span>{" "}
                    {specialties.find((s) => s.id === confirmationDetails.specialty)?.name}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {format(confirmationDetails.date, "PPP")}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {confirmationDetails.time}
                  </p>
                  {confirmationDetails.reason && (
                    <p>
                      <span className="font-medium">Reason:</span> {confirmationDetails.reason}
                    </p>
                  )}
                </div>
              </div>
            </div>
-
            <Button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              Schedule Another Appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduling;