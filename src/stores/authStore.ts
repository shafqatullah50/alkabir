import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {account} from "../utils/appwrite/client";
import {
  AppwriteUser,
  AppwriteSession,
  Profile,
  AuthError,
  JWT,
} from "../utils/appwrite/types";
import {ID} from "appwrite";

interface AuthState {
  // State
  user: AppwriteUser | null;
  session: AppwriteSession | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  testMode: boolean;

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
  getCurrentUser: () => Promise<AppwriteUser | null>;
  getCurrentSession: () => Promise<AppwriteSession | null>;
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
  createJWT: () => Promise<JWT>;
  initialize: () => Promise<void>;
  toggleTestMode: () => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

// Test data for development
const TEST_USER: AppwriteUser = {
  $id: "test-user-123",
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  name: "Ahmed Al-Mansoori",
  registration: new Date().toISOString(),
  status: true,
  labels: [],
  passwordUpdate: new Date().toISOString(),
  email: "test@alkabir.ae",
  phone: "+971501234567",
  emailVerification: true,
  phoneVerification: true,
  mfa: false,
  prefs: {},
  targets: [],
  accessedAt: new Date().toISOString(),
};

const TEST_SESSION: AppwriteSession = {
  $id: "test-session-123",
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  userId: "test-user-123",
  expire: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  provider: "email",
  providerUid: "test@alkabir.ae",
  providerAccessToken: "",
  providerAccessTokenExpiry: "",
  providerRefreshToken: "",
  ip: "127.0.0.1",
  osCode: "WIN",
  osName: "Windows",
  osVersion: "10",
  clientType: "browser",
  clientCode: "CH",
  clientName: "Chrome",
  clientVersion: "118",
  clientEngine: "Blink",
  clientEngineVersion: "118",
  deviceName: "Desktop",
  deviceBrand: "Generic",
  deviceModel: "Desktop",
  countryCode: "AE",
  countryName: "United Arab Emirates",
  current: true,
  factors: [],
  secret: "",
  mfaUpdatedAt: "",
};

const TEST_PROFILE: Profile = {
  $id: "test-profile-123",
  $createdAt: new Date().toISOString(),
  $updatedAt: new Date().toISOString(),
  user_id: "test-user-123",
  email: "test@alkabir.ae",
  full_name: "Ahmed Al-Mansoori",
  phone: "+971 50 123 4567",
  address: "Dubai Marina, Marina Plaza",
  city: "Dubai",
  avatar_url:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  date_of_birth: "1990-01-15",
  gender: "male",
  preferences: {
    language: "en",
    notifications: true,
    theme: "light",
  },
  is_professional: false,
  is_verified: true,
  last_login: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      profile: null,
      loading: false,
      initialized: false,
      testMode: false,

      // Initialize auth state
      initialize: async () => {
        const {testMode} = get();

        if (testMode) {
          set({
            user: TEST_USER,
            session: TEST_SESSION,
            profile: TEST_PROFILE,
            loading: false,
            initialized: true,
          });
          return;
        }

        set({loading: true});

        try {
          // Check if user is already authenticated
          const currentUser = await account.get();
          const currentSession = await account.getSession("current");

          set({
            user: currentUser,
            session: currentSession,
            loading: false,
            initialized: true,
          });

          // Load user profile if authenticated
          if (currentUser) {
            // Note: You'll need to implement profile loading from your database
            // For now, we'll create a basic profile from user data
            const profile: Profile = {
              $id: currentUser.$id,
              $createdAt: currentUser.$createdAt,
              $updatedAt: currentUser.$updatedAt,
              user_id: currentUser.$id,
              email: currentUser.email,
              full_name: currentUser.name || currentUser.email.split("@")[0],
              phone: currentUser.phone || undefined,
              address: undefined,
              city: "Dubai",
              avatar_url: undefined,
              date_of_birth: undefined,
              gender: undefined,
              preferences: currentUser.prefs || {},
              is_professional: false,
              is_verified: currentUser.emailVerification,
              last_login: currentUser.accessedAt,
            };

            set({profile});
          }
        } catch (error) {
          // User is not authenticated
          set({
            user: null,
            session: null,
            profile: null,
            loading: false,
            initialized: true,
          });
        }
      },

      // Sign up new user
      signUp: async (email: string, password: string, name: string) => {
        set({loading: true});

        try {
          const user = await account.create(ID.unique(), email, password, name);

          // Automatically sign in after successful signup
          const session = await account.createEmailPasswordSession(
            email,
            password
          );

          set({
            user,
            session,
            loading: false,
          });

          return user;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Sign in with email and password
      signIn: async (email: string, password: string) => {
        set({loading: true});

        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          const user = await account.get();

          set({
            user,
            session,
            loading: false,
          });

          return session;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Sign in with OAuth provider
      signInWithOAuth: (
        provider: string,
        successUrl?: string,
        failureUrl?: string
      ) => {
        account.createOAuth2Session(
          provider as any,
          successUrl || window.location.origin + "/auth/callback",
          failureUrl || window.location.origin + "/auth/error"
        );
      },

      // Sign in with Magic URL
      signInWithMagicURL: async (email: string, url: string) => {
        set({loading: true});

        try {
          const token = await account.createMagicURLToken(
            ID.unique(),
            email,
            url
          );
          set({loading: false});
          return token;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Sign in with Phone
      signInWithPhone: async (phone: string) => {
        set({loading: true});

        try {
          const token = await account.createPhoneToken(ID.unique(), phone);
          set({loading: false});
          return token;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Sign out current session
      signOut: async () => {
        set({loading: true});

        try {
          await account.deleteSession("current");

          set({
            user: null,
            session: null,
            profile: null,
            loading: false,
          });
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Sign out all sessions
      signOutAll: async () => {
        set({loading: true});

        try {
          await account.deleteSessions();

          set({
            user: null,
            session: null,
            profile: null,
            loading: false,
          });
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Get current user
      getCurrentUser: async () => {
        try {
          const user = await account.get();
          set({user});
          return user;
        } catch (error) {
          set({user: null});
          return null;
        }
      },

      // Get current session
      getCurrentSession: async () => {
        try {
          const session = await account.getSession("current");
          set({session});
          return session;
        } catch (error) {
          set({session: null});
          return null;
        }
      },

      // Update user profile
      updateProfile: async (updates: Partial<Profile>) => {
        const {profile, testMode} = get();

        if (testMode) {
          const updatedProfile = {...TEST_PROFILE, ...updates};
          set({profile: updatedProfile});
          return updatedProfile;
        }

        if (!profile) throw new Error("No profile found");

        set({loading: true});

        try {
          // Here you would update the profile in your database
          // For now, we'll just update local state
          const updatedProfile = {...profile, ...updates};
          set({profile: updatedProfile, loading: false});
          return updatedProfile;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Update password
      updatePassword: async (newPassword: string, oldPassword?: string) => {
        set({loading: true});

        try {
          const user = await account.updatePassword(newPassword, oldPassword);
          set({user, loading: false});
          return user;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Update email
      updateEmail: async (email: string, password: string) => {
        set({loading: true});

        try {
          const user = await account.updateEmail(email, password);
          set({user, loading: false});
          return user;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Update phone
      updatePhone: async (phone: string, password: string) => {
        set({loading: true});

        try {
          const user = await account.updatePhone(phone, password);
          set({user, loading: false});
          return user;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Update name
      updateName: async (name: string) => {
        set({loading: true});

        try {
          const user = await account.updateName(name);
          set({user, loading: false});
          return user;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Update preferences
      updatePreferences: async (prefs: Record<string, any>) => {
        set({loading: true});

        try {
          const user = await account.updatePrefs(prefs);
          set({user, loading: false});
          return user;
        } catch (error) {
          set({loading: false});
          throw error as AuthError;
        }
      },

      // Send email verification
      sendEmailVerification: async (url: string) => {
        try {
          return await account.createVerification(url);
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Confirm email verification
      confirmEmailVerification: async (userId: string, secret: string) => {
        try {
          const result = await account.updateVerification(userId, secret);
          // Refresh user data
          const user = await account.get();
          set({user});
          return result;
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Send phone verification
      sendPhoneVerification: async () => {
        try {
          return await account.createPhoneVerification();
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Confirm phone verification
      confirmPhoneVerification: async (userId: string, secret: string) => {
        try {
          const result = await account.updatePhoneVerification(userId, secret);
          // Refresh user data
          const user = await account.get();
          set({user});
          return result;
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Send password recovery
      sendPasswordRecovery: async (email: string, url: string) => {
        try {
          return await account.createRecovery(email, url);
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Confirm password recovery
      confirmPasswordRecovery: async (
        userId: string,
        secret: string,
        password: string
      ) => {
        try {
          const result = await account.updateRecovery(userId, secret, password);
          return result;
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Create JWT token
      createJWT: async () => {
        try {
          return await account.createJWT();
        } catch (error) {
          throw error as AuthError;
        }
      },

      // Toggle test mode
      toggleTestMode: () => {
        const {testMode} = get();
        const newTestMode = !testMode;

        if (newTestMode) {
          set({
            testMode: true,
            user: TEST_USER,
            session: TEST_SESSION,
            profile: TEST_PROFILE,
            loading: false,
          });
        } else {
          set({
            testMode: false,
            user: null,
            session: null,
            profile: null,
            loading: false,
          });
        }
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({loading});
      },

      // Clear any errors (for future error state)
      clearError: () => {
        // This can be extended when adding error state
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist essential auth state, not functions
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        profile: state.profile,
        testMode: state.testMode,
        initialized: state.initialized,
      }),
    }
  )
);
