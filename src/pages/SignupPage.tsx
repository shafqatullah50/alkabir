import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Mail, Lock, User, Eye, EyeOff, Phone, ArrowRight} from "lucide-react";
import {Button} from "../components/ui/button";
import {Input} from "../components/ui/input";
import {Label} from "../components/ui/label";
import {Separator} from "../components/ui/separator";
import {useAppwriteAuth} from "../contexts/AppwriteAuthContext";
import {toast} from "sonner";

export default function SignupPage() {
  const navigate = useNavigate();
  const {signUp, loading} = useAppwriteAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (UAE format)
    const phoneRegex = /^(\+971|971|0)?[5][0-9]{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid UAE phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const user = await signUp(
        formData.email,
        formData.password,
        formData.name
      );

      toast.success("🎉 Account created successfully!", {
        description: "Welcome to AL-Kabir! Your account has been created.",
        duration: 4000,
      });

      // Navigate to dashboard after successful signup
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);

      // Handle specific Appwrite errors
      if (error.code === 409) {
        toast.error("Account already exists", {
          description:
            "An account with this email already exists. Try signing in instead.",
        });
        setErrors({email: "This email is already registered"});
      } else if (error.code === 400) {
        toast.error("Invalid information", {
          description: "Please check your information and try again.",
        });
      } else {
        toast.error("Signup failed", {
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleSocialSignup = (provider: string) => {
    // Social signup will be configured in Appwrite dashboard
    toast.info(`${provider} signup`, {
      description: "Social authentication will be available soon!",
    });
  };

  return (
    <div className='min-h-screen bg-background transition-colors duration-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link
            to='/'
            className='inline-flex items-center space-x-2 mb-6 group'>
            <div className='w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-xl flex items-center justify-center group-hover:shadow-xl transition-all duration-300'>
              <span className='text-white text-2xl'>AK</span>
            </div>
            <span className='text-2xl text-foreground'>AL-Kabir</span>
          </Link>
          <h1 className='text-3xl text-foreground mb-2'>Create Your Account</h1>
          <p className='text-muted-foreground'>
            Join thousands of satisfied customers across the UAE
          </p>
        </div>

        {/* Signup Form */}
        <div className='bg-card rounded-2xl shadow-xl p-8 border border-border transition-colors duration-300'>
          {/* Social Signup - Primary Options */}
          <div className='space-y-3 mb-6'>
            <Button
              type='button'
              variant='outline'
              className='w-full h-12 border-2 border-border hover:bg-accent hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300'
              onClick={() => handleSocialSignup("Google")}>
              <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Continue with Google
            </Button>

            <div className='grid grid-cols-2 gap-3'>
              <Button
                type='button'
                variant='outline'
                className='h-12 border-2 border-border hover:bg-accent hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300'
                onClick={() => handleSocialSignup("Facebook")}>
                <svg className='w-5 h-5' fill='#1877F2' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </Button>
              <Button
                type='button'
                variant='outline'
                className='h-12 border-2 border-border hover:bg-accent hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300'
                onClick={() => handleSocialSignup("Apple")}>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'>
                  <path d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' />
                </svg>
              </Button>
            </div>
          </div>

          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-3 bg-card text-muted-foreground'>
                Or create with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='name' className='text-sm text-foreground'>
                Full Name
              </Label>
              <div className='relative mt-2'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <Input
                  id='name'
                  type='text'
                  required
                  placeholder='John Doe'
                  className={`pl-10 h-12 border-2 bg-background focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-border"
                  }`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ""});
                  }}
                />
              </div>
              {errors.name && (
                <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor='email' className='text-sm text-foreground'>
                Email Address
              </Label>
              <div className='relative mt-2'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  required
                  placeholder='your@email.com'
                  className={`pl-10 h-12 border-2 bg-background focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-border"
                  }`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ""});
                  }}
                />
              </div>
              {errors.email && (
                <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor='phone' className='text-sm text-foreground'>
                Phone Number
              </Label>
              <div className='relative mt-2'>
                <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <Input
                  id='phone'
                  type='tel'
                  required
                  placeholder='+971 50 123 4567'
                  className={`pl-10 h-12 border-2 bg-background focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-border"
                  }`}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    if (errors.phone) setErrors({...errors, phone: ""});
                  }}
                />
              </div>
              {errors.phone && (
                <p className='text-sm text-red-500 mt-1'>{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor='password' className='text-sm text-foreground'>
                Password
              </Label>
              <div className='relative mt-2'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder='Create a strong password'
                  className={`pl-10 pr-10 h-12 border-2 bg-background focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-border"
                  }`}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    if (errors.password) setErrors({...errors, password: ""});
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'>
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-sm text-red-500 mt-1'>{errors.password}</p>
              )}
              <p className='text-xs text-muted-foreground mt-1'>
                Must contain uppercase, lowercase, and numbers (8+ chars)
              </p>
            </div>

            <Button
              type='submit'
              className='w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 h-12 text-base text-white shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift'
              disabled={loading}>
              {loading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className='w-5 h-5 ml-2' />
                </>
              )}
            </Button>

            <p className='text-xs text-muted-foreground text-center'>
              By signing up, you agree to our{" "}
              <a
                href='/terms'
                className='text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors'>
                Terms
              </a>{" "}
              and{" "}
              <a
                href='/privacy-policy'
                className='text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors'>
                Privacy Policy
              </a>
            </p>
          </form>

          {/* Guest Booking Option */}
          <div className='mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors duration-300'>
            <p className='text-sm text-foreground text-center'>
              <strong>Want to book quickly?</strong> You can book services
              without creating an account!
            </p>
            <Link to='/categories'>
              <Button
                variant='outline'
                className='w-full mt-3 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300'>
                Continue as Guest
              </Button>
            </Link>
          </div>
        </div>

        {/* Login Link */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-muted-foreground'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
