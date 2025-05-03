
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import ApiKeyInput from "./ApiKeyInput";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Check if API key is saved in localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    // Load chat history from Supabase if user is logged in
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedMessages: Message[] = [];
        data.forEach(item => {
          formattedMessages.push({
            id: item.id,
            role: "user",
            content: item.message,
            timestamp: new Date(item.created_at)
          });
          
          formattedMessages.push({
            role: "assistant",
            content: item.response,
            timestamp: new Date(item.created_at)
          });
        });
        
        setMessages(formattedMessages);
      } else {
        // Set welcome message if no history
        setMessages([
          {
            role: "assistant",
            content: "Hello! I'm your medical assistant. How can I help you today?",
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast({
        title: "Error loading chat history",
        description: "Could not load your previous conversations.",
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use the chat feature.",
        variant: "destructive",
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

    try {
      // Format history for the Gemini API
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { message: inputMessage, history },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save the conversation to Supabase
      await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          message: inputMessage,
          response: data.response
        });

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Could not get a response from the assistant.",
        variant: "destructive",
      });

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again later.",
          timestamp: new Date()
        }
      ]);
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

  if (!apiKey && !process.env.GEMINI_API_KEY) {
    return <ApiKeyInput onApiKeySubmit={setApiKey} />;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Medical Assistant</CardTitle>
        <CardDescription>
          Ask questions about symptoms, treatments, and general health information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
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

                <div
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
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
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
          <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
