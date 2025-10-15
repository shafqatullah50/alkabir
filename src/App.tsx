import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {Toaster} from "./components/ui/sonner";
import {AppwriteAuthProvider} from "./contexts/AppwriteAuthContext";
import {ThemeProvider} from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthTestToggle from "./components/AuthTestToggle";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import BookingPage from "./pages/BookingPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import FAQPage from "./pages/FAQPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CareersPage from "./pages/CareersPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import AuthTestPage from "./pages/AuthTestPage";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppwriteAuthProvider>
          <div className='min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300'>
            <Header />
            <main className='flex-1'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/categories' element={<CategoriesPage />} />
                <Route
                  path='/service/:serviceId'
                  element={<ServiceDetailPage />}
                />
                <Route path='/booking/:serviceId' element={<BookingPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route
                  path='/dashboard'
                  element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/booking-details/:bookingId'
                  element={
                    <ProtectedRoute>
                      <BookingDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path='/blog' element={<BlogPage />} />
                <Route path='/blog/:postId' element={<BlogPostPage />} />
                <Route path='/faq' element={<FAQPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route
                  path='/forgot-password'
                  element={<ForgotPasswordPage />}
                />
                <Route path='/terms' element={<TermsOfServicePage />} />
                <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                <Route path='/careers' element={<CareersPage />} />
                <Route path='/refund-policy' element={<RefundPolicyPage />} />
                <Route path='/auth-test' element={<AuthTestPage />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
            <AuthTestToggle />
          </div>
        </AppwriteAuthProvider>
      </ThemeProvider>
    </Router>
  );
}
