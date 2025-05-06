
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ambulance } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Emergency scenarios
const emergencyScenarios = [
  {
    id: "chest-pain",
    title: "Chest Pain",
    symptoms: "Pressure, tightness, or squeezing in the chest that may spread to the jaw, neck, arms, or back. May include shortness of breath, nausea, or cold sweat.",
    actions: [
      "Call 911 immediately",
      "Sit or lie down in a comfortable position",
      "Take aspirin if available and not allergic",
      "Loosen tight clothing"
    ]
  },
  {
    id: "stroke",
    title: "Signs of Stroke",
    symptoms: "Sudden numbness or weakness in the face, arm, or leg (especially on one side); sudden confusion, trouble speaking or understanding; sudden trouble seeing; sudden severe headache.",
    actions: [
      "Call 911 immediately",
      "Note the time symptoms began",
      "Check FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911",
      "Do not give medication, food, or drinks"
    ]
  },
  {
    id: "allergic-reaction",
    title: "Severe Allergic Reaction",
    symptoms: "Hives, swelling of face/throat, difficulty breathing, rapid heartbeat, dizziness, nausea, or vomiting after exposure to an allergen.",
    actions: [
      "Call 911 immediately",
      "Use an epinephrine autoinjector (EpiPen) if available",
      "Lie quietly on back with legs elevated",
      "Do not eat or drink anything"
    ]
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    symptoms: "Heavy or uncontrolled bleeding from a wound.",
    actions: [
      "Call 911 immediately",
      "Apply direct pressure to the wound with a clean cloth or bandage",
      "If possible, elevate the injured area above the heart",
      "Do not remove embedded objects from wounds",
      "Apply a tourniquet only as a last resort if bleeding cannot be controlled"
    ]
  },
];

export const EmergencyResponse = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2 bg-red-50 dark:bg-red-950/50">
        <Ambulance className="h-5 w-5 text-red-500" />
        <CardTitle className="text-red-700 dark:text-red-300">Emergency Response</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-sm bg-red-50 text-red-700 p-3 rounded-md mb-4 dark:bg-red-950/50 dark:text-red-300">
          <p className="font-medium">
            If you are experiencing a medical emergency, call 911 or your local emergency number immediately.
          </p>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Emergency Guidance</h3>
        
        <RadioGroup value={selected || ""} onValueChange={setSelected}>
          <div className="space-y-2">
            {emergencyScenarios.map((scenario) => (
              <div key={scenario.id} className="flex items-start space-x-2">
                <RadioGroupItem value={scenario.id} id={scenario.id} className="mt-1" />
                <Label htmlFor={scenario.id} className="font-medium cursor-pointer">
                  {scenario.title}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        {selected && (
          <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-950/20 dark:border-red-800">
            <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">
              {emergencyScenarios.find(s => s.id === selected)?.title}
            </h4>
            
            <p className="mb-3 text-sm">
              <span className="font-medium">Symptoms: </span>
              {emergencyScenarios.find(s => s.id === selected)?.symptoms}
            </p>
            
            <div className="mb-3">
              <h5 className="font-medium text-sm mb-1">Take these actions immediately:</h5>
              <ol className="list-decimal pl-5 text-sm">
                {emergencyScenarios.find(s => s.id === selected)?.actions.map((action, i) => (
                  <li key={i} className="mb-1">{action}</li>
                ))}
              </ol>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                const phoneLink = document.createElement('a');
                phoneLink.href = 'tel:911';
                phoneLink.click();
              }}
            >
              Call 911 Now
            </Button>
          </div>
        )}
        
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="cpr">
            <AccordionTrigger className="text-red-700 dark:text-red-300">
              Basic CPR Instructions
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li><strong>Check responsiveness:</strong> Tap the person and shout "Are you OK?"</li>
                <li><strong>Call for help:</strong> Call 911 or ask someone else to call.</li>
                <li><strong>Check breathing:</strong> Look, listen, and feel for breathing.</li>
                <li><strong>Begin CPR:</strong> Place the heel of your hand on the center of the chest, place your other hand on top, and interlock your fingers.</li>
                <li><strong>Perform compressions:</strong> Push down hard and fast (about 2 inches deep at a rate of 100-120 compressions per minute).</li>
                <li><strong>Allow chest to return:</strong> Let the chest fully recoil between compressions.</li>
                <li><strong>Continue until help arrives:</strong> Do not stop unless the person starts breathing or professional help takes over.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default EmergencyResponse;
