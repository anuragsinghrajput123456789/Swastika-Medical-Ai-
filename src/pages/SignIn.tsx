
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const SignIn = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate("/health-metrics");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8">MediChat</h1>
        <SignInForm />
      </motion.div>
    </div>
  );
};

export default SignIn;
