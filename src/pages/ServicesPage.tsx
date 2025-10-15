import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
  Star,
  Clock,
  Shield,
  ArrowRight,
  Users,
  Search,
  Filter,
} from "lucide-react";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import {Tabs, TabsList, TabsTrigger} from "../components/ui/tabs";
import {Badge} from "../components/ui/badge";
import {servicesApi, Service} from "../utils/appwrite/mockApis";
import {Skeleton} from "../components/ui/skeleton";
import {ImageWithFallback} from "../components/figma/ImageWithFallback";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "home" | "office" | "both">(
    "all"
  );
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className='min-h-screen bg-background transition-colors duration-300'>
      {/* Header - Mobile Optimized */}
      <div className='bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white py-10 md:py-16 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center'>
            Professional Services
          </h1>
          <p className='text-lg md:text-xl text-emerald-100 dark:text-emerald-200 text-center max-w-3xl mx-auto'>
            Discover our complete range of professional services designed to
            meet all your home and office needs
          </p>
        </div>
      </div>

      {/* Filters - Mobile Optimized */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8'>
        <div className='bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-border'>
          <div className='flex flex-col gap-3 md:gap-4'>
            {/* Search Bar */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground pointer-events-none' />
              <Input
                type='text'
                placeholder='Search services...'
                className='pl-9 md:pl-10 h-11 md:h-12 text-sm md:text-base'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <Tabs
              value={filter}
              onValueChange={(v: string) =>
                setFilter(v as "all" | "home" | "office" | "both")
              }
              className='w-full'>
              <TabsList className='grid w-full grid-cols-3 h-10 md:h-12'>
                <TabsTrigger value='all' className='text-xs md:text-sm'>
                  All Services
                </TabsTrigger>
                <TabsTrigger value='home' className='text-xs md:text-sm'>
                  Home Services
                </TabsTrigger>
                <TabsTrigger value='office' className='text-xs md:text-sm'>
                  Office Services
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Results Count */}
            {!loading && (
              <div className='text-center text-sm text-muted-foreground'>
                {filteredServices.length} service
                {filteredServices.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>
        </div>

        {/* Services Grid - Using ServiceDetailPage card design */}
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-12 md:pb-16'>
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className='bg-card border border-border rounded-xl md:rounded-2xl overflow-hidden'>
                <Skeleton className='w-full h-40 md:h-52' />
                <div className='p-4 md:p-5'>
                  <Skeleton className='h-5 md:h-6 w-3/4 mb-2' />
                  <Skeleton className='h-4 w-full mb-1' />
                  <Skeleton className='h-4 w-2/3 mb-3 md:mb-4' />
                  <div className='flex items-center gap-2 md:gap-3 mb-3 md:mb-4'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-3 w-20' />
                  </div>
                  <div className='flex items-center justify-between pt-2 md:pt-3 border-t border-border'>
                    <div>
                      <Skeleton className='h-3 w-16 mb-1' />
                      <Skeleton className='h-5 w-20' />
                    </div>
                    <Skeleton className='w-9 h-9 md:w-10 md:h-10 rounded-full' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-12 md:pb-16'>
            {filteredServices.map((service) => (
              <Link
                key={service.id}
                to={`/service/${service.slug}`}
                className='group block'>
                <div className='bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 dark:hover:border-emerald-800 active:scale-95 md:active:scale-100'>
                  <div className='relative h-40 md:h-52 overflow-hidden'>
                    {/* Service Image - Using fallback for mock data */}
                    <div className='w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500'>
                      <div className='text-emerald-600 dark:text-emerald-400 text-4xl md:text-6xl opacity-50'>
                        {service.icon === "Sparkles"
                          ? "✨"
                          : service.icon === "Wrench"
                          ? "🔧"
                          : service.icon === "Droplets"
                          ? "💧"
                          : service.icon === "Zap"
                          ? "⚡"
                          : service.icon === "Bug"
                          ? "🐛"
                          : service.icon === "PaintBucket"
                          ? "🎨"
                          : service.icon === "Truck"
                          ? "🚚"
                          : service.icon === "Package"
                          ? "📦"
                          : service.icon === "Wind"
                          ? "💨"
                          : service.icon === "Computer"
                          ? "💻"
                          : service.icon === "Trees"
                          ? "🌳"
                          : service.icon === "Hammer"
                          ? "🔨"
                          : service.icon === "Refrigerator"
                          ? "🧊"
                          : service.icon === "Car"
                          ? "🚗"
                          : "🏠"}
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300'></div>

                    {/* Verified Badge */}
                    <div className='absolute top-2 right-2 md:top-3 md:right-3'>
                      <Badge className='bg-emerald-500 dark:bg-emerald-600 text-white border-0 shadow-lg !text-xs'>
                        <Shield className='w-3 h-3 mr-1' />
                        Verified
                      </Badge>
                    </div>

                    {/* Rating Badge */}
                    {service.rating && service.rating > 0 && (
                      <div className='absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg px-2 py-1 md:px-2.5 md:py-1.5 shadow-lg'>
                        <div className='flex items-center gap-1'>
                          <Star className='w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400' />
                          <span className='text-xs md:text-sm font-medium text-foreground'>
                            {service.rating}
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            ({service.reviews_count}+)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='p-4 md:p-5'>
                    <h3 className='text-base md:text-lg font-semibold text-foreground mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors'>
                      {service.name}
                    </h3>
                    <p className='text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2'>
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className='flex items-center gap-2 md:gap-3 mb-3 md:mb-4 text-xs text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-3 h-3 md:w-3.5 md:h-3.5' />
                        <span>1-2 hrs</span>
                      </div>
                      <div className='w-1 h-1 rounded-full bg-muted-foreground/30'></div>
                      <div className='flex items-center gap-1'>
                        <Users className='w-3 h-3 md:w-3.5 md:h-3.5' />
                        <span>Professional team</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className='flex items-center justify-between pt-2 md:pt-3 border-t border-border'>
                      <div>
                        <p className='text-xs text-muted-foreground mb-0.5'>
                          Starting from
                        </p>
                        <p className='text-base md:text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-0'>
                          {service.price_from
                            ? `AED ${service.price_from}`
                            : "Contact for quote"}
                        </p>
                      </div>
                      <div className='bg-emerald-50 dark:bg-emerald-950/30 rounded-full p-2 md:p-2.5 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors'>
                        <ArrowRight className='w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform' />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State - Mobile Optimized */}
        {!loading && filteredServices.length === 0 && (
          <div className='text-center py-12 md:py-16'>
            <div className='bg-card border border-border rounded-xl p-8 md:p-12 max-w-md mx-auto'>
              <Search className='w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground opacity-50' />
              <h3 className='text-lg md:text-xl font-semibold text-foreground mb-2'>
                No Services Found
              </h3>
              <p className='text-sm md:text-base text-muted-foreground mb-4'>
                We couldn't find any services matching "{searchQuery}". Try a
                different search term or browse all services.
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                variant='outline'
                className='border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'>
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Featured Services CTA */}
        {!loading && filteredServices.length > 0 && (
          <section className='py-8 md:py-12'>
            <div className='bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center relative overflow-hidden'>
              {/* Decorative Elements */}
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16'></div>
              <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12'></div>

              <div className='relative'>
                <h2 className='text-2xl md:text-3xl font-bold mb-3 md:mb-4'>
                  Need Something Specific?
                </h2>
                <p className='text-emerald-100 dark:text-emerald-200 mb-6 md:mb-8 max-w-2xl mx-auto'>
                  Can't find what you're looking for? Contact our team for
                  custom service solutions tailored to your needs.
                </p>
                <div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto'>
                  <Button
                    asChild
                    size='lg'
                    className='bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <Link to='/contact'>Get Custom Quote</Link>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    size='lg'
                    className='border-white/30 text-white hover:bg-white/10 hover:border-white/50'>
                    <Link to='/categories'>Browse Categories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
