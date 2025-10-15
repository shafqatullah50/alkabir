import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Wrench, Droplets, Zap, Bug, PaintBucket, Truck, Package,
  Wind, Computer, Trees, Hammer, Refrigerator, Car, Filter, Search,
  Star, ArrowRight
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { servicesApi, Service } from '../utils/supabase/client';
import { Skeleton } from '../components/ui/skeleton';

// Icon mapping helper
const getIconComponent = (iconName: string | null) => {
  if (!iconName) return Sparkles;
  const Icon = (LucideIcons as any)[iconName];
  return Icon || Sparkles;
};

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'home' | 'office' | 'both'>('all');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (service.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header - Mobile Optimized */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white py-10 md:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-3 md:mb-4 text-center">All Services</h1>
          <p className="text-emerald-100 dark:text-emerald-200 text-center max-w-2xl mx-auto">
            Browse our complete catalog of professional services for your home and office
          </p>
        </div>
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8">
        <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-border">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search services..."
                className="pl-9 md:pl-10 h-11 md:h-12 text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Tabs */}
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-10 md:h-12">
                <TabsTrigger value="all" className="text-xs md:text-sm">All Services</TabsTrigger>
                <TabsTrigger value="home" className="text-xs md:text-sm">Home</TabsTrigger>
                <TabsTrigger value="office" className="text-xs md:text-sm">Office</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Services Grid - Mobile Optimized */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-12 md:pb-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <Skeleton className="w-14 h-14 md:w-16 md:h-16 rounded-full mx-auto mb-3 md:mb-4" />
                <Skeleton className="h-5 md:h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-12 md:pb-16">
            {filteredServices.map((service) => {
              const Icon = getIconComponent(service.icon);
              return (
                <Link
                  key={service.id}
                  to={`/service/${service.slug}`}
                  className="group block"
                >
                  <div className="bg-card border border-border rounded-xl p-5 md:p-6 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 h-full active:scale-95 md:active:scale-100">
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 md:w-8 md:h-8" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="!text-base md:!text-lg text-center mb-2">{service.name}</h3>
                      
                      {/* Description */}
                      <p className="!text-sm text-center flex-1 mb-3 line-clamp-2">{service.description}</p>
                      
                      {/* Price and Rating */}
                      <div className="space-y-2">
                        {service.price_from && (
                          <p className="!text-sm md:!text-base text-center !mb-0">
                            <span className="text-emerald-600 dark:text-emerald-400">From AED {service.price_from}</span>
                          </p>
                        )}
                        {service.rating && service.rating > 0 && (
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                            <span className="!text-xs md:!text-sm !mb-0">
                              {service.rating} ({service.reviews_count} reviews)
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* CTA */}
                      <div className="mt-3 md:mt-4 text-center">
                        <span className="!text-xs md:!text-sm text-emerald-600 dark:text-emerald-400 group-hover:underline inline-flex items-center gap-1">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State - Mobile Optimized */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-md mx-auto">
              <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="!text-lg md:!text-xl mb-2">No Services Found</h3>
              <p className="!text-sm md:!text-base !mb-4">
                We couldn't find any services matching "{searchQuery}". Try a different search term.
              </p>
              <Button 
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="border-emerald-200 dark:border-emerald-800"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
