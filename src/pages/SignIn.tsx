
import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">MediChat</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
