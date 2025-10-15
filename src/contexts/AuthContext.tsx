import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, Profile, profilesApi } from '../utils/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  testMode: boolean;
  toggleTestAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded test user data
const TEST_USER = {
  id: 'test-user-123',
  email: 'test@alkabir.ae',
  user_metadata: {
    full_name: 'Ahmed Al-Mansoori'
  },
  created_at: new Date().toISOString(),
  aud: 'authenticated',
  role: 'authenticated'
} as User;

const TEST_PROFILE: Profile = {
  id: 'test-user-123',
  email: 'test@alkabir.ae',
  full_name: 'Ahmed Al-Mansoori',
  phone: '+971 50 123 4567',
  address: 'Dubai Marina, Marina Plaza',
  city: 'Dubai',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const TEST_SESSION = {
  access_token: 'test-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'test-refresh',
  user: TEST_USER
} as Session;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [testMode, setTestMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If test mode is enabled, use hardcoded auth
    if (testMode) {
      setUser(TEST_USER);
      setProfile(TEST_PROFILE);
      setSession(TEST_SESSION);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [testMode]);

  const loadProfile = async (userId: string) => {
    try {
      const profileData = await profilesApi.get(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      // Create a basic profile from user data
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          phone: null,
          address: null,
          city: 'Dubai',
          avatar_url: null,
          created_at: user.created_at,
          updated_at: user.created_at,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast.success('Account created successfully!', {
        description: 'Welcome to AL-Kabir. You can now book our services.',
      });
    } catch (error) {
      const authError = error as AuthError;
      toast.error('Sign up failed', {
        description: authError.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Welcome back!', {
        description: 'You have successfully signed in.',
      });
    } catch (error) {
      const authError = error as AuthError;
      toast.error('Sign in failed', {
        description: authError.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success('Signed out successfully');
    } catch (error) {
      const authError = error as AuthError;
      toast.error('Sign out failed', {
        description: authError.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    // In test mode, just update local state
    if (testMode) {
      setProfile({ ...TEST_PROFILE, ...updates });
      toast.success('Profile updated successfully (Test Mode)');
      return;
    }

    try {
      setLoading(true);
      const updatedProfile = await profilesApi.update(user.id, updates);
      setProfile(updatedProfile);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleTestAuth = () => {
    setTestMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        // Signing in with test account
        setUser(TEST_USER);
        setProfile(TEST_PROFILE);
        setSession(TEST_SESSION);
        toast.success('Test Mode Enabled', {
          description: 'Signed in as Ahmed Al-Mansoori',
        });
      } else {
        // Signing out of test account
        setUser(null);
        setProfile(null);
        setSession(null);
        toast.info('Test Mode Disabled', {
          description: 'Using real authentication',
        });
      }
      return newMode;
    });
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    testMode,
    toggleTestAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
