
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserMenu() {
  // Simplified user menu without authentication
  return (
    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
      <Avatar>
        <AvatarFallback>G</AvatarFallback>
      </Avatar>
    </Button>
  );
}
