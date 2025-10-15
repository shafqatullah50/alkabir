import React, {useState} from "react";
import {useAppwriteAuth} from "../contexts/AppwriteAuthContext";
import {Button} from "../components/ui/button";
import {Card} from "../components/ui/card";
import {Badge} from "../components/ui/badge";
import {Input} from "../components/ui/input";
import {Label} from "../components/ui/label";
import {
  User,
  Mail,
  Phone,
  Shield,
  LogOut,
  Settings,
  TestTube,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
} from "lucide-react";

export function AppwriteAuthTester() {
  const {
    user,
    session,
    profile,
    loading,
    isAuthenticated,
    isEmailVerified,
    isPhoneVerified,
    testMode,
    signUp,
    signIn,
    signOut,
    toggleTestMode,
    updateName,
    updateEmail,
    sendEmailVerification,
  } = useAppwriteAuth();

  const [showDetails, setShowDetails] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: "test@alkabir.ae",
    password: "password123",
    name: "Ahmed Al-Mansoori",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await signUp(authForm.email, authForm.password, authForm.name);
      } else {
        await signIn(authForm.email, authForm.password);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      alert(`Authentication failed: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error("Sign out error:", error);
      alert(`Sign out failed: ${error.message}`);
    }
  };

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification(window.location.origin + "/verify-email");
      alert("Verification email sent!");
    } catch (error: any) {
      console.error("Verification error:", error);
      alert(`Failed to send verification: ${error.message}`);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <Card className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold flex items-center gap-2'>
            <TestTube className='w-6 h-6' />
            Appwrite Authentication Tester
          </h2>

          <div className='flex items-center gap-2'>
            <Badge variant={testMode ? "default" : "secondary"}>
              {testMode ? "Test Mode" : "Live Mode"}
            </Badge>
            <Button onClick={toggleTestMode} variant='outline' size='sm'>
              {testMode ? "Switch to Live" : "Switch to Test"}
            </Button>
          </div>
        </div>

        {/* Authentication Status */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <Card
            className={`p-4 border-2 ${
              isAuthenticated
                ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                : "border-red-200 bg-red-50 dark:bg-red-950/20"
            }`}>
            <div className='flex items-center gap-2'>
              <Shield
                className={`w-5 h-5 ${
                  isAuthenticated ? "text-green-600" : "text-red-600"
                }`}
              />
              <span className='font-medium'>
                {isAuthenticated ? "Authenticated" : "Not Authenticated"}
              </span>
            </div>
          </Card>

          <Card
            className={`p-4 border-2 ${
              isEmailVerified
                ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20"
            }`}>
            <div className='flex items-center gap-2'>
              <Mail
                className={`w-5 h-5 ${
                  isEmailVerified ? "text-green-600" : "text-yellow-600"
                }`}
              />
              <span className='font-medium'>
                Email {isEmailVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </Card>

          <Card
            className={`p-4 border-2 ${
              isPhoneVerified
                ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                : "border-gray-200 bg-gray-50 dark:bg-gray-950/20"
            }`}>
            <div className='flex items-center gap-2'>
              <Phone
                className={`w-5 h-5 ${
                  isPhoneVerified ? "text-green-600" : "text-gray-600"
                }`}
              />
              <span className='font-medium'>
                Phone {isPhoneVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </Card>
        </div>

        {/* User Information */}
        {isAuthenticated && user && (
          <Card className='p-4 mb-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold flex items-center gap-2'>
                <User className='w-5 h-5' />
                User Information
              </h3>
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant='outline'
                size='sm'>
                {showDetails ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Name
                </Label>
                <p className='text-sm'>{user.name || "N/A"}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Email
                </Label>
                <p className='text-sm'>{user.email}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Phone
                </Label>
                <p className='text-sm'>{user.phone || "N/A"}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Status
                </Label>
                <Badge variant={user.status ? "default" : "destructive"}>
                  {user.status ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            {showDetails && (
              <div className='mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label className='text-sm font-medium text-muted-foreground'>
                    User ID
                  </Label>
                  <p className='text-xs font-mono'>{user.$id}</p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-muted-foreground'>
                    Registration
                  </Label>
                  <p className='text-xs'>
                    {new Date(user.registration).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-muted-foreground'>
                    Last Access
                  </Label>
                  <p className='text-xs'>
                    {new Date(user.accessedAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-muted-foreground'>
                    MFA Enabled
                  </Label>
                  <Badge variant={user.mfa ? "default" : "secondary"}>
                    {user.mfa ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-2 mt-4'>
              <Button onClick={handleSignOut} variant='destructive' size='sm'>
                <LogOut className='w-4 h-4 mr-2' />
                Sign Out
              </Button>

              {!isEmailVerified && (
                <Button
                  onClick={handleSendVerification}
                  variant='outline'
                  size='sm'>
                  <Mail className='w-4 h-4 mr-2' />
                  Send Verification
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Authentication Form */}
        {!isAuthenticated && (
          <Card className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold'>
                {isSignUp ? "Sign Up" : "Sign In"}
              </h3>
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                variant='ghost'
                size='sm'>
                {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
              </Button>
            </div>

            <div className='space-y-4'>
              {isSignUp && (
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    type='text'
                    value={authForm.name}
                    onChange={(e) =>
                      setAuthForm((prev) => ({...prev, name: e.target.value}))
                    }
                    placeholder='Enter your full name'
                  />
                </div>
              )}

              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm((prev) => ({...prev, email: e.target.value}))
                  }
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm((prev) => ({...prev, password: e.target.value}))
                  }
                  placeholder='Enter your password'
                />
              </div>

              <Button
                onClick={handleAuth}
                className='w-full'
                disabled={loading}>
                {loading ? (
                  <>
                    <Settings className='w-4 h-4 mr-2 animate-spin' />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    {isSignUp ? (
                      <UserPlus className='w-4 h-4 mr-2' />
                    ) : (
                      <LogIn className='w-4 h-4 mr-2' />
                    )}
                    {isSignUp ? "Create Account" : "Sign In"}
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Session Information */}
        {session && showDetails && (
          <Card className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>Session Details</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Session ID
                </Label>
                <p className='text-xs font-mono'>{session.$id}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Provider
                </Label>
                <p>{session.provider}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Expires
                </Label>
                <p className='text-xs'>
                  {new Date(session.expire).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Device
                </Label>
                <p>
                  {session.deviceName} ({session.osName})
                </p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Location
                </Label>
                <p>
                  {session.countryName} ({session.ip})
                </p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Current
                </Label>
                <Badge variant={session.current ? "default" : "secondary"}>
                  {session.current ? "Current" : "Other Device"}
                </Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Profile Information */}
        {profile && showDetails && (
          <Card className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>Profile Details</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Full Name
                </Label>
                <p>{profile.full_name}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  City
                </Label>
                <p>{profile.city}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Phone
                </Label>
                <p>{profile.phone || "N/A"}</p>
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground'>
                  Professional
                </Label>
                <Badge
                  variant={profile.is_professional ? "default" : "secondary"}>
                  {profile.is_professional ? "Professional" : "Customer"}
                </Badge>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}
