
// This component is quite large, so we'll update only the key parts
// adding animation and interactivity features
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import ApiKeyInput from "./ApiKeyInput";
import { sendMessageToGemini } from "@/services/geminiService";
import { Send, Mic, StopCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if API key is saved in localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    // Set welcome message
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm your medical assistant. How can I help you today?",
        timestamp: new Date()
      }
    ]);

    // Load chat history if user is authenticated
    if (user) {
      loadChatHistory();
    }

    // Set up speech recognition if available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInputMessage(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      setSpeechRecognition(recognition);
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(20);
      
      if (error) {
        console.error('Error loading chat history:', error);
        return;
      }
      
      if (data && data.length > 0) {
        const loadedMessages: Message[] = [];
        
        data.forEach(item => {
          // Add user message
          loadedMessages.push({
            id: item.id,
            role: 'user',
            content: item.message,
            timestamp: new Date(item.created_at)
          });
          
          // Add assistant response
          loadedMessages.push({
            id: item.id,
            role: 'assistant',
            content: item.response,
            timestamp: new Date(item.created_at)
          });
        });
        
        setMessages(prev => [prev[0], ...loadedMessages]); // Keep welcome message
      }
    } catch (error) {
      console.error('Error in loadChatHistory:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveChatToHistory = async (message: string, response: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          message: message,
          response: response,
        });
        
      if (error) {
        console.error('Error saving chat history:', error);
      }
    } catch (error) {
      console.error('Error in saveChatToHistory:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!apiKey) {
      toast.error("API key required", {
        description: "Please add your Gemini API key to use the chat feature."
      });
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Call the Gemini API
      const response = await sendMessageToGemini(apiKey, inputMessage);
      
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save to chat history if user is authenticated
      if (user) {
        saveChatToHistory(inputMessage, response);
      }

    } catch (error: any) {
      console.error("Error sending message:", error);
      
      setError(
        "I'm having trouble connecting to the AI service. This could be due to an invalid API key or a temporary service outage. Please check your API key and try again."
      );
      
      // Also show a toast for immediate feedback
      toast.error("Error connecting to AI service", {
        description: "Please check your API key or try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeApiKey = () => {
    localStorage.removeItem("gemini-api-key");
    setApiKey(null);
  };
  
  const toggleSpeechRecognition = () => {
    if (!speechRecognition) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }
    
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      speechRecognition.start();
      setIsListening(true);
      toast.info("Listening...", {
        description: "Speak clearly into your microphone"
      });
    }
  };

  if (!apiKey) {
    return <ApiKeyInput onApiKeySubmit={setApiKey} />;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle>Medical Assistant</CardTitle>
        <CardDescription>
          Ask questions about symptoms, treatments, and general health information
        </CardDescription>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleChangeApiKey}
          className="absolute top-4 right-4"
        >
          Change API Key
        </Button>
      </CardHeader>
      <CardContent className="p-4 h-[500px] overflow-y-auto">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "assistant" ? "" : "flex-row-reverse"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={null} />
                      <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  )}

                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`rounded-lg p-3 ${
                      message.role === "assistant"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.timestamp && (
                      <div
                        className={`text-xs mt-1 ${
                          message.role === "assistant"
                            ? "text-muted-foreground"
                            : "text-primary-foreground/70"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="h-2 w-2 rounded-full bg-current"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <motion.div 
                      className="h-2 w-2 rounded-full bg-current"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    />
                    <motion.div 
                      className="h-2 w-2 rounded-full bg-current"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          {speechRecognition && (
            <Button 
              type="button" 
              variant="secondary" 
              size="icon"
              onClick={toggleSpeechRecognition}
              className={isListening ? "bg-red-500 hover:bg-red-600 text-white" : ""}
            >
              {isListening ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChatInterface;
