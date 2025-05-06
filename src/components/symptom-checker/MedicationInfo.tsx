
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { medicationsDatabase, MedicationInfo as MedicationInfoType } from "@/utils/healthUtils";

export const MedicationInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medication, setMedication] = useState<MedicationInfoType | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const found = Object.values(medicationsDatabase).find(
      med => med.name.toLowerCase().includes(normalizedSearch)
    );
    
    if (found) {
      setMedication(found);
      setNotFound(false);
    } else {
      setMedication(null);
      setNotFound(true);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Pill className="h-5 w-5 text-blue-500" />
        <CardTitle>Medication Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Search medication (e.g., Tylenol, Ibuprofen)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {medication ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{medication.name}</h3>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Usage</h4>
              <p>{medication.usage}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Recommended Dosage</h4>
              <p>{medication.dosage}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Side Effects</h4>
              <ul className="list-disc pl-5">
                {medication.sideEffects.map((effect, i) => (
                  <li key={i}>{effect}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 dark:bg-amber-950 dark:border-amber-900">
              <h4 className="font-medium text-amber-800 mb-1 dark:text-amber-400">Warnings</h4>
              <ul className="list-disc pl-5 text-amber-700 dark:text-amber-300">
                {medication.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
            
            <div className="text-sm bg-primary/10 p-3 rounded-md">
              <p className="font-medium">Note: This information is for general reference only and not a substitute for professional medical advice.</p>
            </div>
          </div>
        ) : notFound ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No medication found matching "{searchTerm}".</p>
            <p className="text-sm mt-2">Try searching for common medications like "Tylenol", "Advil", or "Claritin".</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Search for a medication to view information.</p>
            <p className="text-sm mt-2">Examples: Acetaminophen, Ibuprofen, Amoxicillin, Loratadine</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicationInfo;
