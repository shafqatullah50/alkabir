import {useEffect} from "react";
import {useAuthStore} from "../stores/authStore";
import {AppwriteUser, AppwriteSession, Profile} from "../utils/appwrite/types";

/**
 * Custom hook for authentication with Appwrite
 * Provides access to auth state and methods
 */
export function useAuth() {
  const {
    // State
    user,
    session,
    profile,
    loading,
    initialized,
    testMode,

    // Actions
    signUp,
    signIn,
    signInWithOAuth,
    signInWithMagicURL,
    signInWithPhone,
    signOut,
    signOutAll,
    getCurrentUser,
    getCurrentSession,
    updateProfile,
    updatePassword,
    updateEmail,
    updatePhone,
    updateName,
    updatePreferences,
    sendEmailVerification,
    confirmEmailVerification,
    sendPhoneVerification,
    confirmPhoneVerification,
    sendPasswordRecovery,
    confirmPasswordRecovery,
    createJWT,
    initialize,
    toggleTestMode,
    setLoading,
    clearError,
  } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // Computed values
  const isAuthenticated = !!user && !!session;
  const isEmailVerified = user?.emailVerification ?? false;
  const isPhoneVerified = user?.phoneVerification ?? false;
  const isMfaEnabled = user?.mfa ?? false;
  const isProfessional = profile?.is_professional ?? false;
  const isVerified = profile?.is_verified ?? false;

  return {
    // State
    user,
    session,
    profile,
    loading,
    initialized,
    testMode,

    // Computed state
    isAuthenticated,
    isEmailVerified,
    isPhoneVerified,
    isMfaEnabled,
    isProfessional,
    isVerified,

    // Actions
    signUp,
    signIn,
    signInWithOAuth,
    signInWithMagicURL,
    signInWithPhone,
    signOut,
    signOutAll,
    getCurrentUser,
    getCurrentSession,
    updateProfile,
    updatePassword,
    updateEmail,
    updatePhone,
    updateName,
    updatePreferences,
    sendEmailVerification,
    confirmEmailVerification,
    sendPhoneVerification,
    confirmPhoneVerification,
    sendPasswordRecovery,
    confirmPasswordRecovery,
    createJWT,
    initialize,
    toggleTestMode,
    setLoading,
    clearError,
  };
}

/**
 * Hook for checking authentication status
 * Returns null while loading, boolean when ready
 */
export function useAuthStatus() {
  const {isAuthenticated, loading, initialized} = useAuth();

  if (!initialized || loading) {
    return null; // Still loading
  }

  return isAuthenticated;
}

/**
 * Hook that ensures user is authenticated
 * Throws error if not authenticated when component mounts
 */
export function useRequireAuth() {
  const {isAuthenticated, loading, initialized} = useAuth();

  useEffect(() => {
    if (initialized && !loading && !isAuthenticated) {
      throw new Error("Authentication required");
    }
  }, [isAuthenticated, loading, initialized]);

  return {isAuthenticated, loading, initialized};
}

/**
 * Hook for user profile management
 */
export function useProfile() {
  const {
    profile,
    updateProfile,
    loading,
    user,
    updateName,
    updateEmail,
    updatePhone,
    updatePreferences,
  } = useAuth();

  // Update profile field helpers
  const updateProfileField = async (field: keyof Profile, value: any) => {
    if (!profile) throw new Error("No profile found");

    return updateProfile({[field]: value});
  };

  const updatePersonalInfo = async (info: {
    full_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    date_of_birth?: string;
    gender?: "male" | "female" | "other";
  }) => {
    return updateProfile(info);
  };

  const updateAccountInfo = async (info: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }) => {
    const promises = [];

    if (info.name) {
      promises.push(updateName(info.name));
    }

    if (info.email && info.password) {
      promises.push(updateEmail(info.email, info.password));
    }

    if (info.phone && info.password) {
      promises.push(updatePhone(info.phone, info.password));
    }

    return Promise.all(promises);
  };

  return {
    profile,
    updateProfile,
    updateProfileField,
    updatePersonalInfo,
    updateAccountInfo,
    updatePreferences,
    loading,
    userId: user?.$id,
  };
}

/**
 * Hook for session management
 */
export function useSessions() {
  const {session, getCurrentSession, signOut, signOutAll, createJWT} =
    useAuth();

  const isSessionExpired = () => {
    if (!session) return true;

    const expireTime = new Date(session.expire).getTime();
    const currentTime = Date.now();

    return currentTime >= expireTime;
  };

  const getSessionTimeLeft = () => {
    if (!session) return 0;

    const expireTime = new Date(session.expire).getTime();
    const currentTime = Date.now();

    return Math.max(0, expireTime - currentTime);
  };

  const refreshSession = async () => {
    return getCurrentSession();
  };

  return {
    session,
    isSessionExpired,
    getSessionTimeLeft,
    refreshSession,
    signOut,
    signOutAll,
    createJWT,
  };
}

export default useAuth;
