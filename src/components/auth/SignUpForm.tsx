
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function SignUpForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Guest access enabled",
      description: "All features are now available without signing in.",
    });
    navigate("/health-metrics");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome to MediChat</CardTitle>
        <CardDescription>All features are now available without signing in</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Authentication has been removed for easier access.
            You can use all features as a guest user.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full">
            Continue as Guest
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Click the button above to access all features
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
