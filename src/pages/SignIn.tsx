
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SignIn = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to home page since authentication is removed
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Authentication Removed</CardTitle>
            <CardDescription>User authentication has been removed from this application.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You will be redirected to the home page.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/")} className="w-full">
              Go to Home Page
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;
