
import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: null;
  profile: null;
  isLoading: false;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = {
    user: null,
    profile: null,
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
