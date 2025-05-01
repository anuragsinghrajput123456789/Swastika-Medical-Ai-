
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "./ui/sonner";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Save to localStorage for persistence during the session
    localStorage.setItem("gemini-api-key", apiKey);
    onApiKeySubmit(apiKey);
    toast.success("API key saved successfully!");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Gemini API Setup</CardTitle>
        <CardDescription>
          Enter your Gemini API key to enable the chat functionality.
          You can get a key from{" "}
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Google AI Studio
          </a>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-20"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? "Hide" : "Show"}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save API Key
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApiKeyInput;
