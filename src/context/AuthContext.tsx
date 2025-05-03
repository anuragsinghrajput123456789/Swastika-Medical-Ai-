
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any, user: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    isLoading: true,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(state => ({ ...state, session, user: session?.user || null }));
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setAuthState(state => ({ ...state, isLoading: false }));
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState(state => ({ ...state, session, user: session?.user || null }));
        
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setAuthState(state => ({ ...state, profile: null, isLoading: false }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive"
      });
    }

    setAuthState(state => ({ 
      ...state, 
      profile: data || null,
      isLoading: false
    }));
  }

  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        }
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
        return { error, user: null };
      }

      toast({
        title: "Sign up successful",
        description: "Welcome to MediChat!",
      });

      return { error: null, user: data.user };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, user: null };
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  }

  async function updateProfile(updates: any) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authState.user?.id);

      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Profile updated successfully",
      });

      // Refresh profile data
      if (authState.user) {
        await fetchProfile(authState.user.id);
      }

      return { error: null };
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return { error };
    }
  }

  const value = {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateProfile,
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
