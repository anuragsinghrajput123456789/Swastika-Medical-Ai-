
import { useNavigate } from "react-router-dom";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">MediChat</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
