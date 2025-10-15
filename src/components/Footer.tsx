import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 transition-colors duration-300">
      <div className="w-full px-4 py-8 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info - Mobile First */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg md:rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white text-lg md:text-xl">AK</span>
              </div>
              <span className="text-lg md:text-xl font-semibold text-white">AL-Kabir</span>
            </div>
            <p className="text-sm mb-4 leading-relaxed">
              Your trusted partner for all home and office services across the UAE. Professional, reliable, and affordable.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a href="#" className="hover:text-emerald-400 transition-all duration-300 hover:scale-110 transform touch-manipulation" aria-label="Facebook">
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-all duration-300 hover:scale-110 transform touch-manipulation" aria-label="Twitter">
                <Twitter className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-all duration-300 hover:scale-110 transform touch-manipulation" aria-label="Instagram">
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-all duration-300 hover:scale-110 transform touch-manipulation" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 md:h-6" />
              </a>
            </div>
          </div>

          {/* Services - Enhanced Design */}
          <div>
            <h3 className="text-white text-base md:text-lg mb-4 md:mb-5 font-semibold relative inline-block">
              Popular Services
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></span>
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/service/cleaning" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">House Cleaning</span>
                </Link>
              </li>
              <li className="text-[14px]">
                <Link to="/service/plumbing" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Plumbing</span>
                </Link>
              </li>
              <li>
                <Link to="/service/electrical" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Electrical Work</span>
                </Link>
              </li>
              <li>
                <Link to="/service/painting" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Painting</span>
                </Link>
              </li>
              <li>
                <Link to="/service/handyman" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Handyman</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/categories" className="group flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-all duration-300 touch-manipulation">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">View All Services →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Enhanced Design */}
          <div>
            <h3 className="text-white text-base md:text-lg mb-4 md:mb-5 font-semibold relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></span>
            </h3>
            <div className="grid grid-cols-1 gap-1 text-sm">
              <Link to="/about" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
              </Link>
              <Link to="/blog" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Blog</span>
              </Link>
              <Link to="/faq" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">FAQ</span>
              </Link>
              <Link to="/contact" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
              </Link>
              <Link to="/privacy-policy" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
              </Link>
              <Link to="/terms" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Terms of Service</span>
              </Link>
              <Link to="/refund-policy" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Refund Policy</span>
              </Link>
              <Link to="/careers" className="group flex items-center hover:text-emerald-400 transition-all duration-300 touch-manipulation">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300 mr-2.5"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Careers</span>
              </Link>
            </div>
          </div>

          {/* Contact Info - Mobile First */}
          <div>
            <h3 className="text-white text-base md:text-lg mb-4 md:mb-5 font-semibold relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></span>
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span className="leading-relaxed">+971 4 XXX XXXX<br />+971 50 XXX XXXX</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span className="leading-relaxed">info@alkabir.ae</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span className="leading-relaxed">Dubai, United Arab Emirates</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-800 dark:border-gray-700">
              <p className="text-sm font-medium text-emerald-400">24/7 Customer Support</p>
              <p className="text-xs text-gray-400 mt-1">We're always here to help</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Mobile First */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-6 md:pt-8 text-sm text-center">
          <p className="text-gray-400">&copy; {currentYear} AL-Kabir Services LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
