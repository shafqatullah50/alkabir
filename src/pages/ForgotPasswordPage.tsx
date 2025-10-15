import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      toast.success('Password reset link sent to your email!');
    }, 1500);
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Email sent again! Check your inbox.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-xl flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
              <span className="text-white text-2xl">AK</span>
            </div>
            <span className="text-2xl text-foreground">AL-Kabir</span>
          </Link>
          <h1 className="text-3xl text-foreground mb-2">Reset Your Password</h1>
          <p className="text-muted-foreground">
            {emailSent 
              ? "Check your email for the reset link" 
              : "Enter your email and we'll send you a reset link"
            }
          </p>
        </div>

        {/* Reset Form or Success State */}
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border transition-colors duration-300">
          {!emailSent ? (
            <>
              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm text-foreground">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="pl-10 h-12 border-2 border-border bg-background focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send a password reset link to this email address
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 h-12 text-base text-white shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-border hover:bg-accent transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                <h2 className="text-2xl text-foreground mb-4">Email Sent!</h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We've sent a password reset link to:
                  </p>
                  <p className="text-foreground px-4 py-2 bg-accent rounded-lg">
                    {email}
                  </p>
                  <p className="text-sm">
                    Please check your inbox and click the link to reset your password. The link will expire in 1 hour.
                  </p>
                </div>

                {/* Resend Button */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">
                    Didn't receive the email?
                  </p>
                  <Button 
                    onClick={handleResend}
                    variant="outline"
                    className="w-full border-2 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Resend Email'}
                  </Button>
                </div>
              </div>

              {/* Back to Login */}
              <div className="mt-6">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-border hover:bg-accent transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{' '}
            <Link to="/contact" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
              Contact Support
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm text-foreground mb-1">Security Notice</h4>
              <p className="text-xs text-muted-foreground">
                For your security, if you didn't request this password reset, please ignore this email or contact our support team immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
