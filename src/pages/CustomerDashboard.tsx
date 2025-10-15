import { useState, useRef } from 'react';
import { Calendar, Clock, User, CreditCard, Download, Star, MapPin, Camera, Upload, Package, Settings, Wallet, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(profile?.avatar_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    fullName: profile?.full_name || '',
    phone: profile?.phone || '',
    city: profile?.city || '',
    address: profile?.address || '',
  });

  // Change password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Password visibility state
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large', {
          description: 'Please upload an image smaller than 5MB',
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: 'Please upload an image file',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success('Profile image updated!', {
          description: 'Your new profile picture has been set',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelBooking = () => {
    // API call to cancel booking
    toast.success('Booking cancelled', {
      description: 'Your booking has been cancelled successfully.',
    });
    setCancelModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleReschedule = () => {
    // API call to reschedule
    toast.success('Reschedule request sent', {
      description: 'We will contact you shortly to confirm the new date.',
    });
    setRescheduleModalOpen(false);
    setSelectedBookingId(null);
  };

  const openCancelModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCancelModalOpen(true);
  };

  const openRescheduleModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setRescheduleModalOpen(true);
  };

  const openInvoiceModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setInvoiceModalOpen(true);
  };

  const openReviewModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setRating(0);
    setReviewText('');
    setReviewModalOpen(true);
  };

  const handleDownloadInvoice = () => {
    // API call to generate and download invoice
    toast.success('Invoice downloaded', {
      description: 'Your invoice has been downloaded successfully.',
    });
    setInvoiceModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleAddPaymentMethod = () => {
    // Validate form
    if (!paymentForm.cardNumber || !paymentForm.cardholderName || !paymentForm.expiryDate || !paymentForm.cvv) {
      toast.error('All fields required', {
        description: 'Please fill in all payment details.',
      });
      return;
    }

    // Basic validation for card number (should be 16 digits)
    const cardNumberClean = paymentForm.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16 || !/^\d+$/.test(cardNumberClean)) {
      toast.error('Invalid card number', {
        description: 'Please enter a valid 16-digit card number.',
      });
      return;
    }

    // Validate expiry date format (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
      toast.error('Invalid expiry date', {
        description: 'Please enter expiry date in MM/YY format.',
      });
      return;
    }

    // Validate CVV (3 or 4 digits)
    if (paymentForm.cvv.length < 3 || paymentForm.cvv.length > 4 || !/^\d+$/.test(paymentForm.cvv)) {
      toast.error('Invalid CVV', {
        description: 'Please enter a valid 3 or 4-digit CVV.',
      });
      return;
    }

    // API call to add payment method
    toast.success('Payment method added', {
      description: 'Your new payment method has been added successfully.',
    });
    
    // Reset form
    setPaymentForm({
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
    });
    setPaymentModalOpen(false);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setPaymentForm({ ...paymentForm, cardNumber: formatCardNumber(value) });
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setPaymentForm({ ...paymentForm, expiryDate: value });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPaymentForm({ ...paymentForm, cvv: value });
    }
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Rating required', {
        description: 'Please select a rating before submitting.',
      });
      return;
    }

    // API call to submit review
    toast.success('Review submitted', {
      description: 'Thank you for your feedback!',
    });
    setReviewModalOpen(false);
    setSelectedBookingId(null);
    setRating(0);
    setReviewText('');
  };

  const handleEditProfile = () => {
    if (isEditingProfile) {
      // Validate form
      if (!profileFormData.fullName.trim()) {
        toast.error('Name required', {
          description: 'Please enter your full name.',
        });
        return;
      }

      // API call to update profile
      toast.success('Profile updated', {
        description: 'Your profile has been updated successfully.',
      });
      setIsEditingProfile(false);
    } else {
      // Enter edit mode
      setProfileFormData({
        fullName: profile?.full_name || '',
        phone: profile?.phone || '',
        city: profile?.city || '',
        address: profile?.address || '',
      });
      setIsEditingProfile(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setProfileFormData({
      fullName: profile?.full_name || '',
      phone: profile?.phone || '',
      city: profile?.city || '',
      address: profile?.address || '',
    });
  };

  const handleChangePassword = () => {
    // Validate form
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('All fields required', {
        description: 'Please fill in all password fields.',
      });
      return;
    }

    // Check if new passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match', {
        description: 'New password and confirm password must match.',
      });
      return;
    }

    // Check password strength (at least 8 characters)
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password too short', {
        description: 'Password must be at least 8 characters long.',
      });
      return;
    }

    // API call to change password
    toast.success('Password changed', {
      description: 'Your password has been changed successfully.',
    });
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setChangePasswordModalOpen(false);
  };

  const bookings = [
    {
      id: '1',
      service: 'House Cleaning',
      professional: 'Sarah Williams',
      date: 'Oct 18, 2025',
      time: '10:00 AM',
      status: 'upcoming',
      price: 150,
      address: '123 Main St, Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=400',
    },
    {
      id: '2',
      service: 'Plumbing Repair',
      professional: 'Michael Johnson',
      date: 'Oct 12, 2025',
      time: '2:00 PM',
      status: 'completed',
      price: 225,
      address: '123 Main St, Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400',
    },
    {
      id: '3',
      service: 'Electrical Work',
      professional: 'David Martinez',
      date: 'Oct 5, 2025',
      time: '11:00 AM',
      status: 'completed',
      price: 320,
      address: '123 Main St, Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?w=400',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
      case 'completed':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl shadow-sm p-8 mb-8 border border-border transition-colors duration-300 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-emerald-600 to-teal-600">
                {profileImage ? (
                  <ImageWithFallback
                    src={profileImage}
                    alt={profile?.full_name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl text-white">{profile?.full_name?.charAt(0) || 'U'}</span>
                  </div>
                )}
              </div>
              
              {/* Upload Button Overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <Camera className="w-8 h-8 text-white mx-auto mb-1" />
                  <span className="text-xs text-white">Change Photo</span>
                </div>
              </button>
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl text-foreground mb-2">{profile?.full_name || 'User'}</h1>
              <p className="text-muted-foreground mb-4">
                Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-border">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-foreground">{profile?.city || 'Dubai'}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-border">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-foreground">Premium Member</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-2xl text-foreground mb-1">12</div>
                <div className="text-xs text-muted-foreground">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-foreground mb-1">8</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-foreground mb-1">4.9</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto mb-8 -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-accent/50 dark:bg-accent/30 p-1 border border-border w-full md:w-auto min-w-max">
              <TabsTrigger 
                value="bookings" 
                className="rounded-full px-3 sm:px-4 md:px-6 text-xs sm:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 whitespace-nowrap"
              >
                <Package className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">My Bookings</span>
                <span className="xs:hidden">Bookings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="rounded-full px-3 sm:px-4 md:px-6 text-xs sm:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 whitespace-nowrap"
              >
                <Settings className="w-4 h-4 mr-1 sm:mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="payment" 
                className="rounded-full px-3 sm:px-4 md:px-6 text-xs sm:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 whitespace-nowrap"
              >
                <Wallet className="w-4 h-4 mr-1 sm:mr-2" />
                Payment
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-card rounded-xl shadow-sm p-6 border border-border hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={booking.image}
                        alt={booking.service}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl text-foreground mb-1">{booking.service}</h3>
                          <p className="text-muted-foreground">with {booking.professional}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.address}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <CreditCard className="w-4 h-4" />
                          <span>AED {booking.price}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {booking.status === 'upcoming' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openRescheduleModal(booking.id)}
                              className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              Reschedule
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openCancelModal(booking.id)}
                              className="border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400"
                            >
                              Cancel Booking
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => navigate(`/booking-details/${booking.id}`)}
                              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                            >
                              View Details
                            </Button>
                          </>
                        )}
                        {booking.status === 'completed' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openReviewModal(booking.id)}
                              className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Leave Review
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openInvoiceModal(booking.id)}
                              className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Invoice
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => navigate(`/booking-details/${booking.id}`)}
                              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                            >
                              View Details
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-card rounded-xl shadow-sm p-6 sm:p-8 border border-border transition-colors duration-300">
              <h2 className="text-2xl text-foreground mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm text-muted-foreground mb-2">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={isEditingProfile ? profileFormData.fullName : profile?.full_name || 'User'}
                      onChange={(e) => setProfileFormData({ ...profileFormData, fullName: e.target.value })}
                      className="w-full transition-colors duration-300"
                      readOnly={!isEditingProfile}
                      disabled={!isEditingProfile}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm text-muted-foreground mb-2">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile?.email || ''}
                      className="w-full transition-colors duration-300 opacity-60 cursor-not-allowed"
                      readOnly
                      disabled
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm text-muted-foreground mb-2">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={isEditingProfile ? profileFormData.phone : profile?.phone || 'Not set'}
                      onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                      className="w-full transition-colors duration-300"
                      readOnly={!isEditingProfile}
                      disabled={!isEditingProfile}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm text-muted-foreground mb-2">City</Label>
                    <Input
                      id="city"
                      type="text"
                      value={isEditingProfile ? profileFormData.city : profile?.city || 'Dubai'}
                      onChange={(e) => setProfileFormData({ ...profileFormData, city: e.target.value })}
                      className="w-full transition-colors duration-300"
                      readOnly={!isEditingProfile}
                      disabled={!isEditingProfile}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm text-muted-foreground mb-2">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    value={isEditingProfile ? profileFormData.address : profile?.address || 'Not set'}
                    onChange={(e) => setProfileFormData({ ...profileFormData, address: e.target.value })}
                    className="w-full transition-colors duration-300"
                    readOnly={!isEditingProfile}
                    disabled={!isEditingProfile}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {isEditingProfile ? (
                    <>
                      <Button 
                        onClick={handleEditProfile}
                        className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                      >
                        Update Profile
                      </Button>
                      <Button 
                        onClick={handleCancelEdit}
                        variant="outline" 
                        className="border-border hover:bg-accent"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={handleEditProfile}
                        className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                      >
                        Edit Profile
                      </Button>
                      <Button 
                        onClick={() => setChangePasswordModalOpen(true)}
                        variant="outline" 
                        className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        Change Password
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <div className="bg-card rounded-xl shadow-sm p-8 border border-border transition-colors duration-300">
              <h2 className="text-2xl text-foreground mb-6">Payment Methods</h2>
              <div className="space-y-4 mb-6">
                <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-background transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-foreground">•••• •••• •••• 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Default</Badge>
                </div>

                <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-background transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-foreground">•••• •••• •••• 8888</div>
                      <div className="text-sm text-muted-foreground">Expires 06/26</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400">Set as Default</Button>
                </div>
              </div>
              <Button 
                onClick={() => setPaymentModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
              >
                Add New Payment Method
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Cancel Booking Modal */}
        <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Cancel Booking</DialogTitle>
              <DialogDescription className="text-sm">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
              <p className="text-sm text-foreground mb-2">
                <strong>Cancellation Policy:</strong>
              </p>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Free cancellation up to 24 hours before appointment</li>
                <li>50% refund for cancellation within 24 hours</li>
                <li>No refund for same-day cancellation</li>
              </ul>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setCancelModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelBooking}
                className="w-full sm:w-auto"
              >
                Cancel Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reschedule Modal */}
        <Dialog open={rescheduleModalOpen} onOpenChange={setRescheduleModalOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Reschedule Booking</DialogTitle>
              <DialogDescription className="text-sm">
                Select a new date and time for your booking.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 sm:py-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">New Date</label>
                <input
                  type="date"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-border bg-background text-foreground rounded-lg transition-colors duration-300 text-sm"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">New Time</label>
                <select className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-border bg-background text-foreground rounded-lg transition-colors duration-300 text-sm">
                  <option>9:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 1:00 PM</option>
                  <option>1:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 5:00 PM</option>
                  <option>5:00 PM - 7:00 PM</option>
                </select>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Note:</strong> Reschedule requests are subject to professional availability. We'll confirm within 2 hours.
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setRescheduleModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReschedule}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Download Invoice Modal */}
        <Dialog open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Download Invoice</DialogTitle>
              <DialogDescription className="text-sm">
                Review your invoice details before downloading.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
              {/* Invoice Preview */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-4 sm:p-6 border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg text-foreground">AL-Kabir Services</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Dubai, UAE</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs sm:text-sm text-muted-foreground">Invoice #</p>
                    <p className="text-sm sm:text-base text-foreground">INV-2025-{selectedBookingId}</p>
                  </div>
                </div>
                
                <div className="border-t border-border pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="text-foreground text-right">House Cleaning</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">Oct 12, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Professional</span>
                    <span className="text-foreground text-right">Michael Johnson</span>
                  </div>
                  <div className="border-t border-border pt-2 sm:pt-3 flex justify-between text-sm">
                    <span className="text-foreground">Subtotal</span>
                    <span className="text-foreground">AED 225</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (5%)</span>
                    <span className="text-muted-foreground">AED 11.25</span>
                  </div>
                  <div className="border-t border-border pt-2 sm:pt-3 flex justify-between">
                    <span className="text-base sm:text-lg text-foreground">Total</span>
                    <span className="text-base sm:text-lg text-emerald-600 dark:text-emerald-400">AED 236.25</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Note:</strong> The invoice will be downloaded as a PDF file.
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setInvoiceModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDownloadInvoice}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Leave Review Modal */}
        <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Leave a Review</DialogTitle>
              <DialogDescription className="text-sm">
                Share your experience with this service to help others make informed decisions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              {/* Star Rating */}
              <div>
                <label className="block text-sm text-muted-foreground mb-3">Your Rating</label>
                <div className="flex gap-1 sm:gap-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 hover:scale-110 focus:outline-none touch-manipulation"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 text-center sm:text-left">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Your Review (Optional)</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border bg-background text-foreground rounded-lg transition-colors duration-300 min-h-[100px] sm:min-h-[120px] resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {reviewText.length}/500 characters
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Your review helps us:</strong> Maintain high service quality and help other customers make informed decisions.
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setReviewModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                <Star className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Payment Method Modal */}
        <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Add Payment Method</DialogTitle>
              <DialogDescription className="text-sm">
                Enter your card details to add a new payment method.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-5 py-2 sm:py-4">
              {/* Card Number */}
              <div>
                <Label htmlFor="cardNumber" className="text-sm text-muted-foreground mb-2">
                  Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentForm.cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full pl-10 transition-colors duration-300"
                    maxLength={19}
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <Label htmlFor="cardholderName" className="text-sm text-muted-foreground mb-2">
                  Cardholder Name
                </Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={paymentForm.cardholderName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
                  className="w-full transition-colors duration-300"
                />
              </div>

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-sm text-muted-foreground mb-2">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={paymentForm.expiryDate}
                    onChange={handleExpiryDateChange}
                    className="w-full transition-colors duration-300"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm text-muted-foreground mb-2">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={paymentForm.cvv}
                    onChange={handleCvvChange}
                    className="w-full transition-colors duration-300"
                    maxLength={4}
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>🔒 Secure Payment:</strong> Your card information is encrypted and stored securely. We never store your CVV.
                </p>
              </div>

              {/* Card Preview */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-5 sm:p-6 text-white shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-8 bg-yellow-400/30 rounded"></div>
                  <CreditCard className="w-8 h-8 opacity-50" />
                </div>
                <div className="space-y-4">
                  <div className="text-lg sm:text-xl tracking-wider font-mono">
                    {paymentForm.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-70 mb-1">Cardholder Name</div>
                      <div className="text-sm sm:text-base uppercase">
                        {paymentForm.cardholderName || 'YOUR NAME'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70 mb-1">Expires</div>
                      <div className="text-sm sm:text-base">
                        {paymentForm.expiryDate || 'MM/YY'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setPaymentModalOpen(false);
                  setPaymentForm({ cardNumber: '', cardholderName: '', expiryDate: '', cvv: '' });
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddPaymentMethod}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Password Modal */}
        <Dialog open={changePasswordModalOpen} onOpenChange={setChangePasswordModalOpen}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Change Password</DialogTitle>
              <DialogDescription className="text-sm">
                Enter your current password and choose a new secure password.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-5 py-2 sm:py-4">
              {/* Current Password */}
              <div>
                <Label htmlFor="currentPassword" className="text-sm text-muted-foreground mb-2">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full pr-10 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label htmlFor="newPassword" className="text-sm text-muted-foreground mb-2">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full pr-10 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  At least 8 characters
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground mb-2">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full pr-10 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  <strong>Password Requirements:</strong>
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setChangePasswordModalOpen(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setShowPasswords({ current: false, new: false, confirm: false });
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
