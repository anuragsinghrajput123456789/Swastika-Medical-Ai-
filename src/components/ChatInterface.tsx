import React, { useState, useRef, useEffect } from "react";
import {
  FaHeartbeat,
  FaCapsules,
  FaUserMd,
  FaStethoscope,
} from "react-icons/fa";
import { IoSend, IoSparklesSharp } from "react-icons/io5";
import { TbVaccine } from "react-icons/tb";
import { GiBodyBalance } from "react-icons/gi";
import { GoogleGenAI } from "@google/genai";

const MedicalChatInterface = () => {
  const [message, setMessage] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCQ0hm-7AiEGcVI0LeqVoKZB0-q7viWk90",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const hitRequest = () => {
    if (message.trim()) {
      generateResponse(message);
    } else {
      alert("Please enter a symptom or question...");
    }
  };

  async function generateResponse(msg) {
    const userMessage = { type: "user", text: msg };
    const typingIndicator = {
      type: "bot",
      text: "Thinking...",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, typingIndicator]);
    setMessage("");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: msg,
      });

      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({ type: "bot", text: response.text })
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({
            type: "bot",
            text: "Oops! Something went wrong. Please try again.",
          })
      );
    }

    setIsResponse(true);
  }

  // Example Medical Questions
  const quickQuestions = [
    {
      icon: <FaStethoscope className="text-blue-500 text-2xl" />,
      text: "I have chest pain. What should I do?",
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-2xl" />,
      text: "My heart is racing. Is this serious?",
    },
    {
      icon: <TbVaccine className="text-green-500 text-2xl" />,
      text: "When should I get my next vaccine shot?",
    },
    {
      icon: <GiBodyBalance className="text-purple-500 text-2xl" />,
      text: "How can I improve my mental health?",
    },
    {
      icon: <FaCapsules className="text-yellow-500 text-2xl" />,
      text: "What medications are safe during pregnancy?",
    },
    {
      icon: <FaUserMd className="text-pink-500 text-2xl" />,
      text: "Should I see a specialist for my back pain?",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gray-700 shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <IoSparklesSharp className="animate-pulse" />
          Swastha-AI Assistant
        </h1>
        <button
          onClick={() => {
            setMessages([]);
            setIsResponse(false);
          }}
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
        >
          New Chat
        </button>
      </header>

      {/* Main Content */}
      {!isResponse ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-5xl font-extrabold mb-10 text-center">
            Swastha-AI
          </h1>
          <p className="text-lg text-center max-w-xl mb-12 text-gray-300">
            Ask any medical question or describe your symptoms. Our AI will help
            you understand your condition.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl animate-fadeIn">
            {quickQuestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setMessage(item.text);
                  setTimeout(hitRequest, 100);
                }}
                className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-blue-500/30 cursor-pointer transition-all duration-300 transform hover:scale-105 flex items-start gap-3 border border-gray-700"
              >
                <div>{item.icon}</div>
                <p className="text-sm md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-3xl mx-auto p-4 rounded-lg transition-opacity duration-300 ${
                msg.type === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-gray-800 mr-auto"
              }`}
            >
              {msg.isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-300"></span>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
      )}

      {/* Input Box */}
     
    </div>
  );
};

export default MedicalChatInterface;
