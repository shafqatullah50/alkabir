import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, User, Phone, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Home, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../components/ui/badge';
import { servicesData } from '../data/servicesData';

export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [isGuest, setIsGuest] = useState(true);
  const [formData, setFormData] = useState({
    // Step 1: Date & Time
    time: '',
    // Step 2: Contact & Address (minimal)
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dubai',
    notes: '',
  });

  const service = serviceId ? servicesData[serviceId] : null;

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleNext = () => {
    if (step === 1 && (!date || !formData.time)) {
      toast.error('Please select date and time');
      return;
    }
    if (step === 2 && (!formData.name || !formData.phone || !formData.address)) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast.success('🎉 Booking confirmed! Check your email for details.', {
      description: 'Our team will contact you shortly to confirm the service.',
      duration: 5000,
    });
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-foreground mb-4">Service not found</h2>
          <Link to="/categories">
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl text-foreground mb-2">Book Your Service</h1>
              <p className="text-muted-foreground">Quick & easy booking in 3 simple steps</p>
            </div>
          </div>
        </div>

        {/* Modern Progress Indicator */}
        <div className="mb-8 bg-card rounded-2xl shadow-sm p-6 border border-border transition-colors duration-300">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Date & Time', icon: CalendarIcon },
              { num: 2, label: 'Your Details', icon: User },
              { num: 3, label: 'Confirm', icon: CheckCircle }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step >= s.num 
                        ? 'bg-emerald-600 dark:bg-emerald-600 text-white shadow-lg scale-110' 
                        : 'bg-accent text-muted-foreground'
                    }`}>
                      {step > s.num ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span className={`text-xs mt-2 transition-colors ${step >= s.num ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step > s.num ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-border'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border transition-colors duration-300">
              
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl text-foreground mb-1">Choose Your Preferred Date & Time</h2>
                    <p className="text-sm text-muted-foreground">Select when you'd like our team to arrive</p>
                  </div>

                  <div>
                    <Label className="mb-3 block text-base text-foreground">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full flex items-center justify-between px-4 py-3 border-2 border-border rounded-xl bg-background hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors text-left">
                          <div className="flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-foreground">
                              {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Pick a date'}
                            </span>
                          </div>
                          {date && <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Selected</Badge>}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="mb-3 block text-base text-foreground">Select Time Slot</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({...formData, time})}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                            formData.time === time
                              ? 'bg-emerald-600 dark:bg-emerald-600 text-white border-emerald-600 shadow-lg scale-105'
                              : 'bg-card text-foreground border-border hover:border-emerald-300 dark:hover:border-emerald-600 hover:scale-105'
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          <span className="text-xs">{time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact & Address (Minimal) */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl text-foreground mb-1">Your Contact Details</h2>
                    <p className="text-sm text-muted-foreground">We need just a few details to serve you better</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="pl-10 h-12 border-2 border-border bg-background focus:border-emerald-500 dark:focus:border-emerald-400"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          className="pl-10 h-12 border-2 border-border bg-background focus:border-emerald-500 dark:focus:border-emerald-400"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {isGuest && (
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email (Optional)</Label>
                      <div className="relative mt-2">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 h-12 border-2 border-border bg-background focus:border-emerald-500 dark:focus:border-emerald-400"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">For booking confirmation and updates</p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="address" className="text-foreground">Service Address *</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="Building, Street, Area"
                        className="pl-10 h-12 border-2 border-border bg-background focus:border-emerald-500 dark:focus:border-emerald-400"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-foreground">Emirate</Label>
                    <select
                      id="city"
                      className="w-full h-12 px-4 mt-2 border-2 border-border rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-background text-foreground transition-colors"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Umm Al Quwain">Umm Al Quwain</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-foreground">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific requirements, gate codes, parking instructions..."
                      className="mt-2 border-2 border-border bg-background focus:border-emerald-500 dark:focus:border-emerald-400"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-center py-4">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl text-foreground mb-2">Review Your Booking</h2>
                    <p className="text-muted-foreground">Please confirm your service details</p>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-2" />
                      <h3 className="text-lg text-foreground">Booking Summary</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm text-muted-foreground">Service:</span>
                        <span className="text-sm text-foreground text-right">{service.shortName}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm text-muted-foreground">Date:</span>
                        <span className="text-sm text-foreground">{date ? format(date, 'EEEE, MMM d, yyyy') : 'Not selected'}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm text-muted-foreground">Time:</span>
                        <span className="text-sm text-foreground">{formData.time || 'Not selected'}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm text-muted-foreground">Name:</span>
                        <span className="text-sm text-foreground">{formData.name}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm text-muted-foreground">Phone:</span>
                        <span className="text-sm text-foreground">{formData.phone}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm text-muted-foreground">Address:</span>
                        <span className="text-sm text-foreground text-right max-w-xs">{formData.address}, {formData.city}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-base text-foreground">Starting Price:</span>
                        <span className="text-2xl text-emerald-600 dark:text-emerald-400">AED {service.startingPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                    <p className="text-sm text-foreground">
                      <strong>💡 Note:</strong> Final price will be confirmed by our team based on your specific requirements. Payment will be collected after service completion.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                {step > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="border-2 border-border hover:bg-accent transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button 
                    className={`bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg btn-hover-lift ${step === 1 ? 'ml-auto' : ''}`}
                    onClick={handleNext}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    className="ml-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg px-8 btn-hover-lift"
                    onClick={handleSubmit}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Confirm Booking
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Service Info */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-lg p-6 border border-border sticky top-24 transition-colors duration-300">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img 
                  src={service.images[0]?.url} 
                  alt={service.shortName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg text-foreground mb-2">{service.shortName}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
              
              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-auto text-foreground">{service.duration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2">⭐</div>
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="ml-auto text-foreground">{service.rating} ({service.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                  <span className="text-muted-foreground">Bookings:</span>
                  <span className="ml-auto text-foreground">{service.totalBookings}</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
                <div className="flex items-baseline">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <span className="text-2xl text-emerald-600 dark:text-emerald-400 ml-auto">AED {service.startingPrice}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">*Final price may vary based on requirements</p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mr-2" />
                  Company-employed professionals
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mr-2" />
                  100% satisfaction guarantee
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mr-2" />
                  Licensed & insured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
