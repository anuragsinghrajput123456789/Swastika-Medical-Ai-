
import { createContext, useContext, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: null;
  profile: null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Provide a minimal context with no authentication functionality
  const value = {
    user: null,
    profile: null,
    isLoading: false,
    signIn: async () => {
      toast({
        title: 'Authentication disabled',
        description: 'User authentication has been removed from this application.',
      });
    },
    signUp: async () => {
      toast({
        title: 'Authentication disabled',
        description: 'User authentication has been removed from this application.',
      });
    },
    signOut: async () => {
      toast({
        title: 'Authentication disabled',
        description: 'User authentication has been removed from this application.',
      });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
