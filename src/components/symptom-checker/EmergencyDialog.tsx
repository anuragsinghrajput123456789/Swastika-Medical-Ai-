
import * as React from "react";
import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";

interface EmergencyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmergencyDialog = ({
  open,
  onOpenChange
}: EmergencyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">Seek Immediate Medical Attention</DialogTitle>
          <DialogDescription>
            The combination of chest pain and shortness of breath could indicate a serious medical emergency.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <p className="font-medium">Please: </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Call emergency services (911) immediately</li>
            <li>Do not drive yourself to the hospital</li>
            <li>Stay calm and sit or lie down while waiting for help</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyDialog;
