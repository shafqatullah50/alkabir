import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Sparkles, Droplet, Zap, Paintbrush, Wrench, LogOut, LayoutDashboard, Sun, Moon, Settings, Heart, Bell, CreditCard, MapPin, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

// Top 5 services for dropdown menu
const topServices = [
  {
    id: 'cleaning',
    name: 'House Cleaning',
    description: 'Professional cleaning for spotless homes',
    icon: Sparkles,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    price: 'From AED 199'
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    description: 'Expert plumbers for all your needs',
    icon: Droplet,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    price: 'From AED 149'
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    description: 'Licensed electricians for safe work',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    price: 'From AED 149'
  },
  {
    id: 'painting',
    name: 'Painting Services',
    description: 'Quality painting for beautiful spaces',
    icon: Paintbrush,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    price: 'From AED 899'
  },
  {
    id: 'handyman',
    name: 'Handyman Services',
    description: 'Versatile handymen for all repairs',
    icon: Wrench,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    price: 'From AED 99'
  }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Services', path: '/categories', hasDropdown: true },
    { name: 'About', path: '/about', hasDropdown: false },
    { name: 'Blog', path: '/blog', hasDropdown: false },
    { name: 'FAQ', path: '/faq', hasDropdown: false },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm transition-colors duration-300">
      <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo - Mobile First */}
          <Link to="/" className="flex items-center space-x-1.5 md:space-x-2 group flex-shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg md:rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white text-lg md:text-xl">AK</span>
            </div>
            <span className="text-lg md:text-xl font-semibold text-foreground">AL-Kabir</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setServicesDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setServicesDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        servicesDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </Link>

                {/* Services Dropdown */}
                {link.hasDropdown && servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-b border-border">
                      <h3 className="text-sm text-foreground">Popular Services</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Company-employed professionals</p>
                    </div>
                    <div className="py-2">
                      {topServices.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.id}
                            to={`/service/${service.id}`}
                            className="flex items-start space-x-3 px-4 py-3 hover:bg-accent transition-all duration-200 group rounded-lg mx-2"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            <div className={`${service.bgColor} dark:bg-opacity-20 ${service.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {service.name}
                                </h4>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {service.description}
                              </p>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                                {service.price}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="p-3 bg-accent/50 border-t border-border">
                      <Link
                        to="/categories"
                        className="block text-center text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-400" />
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:bg-gray-100">
                    <User className="w-4 h-4 mr-2" />
                    {profile?.full_name || 'My Account'}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="hover:bg-accent hover:text-foreground">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Mobile First */}
          <div className="flex md:hidden items-center space-x-1">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-10 w-10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            
            <button
              className="p-2 rounded-full hover:bg-accent transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Optimized for Touch */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-1 pb-safe">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 touch-manipulation ${
                      location.pathname === link.path
                        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent active:bg-accent/80'
                    }`}
                    onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                  >
                    <span className="text-base">{link.name}</span>
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Mobile Services List - Touch Optimized */}
                  {link.hasDropdown && (
                    <div className="mt-2 ml-2 space-y-1 bg-accent/30 rounded-xl p-2">
                      {topServices.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.id}
                            to={`/service/${service.id}`}
                            className="flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-accent active:bg-accent/80 transition-all duration-300 touch-manipulation"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className={`${service.bgColor} dark:bg-opacity-20 ${service.color} p-2.5 rounded-xl flex-shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-foreground">{service.name}</h4>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{service.price}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/dashboard');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
