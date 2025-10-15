import {Search, MapPin} from "lucide-react";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function HeroSection() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (service) {
      navigate("/categories");
    }
  };

  return (
    <section className='relative bg-gradient-to-br from-emerald-50 via-background to-teal-50 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20 py-12 md:py-16 lg:py-24 overflow-hidden transition-colors duration-300'>
      <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10'></div>
      <div className='w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center'>
          {/* Left Content - Mobile First */}
          <div className='text-center lg:text-left'>
            <h1 className='text-foreground mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
              <span className='inline-block'>
                Professional Home & Office Services
              </span>{" "}
              <span
                className='inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-300 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200'
                style={{
                  textShadow: "0 0 40px rgba(16, 185, 129, 0.15)",
                  WebkitTextStroke: "0.5px rgba(16, 185, 129, 0.1)",
                }}>
                Across the UAE
              </span>
              <span className='block h-1 w-24 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 rounded-full mt-3 mx-auto lg:mx-0 animate-in fade-in slide-in-from-left duration-1000 delay-500'></span>
            </h1>
            <p className='text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed'>
              Trusted company-employed professionals for cleaning, repairs,
              plumbing, painting, and more. Quality guaranteed service delivered
              to your doorstep.
            </p>

            {/* Search Bar - Mobile Optimized */}
            <div className='bg-card border border-border rounded-2xl shadow-xl p-3 md:p-4 w-full lg:max-w-2xl mx-auto lg:mx-0'>
              <div className='flex flex-col gap-3'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none' />
                  <Input
                    type='text'
                    placeholder='What service do you need?'
                    className='pl-10 h-12 md:h-14 text-base'
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  />
                </div>
                <div className='relative'>
                  <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none' />
                  <Input
                    type='text'
                    placeholder='Enter your location'
                    className='pl-10 h-12 md:h-14 text-base'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button
                  className='h-12 md:h-14 text-base md:text-lg px-6 md:px-8 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 w-full touch-manipulation'
                  onClick={handleSearch}>
                  Search Services
                </Button>
              </div>
            </div>

            {/* Stats - Mobile Optimized */}
            <div className='grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 w-full lg:max-w-xl mx-auto lg:mx-0'>
              <div className='text-center lg:text-left bg-card/50 dark:bg-card/30 rounded-xl p-3 md:p-4 border border-border/50'>
                <div className='text-2xl md:text-3xl text-emerald-600 dark:text-emerald-400 mb-1'>
                  5K+
                </div>
                <div className='text-xs md:text-sm text-muted-foreground'>
                  Happy Customers
                </div>
              </div>
              <div className='text-center lg:text-left bg-card/50 dark:bg-card/30 rounded-xl p-3 md:p-4 border border-border/50'>
                <div className='text-2xl md:text-3xl text-emerald-600 dark:text-emerald-400 mb-1'>
                  150+
                </div>
                <div className='text-xs md:text-sm text-muted-foreground'>
                  Expert Team
                </div>
              </div>
              <div className='text-center lg:text-left bg-card/50 dark:bg-card/30 rounded-xl p-3 md:p-4 border border-border/50'>
                <div className='text-2xl md:text-3xl text-emerald-600 dark:text-emerald-400 mb-1'>
                  4.8
                </div>
                <div className='text-xs md:text-sm text-muted-foreground'>
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - Hidden on Mobile, Visible on Desktop */}
          <div className='hidden lg:block relative'>
            <div className='relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl'>
              <img
                src='https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
                alt='Professional cleaning services'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent'></div>
              <div className='absolute bottom-6 left-6 right-6 text-white'>
                <h3 className='text-2xl mb-2'>Professional Services</h3>
                <p className='text-sm opacity-90'>
                  Trusted by thousands of customers across UAE
                </p>
              </div>
            </div>

            {/* Floating Card */}
            <div className='absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-xs'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center'>
                  <span className='text-2xl'>✓</span>
                </div>
                <div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    Service Guarantee
                  </div>
                  <div className='text-lg text-gray-900 dark:text-white'>
                    100% Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
