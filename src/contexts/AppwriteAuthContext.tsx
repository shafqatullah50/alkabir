import React, {createContext, useContext, useEffect, ReactNode} from "react";
import {useAuth} from "../hooks/useAuth";
import {AppwriteUser, AppwriteSession, Profile} from "../utils/appwrite/types";

interface AuthContextType {
  // State
  user: AppwriteUser | null;
  session: AppwriteSession | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  testMode: boolean;

  // Computed state
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isMfaEnabled: boolean;
  isProfessional: boolean;
  isVerified: boolean;

  // Actions
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<AppwriteUser>;
  signIn: (email: string, password: string) => Promise<AppwriteSession>;
  signInWithOAuth: (
    provider: string,
    successUrl?: string,
    failureUrl?: string
  ) => void;
  signInWithMagicURL: (email: string, url: string) => Promise<any>;
  signInWithPhone: (phone: string) => Promise<any>;
  signOut: () => Promise<void>;
  signOutAll: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  updatePassword: (
    newPassword: string,
    oldPassword?: string
  ) => Promise<AppwriteUser>;
  updateEmail: (email: string, password: string) => Promise<AppwriteUser>;
  updatePhone: (phone: string, password: string) => Promise<AppwriteUser>;
  updateName: (name: string) => Promise<AppwriteUser>;
  updatePreferences: (prefs: Record<string, any>) => Promise<AppwriteUser>;
  sendEmailVerification: (url: string) => Promise<any>;
  confirmEmailVerification: (userId: string, secret: string) => Promise<any>;
  sendPhoneVerification: () => Promise<any>;
  confirmPhoneVerification: (userId: string, secret: string) => Promise<any>;
  sendPasswordRecovery: (email: string, url: string) => Promise<any>;
  confirmPasswordRecovery: (
    userId: string,
    secret: string,
    password: string
  ) => Promise<any>;
  createJWT: () => Promise<any>;
  toggleTestMode: () => void;
}

const AppwriteAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider using Zustand store with Appwrite integration
 * This replaces the Supabase-based AuthProvider
 */
export function AppwriteAuthProvider({children}: AuthProviderProps) {
  const auth = useAuth();

  // Initialize authentication on mount
  useEffect(() => {
    auth.initialize();
  }, []);

  const contextValue: AuthContextType = {
    // State
    user: auth.user,
    session: auth.session,
    profile: auth.profile,
    loading: auth.loading,
    initialized: auth.initialized,
    testMode: auth.testMode,

    // Computed state
    isAuthenticated: auth.isAuthenticated,
    isEmailVerified: auth.isEmailVerified,
    isPhoneVerified: auth.isPhoneVerified,
    isMfaEnabled: auth.isMfaEnabled,
    isProfessional: auth.isProfessional,
    isVerified: auth.isVerified,

    // Actions
    signUp: auth.signUp,
    signIn: auth.signIn,
    signInWithOAuth: auth.signInWithOAuth,
    signInWithMagicURL: auth.signInWithMagicURL,
    signInWithPhone: auth.signInWithPhone,
    signOut: auth.signOut,
    signOutAll: auth.signOutAll,
    updateProfile: auth.updateProfile,
    updatePassword: auth.updatePassword,
    updateEmail: auth.updateEmail,
    updatePhone: auth.updatePhone,
    updateName: auth.updateName,
    updatePreferences: auth.updatePreferences,
    sendEmailVerification: auth.sendEmailVerification,
    confirmEmailVerification: auth.confirmEmailVerification,
    sendPhoneVerification: auth.sendPhoneVerification,
    confirmPhoneVerification: auth.confirmPhoneVerification,
    sendPasswordRecovery: auth.sendPasswordRecovery,
    confirmPasswordRecovery: auth.confirmPasswordRecovery,
    createJWT: auth.createJWT,
    toggleTestMode: auth.toggleTestMode,
  };

  return (
    <AppwriteAuthContext.Provider value={contextValue}>
      {children}
    </AppwriteAuthContext.Provider>
  );
}

/**
 * Hook to use the Appwrite Auth context
 * Provides access to all authentication state and methods
 */
export function useAppwriteAuth(): AuthContextType {
  const context = useContext(AppwriteAuthContext);

  if (context === undefined) {
    throw new Error(
      "useAppwriteAuth must be used within an AppwriteAuthProvider"
    );
  }

  return context;
}

/**
 * Higher-order component for protecting routes
 * Redirects to login if user is not authenticated
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const {isAuthenticated, loading, initialized} = useAppwriteAuth();

    if (!initialized || loading) {
      return (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600'></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // You can customize this redirect logic
      window.location.href = "/login";
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * Component for conditionally rendering content based on auth state
 */
export function AuthGuard({
  children,
  fallback,
  requireAuth = true,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
}) {
  const {isAuthenticated, loading, initialized} = useAppwriteAuth();

  if (!initialized || loading) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600'></div>
      </div>
    );
  }

  const shouldRender = requireAuth ? isAuthenticated : !isAuthenticated;

  if (shouldRender) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}

/**
 * Hook for profile management
 */
export function useAppwriteProfile() {
  const {profile, updateProfile, loading, user} = useAppwriteAuth();

  const updateProfileField = async (field: keyof Profile, value: any) => {
    if (!profile) throw new Error("No profile found");

    return updateProfile({[field]: value});
  };

  return {
    profile,
    updateProfile,
    updateProfileField,
    loading,
    userId: user?.$id,
  };
}

export default AppwriteAuthProvider;
