
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Mic, Send, User } from "lucide-react";

// Mock data for initial messages
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your medical assistant. How can I help you today?",
    timestamp: new Date(),
  },
];

// Mock function for future integration with Speech API
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // This would be replaced with actual Web Speech API implementation
  const startListening = () => {
    setIsListening(true);
    // Mock recording for 3 seconds
    setTimeout(() => {
      setTranscript("I have a headache and feel dizzy");
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return { transcript, isListening, startListening, stopListening, setTranscript };
};

const ChatInterface = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { transcript, isListening, startListening, stopListening, setTranscript } = useSpeechRecognition();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Mock AI response function (to be replaced with actual Gemini API integration)
  const getMockAIResponse = (message: string) => {
    // Simple keyword matching for demo purposes
    if (message.toLowerCase().includes("headache")) {
      return "Based on your symptoms, you may be experiencing a tension headache or migraine. Make sure you're hydrated and consider taking a break from screens. If the pain persists or worsens, please consult with a healthcare provider.";
    } else if (message.toLowerCase().includes("fever")) {
      return "Fever can be a sign of infection. Monitor your temperature and stay hydrated. If your temperature exceeds 103°F (39.4°C) or persists for more than 3 days, please seek medical attention.";
    } else {
      return "Thank you for sharing that information. To provide better guidance, could you please share more specific symptoms or health concerns?";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Add assistant response
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: getMockAIResponse(input),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);

    // Clear transcript
    setTranscript("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="container flex-1 overflow-y-auto py-4">
        {/* Chat messages */}
        <div className="space-y-4 px-4 md:px-6 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                className={`max-w-[80%] md:max-w-[70%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  {message.role === "assistant" && (
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        🩺
                      </div>
                      <span className="text-sm font-medium">MediChat</span>
                    </div>
                  )}
                  {message.role === "user" && (
                    <div className="mb-2 flex items-center justify-end">
                      <span className="text-sm font-medium">You</span>
                      <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div
                    className={`mt-2 text-xs ${
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      🩺
                    </div>
                    <span className="text-sm font-medium">MediChat</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Chat input */}
      <div className="border-t bg-background p-4">
        <div className="container flex items-end gap-2">
          <Button
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={isListening ? stopListening : startListening}
            className="flex-shrink-0"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question..."
              className="min-h-[60px] pr-12 resize-none"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="absolute bottom-2 right-2"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
