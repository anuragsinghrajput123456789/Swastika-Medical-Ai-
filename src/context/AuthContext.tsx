
import { createContext, useContext, ReactNode } from 'react';

// Simplified AuthContextType without auth functionality
interface AuthContextType {
  user: any; // Using any type for compatibility with existing code
  profile: any;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: { id: 'guest', email: 'guest@example.com' },
  profile: { full_name: 'Guest User' },
  isLoading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Provide default user and profile data without authentication
  const value = {
    user: { id: 'guest', email: 'guest@example.com' }, 
    profile: { full_name: 'Guest User' },
    isLoading: false,
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
