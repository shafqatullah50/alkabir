import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Wrench, 
  Droplets, 
  Zap, 
  Bug, 
  PaintBucket, 
  Truck, 
  Package,
  Wind,
  Computer,
  Trees,
  Hammer,
  Refrigerator,
  Car,
  ArrowRight
} from 'lucide-react';

const categories = [
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'repairs', name: 'Repairs', icon: Wrench, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: 'plumbing', name: 'Plumbing', icon: Droplets, color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'pest-control', name: 'Pest Control', icon: Bug, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  { id: 'painting', name: 'Painting', icon: PaintBucket, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'moving', name: 'Moving', icon: Truck, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  { id: 'assembly', name: 'Assembly', icon: Package, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { id: 'deep-cleaning', name: 'Deep Cleaning', icon: Wind, color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { id: 'it-support', name: 'IT Support', icon: Computer, color: 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400' },
  { id: 'gardening', name: 'Gardening', icon: Trees, color: 'bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400' },
  { id: 'handyman', name: 'Handyman', icon: Hammer, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  { id: 'appliance', name: 'Appliance Repair', icon: Refrigerator, color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' },
  { id: 'car-wash', name: 'Car Wash', icon: Car, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12 md:py-16 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="mb-3 md:mb-4">
            Popular Service Categories
          </h2>
          <p className="max-w-2xl mx-auto">
            Browse our wide range of professional services for your home and office
          </p>
        </div>

        {/* Category Cards Grid */}
        {/* Mobile: Show only 3 cards */}
        <div className="grid grid-cols-3 gap-3 mb-6 md:hidden">
          {categories.slice(0, 3).map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/service/${category.id}`}
                className="group block"
              >
                <div className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                  <div className={`${category.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xs leading-tight">{category.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tablet & Desktop: Show all cards */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/service/${category.id}`}
                className="group"
              >
                <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1 card-hover">
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm">{category.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Button */}
        {/* Mobile: Prominent button */}
        <div className="md:hidden">
          <Link to="/categories" className="block">
            <button className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-4 px-6 rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Desktop: Text link */}
        <div className="hidden md:block text-center">
          <Link to="/categories">
            <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline transition-colors inline-flex items-center gap-2">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
