
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity } from "lucide-react";
import { getLifestyleAdvice } from "@/utils/healthUtils";

// Common health conditions for demonstration
const commonConditions = [
  "Common Cold",
  "Flu",
  "Hypertension",
  "Diabetes",
  "Anxiety",
  "Depression",
  "Insomnia",
  "Acid Reflux",
  "Migraine",
  "Back Pain",
  "Allergies",
  "COVID-19"
];

export const LifestyleTips = () => {
  const [condition, setCondition] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGetTips = () => {
    if (!condition.trim()) return;
    
    const advice = getLifestyleAdvice(condition);
    setTips(advice);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCondition(suggestion);
    const advice = getLifestyleAdvice(suggestion);
    setTips(advice);
    setShowSuggestions(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Activity className="h-5 w-5 text-green-500" />
        <CardTitle>Lifestyle & Diet Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Get personalized lifestyle and diet recommendations based on your health condition.
        </p>
        
        <div className="relative mb-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter a health condition (e.g., Diabetes)"
              value={condition}
              onChange={(e) => {
                setCondition(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGetTips();
                }
              }}
            />
            <Button onClick={handleGetTips}>Get Tips</Button>
          </div>
          
          {showSuggestions && (
            <div className="absolute z-10 w-[calc(100%-5.5rem)] mt-1 bg-background border rounded-md shadow-md max-h-60 overflow-y-auto">
              {commonConditions
                .filter(c => 
                  c.toLowerCase().includes(condition.toLowerCase()) && 
                  condition.trim() !== ""
                )
                .map((suggestion, i) => (
                  <div 
                    key={i}
                    className="px-3 py-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
            </div>
          )}
        </div>
        
        {tips.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Recommendations for {condition}</h3>
            
            <div className="bg-green-50 p-4 rounded-md border border-green-100 dark:bg-green-950/20 dark:border-green-900">
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Lifestyle & Diet Tips</h4>
              <ul className="list-disc pl-5 space-y-2 text-green-700 dark:text-green-300">
                {tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="text-sm bg-primary/10 p-3 rounded-md">
              <p className="font-medium">
                Note: These are general recommendations. It's best to consult with a healthcare provider for personalized advice.
              </p>
            </div>
          </div>
        )}
        
        {!tips.length && !showSuggestions && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Enter a health condition to receive lifestyle and diet recommendations.</p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {commonConditions.slice(0, 5).map((condition, i) => (
                <Button 
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(condition)}
                >
                  {condition}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LifestyleTips;
