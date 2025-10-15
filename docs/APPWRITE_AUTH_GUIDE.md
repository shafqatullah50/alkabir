# Appwrite Authentication Integration Guide

This project now includes a comprehensive Appwrite authentication system using Zustand for state management. This replaces the previous Supabase-based authentication.

## Features

### Authentication Methods
- ✅ Email & Password authentication
- ✅ OAuth2 providers (Google, GitHub, etc.)
- ✅ Magic URL (passwordless email)
- ✅ Phone number authentication
- ✅ Anonymous authentication
- ✅ Multi-Factor Authentication (MFA)

### User Management
- ✅ User registration and login
- ✅ Email verification
- ✅ Phone verification
- ✅ Password recovery
- ✅ Profile management
- ✅ Session management
- ✅ Preferences storage

### Development Features
- ✅ Test mode with mock data
- ✅ TypeScript support with full type safety
- ✅ Persistent state with localStorage
- ✅ Comprehensive error handling
- ✅ Loading states
- ✅ Authentication guards
- ✅ Multiple custom hooks

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure your Appwrite settings:

```bash
cp .env.example .env.local
```

Update the following variables:
```env
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=main
```

### 2. Install Dependencies

The required dependencies are already installed:
- `appwrite` - Appwrite SDK
- `zustand` - State management
- `@types/react` - TypeScript support

### 3. Initialize in Your App

Replace your existing AuthProvider with the new AppwriteAuthProvider:

```tsx
// In your main App.tsx or index.tsx
import { AppwriteAuthProvider } from './contexts/AppwriteAuthContext';

function App() {
  return (
    <AppwriteAuthProvider>
      {/* Your app components */}
    </AppwriteAuthProvider>
  );
}
```

## Usage

### Basic Authentication Hook

```tsx
import { useAppwriteAuth } from '../contexts/AppwriteAuthContext';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    loading,
    signIn,
    signUp,
    signOut
  } = useAppwriteAuth();

  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
}
```

### Advanced Features

#### Profile Management
```tsx
import { useAppwriteProfile } from '../contexts/AppwriteAuthContext';

function ProfileComponent() {
  const { profile, updateProfile, loading } = useAppwriteProfile();

  const handleUpdateProfile = async () => {
    await updateProfile({
      full_name: 'New Name',
      phone: '+1234567890',
      city: 'Dubai'
    });
  };

  return (
    <div>
      <h2>{profile?.full_name}</h2>
      <button onClick={handleUpdateProfile} disabled={loading}>
        Update Profile
      </button>
    </div>
  );
}
```

#### Route Protection
```tsx
import { AuthGuard, withAuth } from '../contexts/AppwriteAuthContext';

// Method 1: Using AuthGuard component
function App() {
  return (
    <AuthGuard requireAuth={true} fallback={<LoginPage />}>
      <Dashboard />
    </AuthGuard>
  );
}

// Method 2: Using HOC
const ProtectedDashboard = withAuth(Dashboard);

function App() {
  return <ProtectedDashboard />;
}
```

#### OAuth Authentication
```tsx
function SocialLogin() {
  const { signInWithOAuth } = useAppwriteAuth();

  const handleGoogleSignIn = () => {
    signInWithOAuth('google', '/dashboard', '/login?error=oauth_failed');
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}
```

#### Magic URL Authentication
```tsx
function MagicLinkLogin() {
  const { signInWithMagicURL } = useAppwriteAuth();

  const handleMagicLink = async () => {
    try {
      await signInWithMagicURL(
        'user@example.com',
        'http://localhost:5173/auth/magic'
      );
      alert('Check your email for the magic link!');
    } catch (error) {
      console.error('Magic link failed:', error);
    }
  };

  return (
    <button onClick={handleMagicLink}>
      Send Magic Link
    </button>
  );
}
```

#### Email Verification
```tsx
function EmailVerification() {
  const { 
    sendEmailVerification, 
    confirmEmailVerification,
    isEmailVerified 
  } = useAppwriteAuth();

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification('http://localhost:5173/verify-email');
      alert('Verification email sent!');
    } catch (error) {
      console.error('Failed to send verification:', error);
    }
  };

  if (isEmailVerified) {
    return <div>✅ Email verified</div>;
  }

  return (
    <button onClick={handleSendVerification}>
      Verify Email
    </button>
  );
}
```

### Test Mode

For development and testing, you can enable test mode:

```tsx
function TestModeToggle() {
  const { testMode, toggleTestMode } = useAppwriteAuth();

  return (
    <button onClick={toggleTestMode}>
      {testMode ? 'Disable Test Mode' : 'Enable Test Mode'}
    </button>
  );
}
```

Test mode provides:
- Mock user data (Ahmed Al-Mansoori)
- Mock session and profile
- No actual API calls
- Instant authentication state changes

## File Structure

```
src/
├── utils/appwrite/
│   ├── client.ts          # Appwrite client configuration
│   └── types.ts           # TypeScript types for Appwrite models
├── stores/
│   └── authStore.ts       # Zustand store for authentication state
├── hooks/
│   └── useAuth.ts         # Custom hooks for authentication
├── contexts/
│   ├── AuthContext.tsx            # Original Supabase context (keep for reference)
│   └── AppwriteAuthContext.tsx    # New Appwrite context
└── components/
    └── AppwriteAuthTester.tsx     # Testing component
```

## Testing Component

A comprehensive testing component is available at `/src/components/AppwriteAuthTester.tsx`. This component provides:

- Real-time authentication status
- User information display
- Session details
- Profile management
- Test mode toggle
- Sign in/sign up forms
- Email verification testing

To use the tester, import and add it to any page:

```tsx
import { AppwriteAuthTester } from '../components/AppwriteAuthTester';

function TestPage() {
  return <AppwriteAuthTester />;
}
```

## Migration from Supabase

If you're migrating from the existing Supabase authentication:

1. Replace `AuthProvider` with `AppwriteAuthProvider`
2. Replace `useAuth()` with `useAppwriteAuth()`
3. Update any component logic that depends on Supabase-specific fields
4. Test all authentication flows
5. Update any database queries to use Appwrite databases

## Available Hooks

1. `useAppwriteAuth()` - Main authentication hook
2. `useAppwriteProfile()` - Profile management
3. `useAuthStatus()` - Simple auth status check
4. `useRequireAuth()` - Throws error if not authenticated
5. `useSessions()` - Session management

## Error Handling

All authentication methods throw detailed errors:

```tsx
try {
  await signIn(email, password);
} catch (error: AuthError) {
  console.error('Auth failed:', error.message);
  console.error('Error code:', error.code);
  console.error('Error type:', error.type);
}
```

## Security Features

- ✅ Automatic session refresh
- ✅ Session expiry handling
- ✅ CSRF protection via Appwrite
- ✅ Rate limiting via Appwrite
- ✅ Secure password requirements
- ✅ Email/phone verification
- ✅ MFA support
- ✅ OAuth2 security
- ✅ JWT token management

## Production Checklist

- [ ] Set up proper environment variables
- [ ] Configure OAuth providers in Appwrite console
- [ ] Set up email/SMS providers for verification
- [ ] Configure proper redirect URLs
- [ ] Set up proper error pages
- [ ] Test all authentication flows
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup authentication methods

## Support

For issues or questions:
1. Check Appwrite documentation: https://appwrite.io/docs
2. Review the TypeScript types in `src/utils/appwrite/types.ts`
3. Use the testing component for debugging
4. Check browser console for detailed error messages