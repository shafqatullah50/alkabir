/**
 * MIGRATION GUIDE: Supabase to Appwrite Authentication
 *
 * This file shows how to migrate from the existing Supabase auth to Appwrite auth.
 * The new Appwrite authentication system provides better TypeScript support,
 * more authentication methods, and improved state management with Zustand.
 *
 * OLD (Supabase): import { useAuth } from './contexts/AuthContext';
 * NEW (Appwrite): import { useAppwriteAuth } from './contexts/AppwriteAuthContext';
 */

import {useAppwriteAuth} from "./AppwriteAuthContext";

/**
 * Compatibility wrapper to make migration easier
 * This provides the same interface as the old Supabase AuthContext
 * while using the new Appwrite backend
 */
export function useAuth() {
  const {
    user,
    session,
    profile,
    loading,
    isAuthenticated,
    signUp: appwriteSignUp,
    signIn: appwriteSignIn,
    signOut: appwriteSignOut,
    updateProfile: appwriteUpdateProfile,
    testMode,
    toggleTestMode,
  } = useAppwriteAuth();

  // Convert Appwrite user to match old Supabase interface
  const compatibleUser = user
    ? {
        id: user.$id,
        email: user.email,
        user_metadata: {
          full_name: user.name,
        },
        created_at: user.$createdAt,
        aud: "authenticated",
        role: "authenticated",
      }
    : null;

  // Convert profile to match old interface
  const compatibleProfile = profile
    ? {
        id: profile.user_id,
        email: profile.email,
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        avatar_url: profile.avatar_url,
        created_at: profile.$createdAt,
        updated_at: profile.$updatedAt,
      }
    : null;

  // Convert session to match old interface
  const compatibleSession = session
    ? {
        access_token: session.$id,
        token_type: "bearer",
        expires_in: new Date(session.expire).getTime() - Date.now(),
        refresh_token: session.$id,
        user: compatibleUser,
      }
    : null;

  // Wrap sign up to match old interface
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      await appwriteSignUp(email, password, fullName);
    } catch (error: any) {
      throw {
        message: error.message || "Sign up failed",
        ...error,
      };
    }
  };

  // Wrap sign in to match old interface
  const signIn = async (email: string, password: string) => {
    try {
      await appwriteSignIn(email, password);
    } catch (error: any) {
      throw {
        message: error.message || "Sign in failed",
        ...error,
      };
    }
  };

  // Wrap sign out to match old interface
  const signOut = async () => {
    try {
      await appwriteSignOut();
    } catch (error: any) {
      throw {
        message: error.message || "Sign out failed",
        ...error,
      };
    }
  };

  // Wrap update profile to match old interface
  const updateProfile = async (updates: any) => {
    try {
      await appwriteUpdateProfile(updates);
    } catch (error: any) {
      throw {
        message: error.message || "Profile update failed",
        ...error,
      };
    }
  };

  return {
    // State (compatible with old interface)
    user: compatibleUser,
    profile: compatibleProfile,
    session: compatibleSession,
    loading,

    // Actions (compatible with old interface)
    signUp,
    signIn,
    signOut,
    updateProfile,

    // New features (Appwrite specific)
    testMode,
    toggleTestMode,

    // Additional computed state
    isAuthenticated,
  };
}

/**
 * MIGRATION CHECKLIST:
 *
 * 1. ✅ Install dependencies: npm install appwrite zustand
 * 2. ✅ Create environment variables in .env.local
 * 3. ✅ Replace AuthProvider with AppwriteAuthProvider in your app root
 * 4. ✅ Update imports from useAuth to useAppwriteAuth (or use this compatibility wrapper)
 * 5. ✅ Test all authentication flows
 * 6. ✅ Update any Supabase-specific database queries
 * 7. ✅ Configure Appwrite project settings
 * 8. ✅ Set up OAuth providers in Appwrite console
 * 9. ✅ Test email verification and password recovery
 * 10. ✅ Update error handling for new error format
 *
 * BREAKING CHANGES:
 * - User ID format changed from UUID to Appwrite ID format
 * - Session structure is different
 * - Error objects have different structure
 * - Some fields may have different names or types
 *
 * NEW FEATURES AVAILABLE:
 * - Test mode for development
 * - Better TypeScript support
 * - More authentication methods (OAuth, Magic URL, Phone)
 * - Session management improvements
 * - Profile management
 * - MFA support
 * - Persistent state with Zustand
 */

// Export the old AuthProvider interface for backwards compatibility
export function AuthProvider({children}: {children: React.ReactNode}) {
  console.warn(
    "MIGRATION WARNING: You are using the compatibility AuthProvider. " +
      "Please migrate to AppwriteAuthProvider for full feature access."
  );

  // You can either redirect to the new provider or show a migration notice
  return (
    <div className='bg-yellow-50 border border-yellow-200 p-4 m-4 rounded-md'>
      <h3 className='text-yellow-800 font-semibold'>
        🚨 Authentication Migration Required
      </h3>
      <p className='text-yellow-700 mt-2'>
        This app is migrating from Supabase to Appwrite authentication. Please
        update your code to use AppwriteAuthProvider.
      </p>
      <p className='text-yellow-700 mt-1 text-sm'>
        See /src/APPWRITE_AUTH_GUIDE.md for migration instructions.
      </p>
      {children}
    </div>
  );
}

export default useAuth;
