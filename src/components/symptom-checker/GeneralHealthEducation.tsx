
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, GraduationCap, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const GeneralHealthEducation = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <GraduationCap className="h-5 w-5 text-blue-500" />
        <CardTitle>General Health Education & Safety</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basics">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">Health Basics</TabsTrigger>
            <TabsTrigger value="safety">Safety Precautions</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Knowledge</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="pt-4">
            <div className="space-y-4">
              <div className="bg-primary/10 p-3 rounded-md mb-4">
                <h3 className="font-medium mb-1">Wellness Foundations</h3>
                <p className="text-sm">
                  These are fundamental aspects of maintaining good health that everyone should know and practice.
                </p>
              </div>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="nutrition">
                  <AccordionTrigger>Nutrition Basics</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Eat a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats.</li>
                      <li>Stay hydrated by drinking about 8 cups (64 oz) of water daily.</li>
                      <li>Limit added sugars, saturated fats, and excessive sodium.</li>
                      <li>Practice portion control and mindful eating.</li>
                      <li>Aim for 3 balanced meals daily with healthy snacks as needed.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="exercise">
                  <AccordionTrigger>Physical Activity</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity weekly.</li>
                      <li>Include strength training exercises at least twice a week.</li>
                      <li>Take frequent movement breaks if you sit for extended periods.</li>
                      <li>Find activities you enjoy to make exercise sustainable.</li>
                      <li>Always warm up before and cool down after exercise.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sleep">
                  <AccordionTrigger>Sleep Hygiene</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Adults need 7-9 hours of quality sleep nightly.</li>
                      <li>Maintain a consistent sleep schedule, even on weekends.</li>
                      <li>Create a sleep-friendly environment: dark, quiet, and cool.</li>
                      <li>Avoid screens, caffeine, and alcohol close to bedtime.</li>
                      <li>Develop a relaxing pre-sleep routine to signal your body it's time to rest.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mental">
                  <AccordionTrigger>Mental Wellbeing</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Practice stress management techniques like deep breathing, meditation, or yoga.</li>
                      <li>Maintain social connections and supportive relationships.</li>
                      <li>Take breaks from news and social media when feeling overwhelmed.</li>
                      <li>Seek professional help if experiencing persistent sadness, anxiety, or mood changes.</li>
                      <li>Make time for hobbies and activities you enjoy.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="safety" className="pt-4">
            <div className="space-y-4">
              <div className="bg-primary/10 p-3 rounded-md mb-4">
                <h3 className="font-medium mb-1">Everyday Safety Precautions</h3>
                <p className="text-sm">
                  These safety measures can help prevent common injuries and health hazards in daily life.
                </p>
              </div>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="home-safety">
                  <AccordionTrigger>Home Safety</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Install smoke and carbon monoxide detectors on every level of your home.</li>
                      <li>Keep a fire extinguisher in accessible locations, especially the kitchen.</li>
                      <li>Store cleaning products and medications in locked cabinets away from children.</li>
                      <li>Prevent falls by securing rugs, improving lighting, and removing clutter from walkways.</li>
                      <li>Have an emergency evacuation plan and practice it with household members.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="food-safety">
                  <AccordionTrigger>Food Safety</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Wash hands thoroughly before and after handling food.</li>
                      <li>Keep raw meat, poultry, seafood, and eggs separate from ready-to-eat foods.</li>
                      <li>Cook foods to proper internal temperatures (use a food thermometer).</li>
                      <li>Refrigerate perishable foods within 2 hours of preparation (1 hour if temperature is above 90°F).</li>
                      <li>Wash fruits and vegetables thoroughly before eating or cooking.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="medication-safety">
                  <AccordionTrigger>Medication Safety</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Always read and follow medication labels and instructions carefully.</li>
                      <li>Keep a current list of all medications, including over-the-counter drugs and supplements.</li>
                      <li>Store medications in their original containers in a cool, dry place.</li>
                      <li>Never share prescription medications with others.</li>
                      <li>Dispose of expired or unused medications properly (many pharmacies offer take-back programs).</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="digital-safety">
                  <AccordionTrigger>Digital Health Safety</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Verify the credibility of online health information sources.</li>
                      <li>Protect your personal health information when using apps or websites.</li>
                      <li>Take regular breaks from screens to prevent eye strain and maintain good posture.</li>
                      <li>Be cautious about online health challenges or trends without consulting healthcare professionals.</li>
                      <li>Use secure platforms when sharing health information or consulting healthcare providers online.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="emergency" className="pt-4">
            <div className="space-y-4">
              <div className="bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300 p-3 rounded-md mb-4">
                <h3 className="font-medium mb-1">Essential Emergency Knowledge</h3>
                <p className="text-sm">
                  Everyone should know these basics for handling emergency situations.
                </p>
              </div>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="recognize-emergency">
                  <AccordionTrigger>Recognizing Emergencies</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <p className="mb-2">Learn to recognize these warning signs that may indicate a medical emergency:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Difficulty breathing or shortness of breath</li>
                      <li>Chest or upper abdominal pain or pressure</li>
                      <li>Fainting, sudden dizziness, or weakness</li>
                      <li>Sudden changes in vision</li>
                      <li>Confusion or changes in mental status</li>
                      <li>Sudden or severe pain</li>
                      <li>Uncontrolled bleeding</li>
                      <li>Severe or persistent vomiting or diarrhea</li>
                      <li>Suicidal or homicidal feelings</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="first-aid">
                  <AccordionTrigger>Basic First Aid</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <p className="mb-2">Everyone should know these basic first aid skills:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>For bleeding:</strong> Apply direct pressure with clean cloth or bandage</li>
                      <li><strong>For burns:</strong> Cool with running water for 10-15 minutes, don't apply ice or butter</li>
                      <li><strong>For choking:</strong> Perform the Heimlich maneuver (abdominal thrusts)</li>
                      <li><strong>For suspected fracture:</strong> Immobilize the area, apply ice to reduce swelling</li>
                      <li><strong>For allergic reaction:</strong> Administer epinephrine if available and person has known severe allergies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="emergency-contacts">
                  <AccordionTrigger>Emergency Contacts & Planning</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Know emergency service numbers in your area (911 in the US)</li>
                      <li>Keep a list of emergency contacts readily available</li>
                      <li>Have your medical information (including allergies, medications, and conditions) easily accessible</li>
                      <li>Create an emergency communication plan with family members</li>
                      <li>Know locations of nearest emergency rooms and urgent care centers</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cpr-basics">
                  <AccordionTrigger>CPR Awareness</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <p className="mb-2">While formal training is recommended, knowing these CPR basics could save a life:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Check if the person is responsive and breathing normally</li>
                      <li>If not, call emergency services immediately</li>
                      <li>Begin chest compressions: push hard and fast in the center of the chest (at least 100-120 compressions per minute)</li>
                      <li>Allow the chest to fully recoil between compressions</li>
                      <li>Continue until help arrives or the person shows signs of life</li>
                      <li>If trained, provide rescue breaths between sets of compressions</li>
                    </ol>
                    <p className="mt-2 text-xs font-medium">Note: This is basic awareness information. Consider taking a certified CPR course for proper training.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-sm bg-primary/10 p-3 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4" />
            <p className="font-medium">
              Important Note
            </p>
          </div>
          <p>
            This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralHealthEducation;
