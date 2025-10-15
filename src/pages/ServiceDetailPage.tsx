import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import * as React from 'react';
import { Star, Clock, DollarSign, Shield, CheckCircle, ArrowRight, Award, Users, Wrench, Phone, MapPin, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getServiceById } from '../data/servicesData';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get service data
  const service = serviceId ? getServiceById(serviceId) : undefined;
  
  // If service not found, redirect to categories
  if (!service) {
    return <Navigate to="/categories" replace />;
  }

  // Icon mapping
  const iconMap: Record<string, any> = {
    Users,
    Shield,
    Award,
    Wrench
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section - Optimized for mobile with responsive height */}
      <section className="relative h-[60vh] sm:h-[55vh] md:h-[60vh] overflow-hidden">
        {/* Background Image Carousel - Full Width with proper coverage */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            <ImageWithFallback
              src={service.images[currentImageIndex].url}
              alt={service.images[currentImageIndex].alt}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
            />
          </div>
          {/* Dark Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          {/* Bottom Gradient Overlay - Smooth transition to section below */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-card via-card/95 to-transparent transition-colors duration-300"></div>
        </div>

        {/* Content Container - With site-wide horizontal padding */}
        <div className="relative h-full w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 flex flex-col">
          {/* Navigation Arrows - Optimized for mobile */}
          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-foreground w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg z-10 touch-manipulation active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-foreground w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg z-10 touch-manipulation active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Image Counter - Optimized for mobile */}
          <div className="absolute top-3 right-2 sm:top-4 sm:right-4 md:right-6 lg:right-8 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium z-10 shadow-lg">
            {currentImageIndex + 1} / {service.images.length}
          </div>

          {/* Mobile Thumbnail Indicators - Shows image thumbnails */}
          <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {(() => {
              const totalImages = service.images.length;
              
              // If 3 or fewer images, show all thumbnails
              if (totalImages <= 3) {
                return service.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-md overflow-hidden transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'ring-2 ring-emerald-400 scale-110 shadow-lg'
                        : 'ring-1 ring-white/40 opacity-70 hover:opacity-100 hover:scale-105 active:scale-95'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <ImageWithFallback
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 bg-emerald-400/20 pointer-events-none"></div>
                    )}
                  </button>
                ));
              }
              
              // For more than 3 images, show smart 3-thumbnail system (prev, current, next)
              const thumbnails = [];
              
              // Calculate which 3 images to show
              let start = Math.max(0, currentImageIndex - 1);
              let end = Math.min(totalImages - 1, start + 2);
              
              // Adjust if we're at the end
              if (end - start < 2) {
                start = Math.max(0, end - 2);
              }
              
              for (let i = start; i <= end; i++) {
                const isActive = i === currentImageIndex;
                thumbnails.push(
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-md overflow-hidden transition-all duration-300 ${
                      isActive
                        ? 'ring-2 ring-emerald-400 scale-110 shadow-lg'
                        : 'ring-1 ring-white/40 opacity-70 hover:opacity-100 hover:scale-105 active:scale-95'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  >
                    <ImageWithFallback
                      src={service.images[i].url}
                      alt={service.images[i].alt}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-emerald-400/20 pointer-events-none"></div>
                    )}
                  </button>
                );
              }
              
              return thumbnails;
            })()}
          </div>

          {/* Thumbnail Strip - Desktop/Tablet, inside container */}
          <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 z-10">
            {service.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-16 h-12 lg:w-20 lg:h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'ring-2 ring-emerald-400 scale-110 shadow-lg' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <ImageWithFallback
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Info Section - Below Hero */}
      <section className="bg-card border-b border-border transition-colors duration-300">
        <div className="w-full px-4 py-6 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column - Title & Details */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Popular Service
                </Badge>
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  {service.totalBookings} Bookings
                </Badge>
              </div>

              {/* Title with Gradient */}
              <h1 className="text-foreground mb-4 md:mb-6">
                <span className="inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-300 bg-clip-text text-transparent text-[24px] font-bold">
                  {service.name}
                </span>
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-base md:text-lg text-foreground font-medium">{service.rating}</span>
                  <span className="text-sm md:text-base text-muted-foreground">({service.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-sm md:text-base">
                  <Shield className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground mb-6 leading-relaxed text-base">{service.description}</p>

              {/* Key Highlights */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-emerald-950/30 rounded-xl p-4 md:p-5 mb-6 border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-base md:text-lg text-foreground mb-3 font-semibold">What's Included:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.highlights.slice(0, 6).map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm md:text-base">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & CTA */}
            <div>
              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-accent/50 to-accent/30 dark:from-accent/20 dark:to-accent/10 rounded-xl p-5 md:p-6 mb-5 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Starting from</div>
                    <div className="text-3xl md:text-4xl font-bold">
                      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        {service.currency} {service.startingPrice}
                      </span>
                    </div>
                  </div>
                  <DollarSign className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">*Final price depends on property size and requirements</p>
              </div>

              {/* CTA Buttons - Mobile First */}
              <div className="space-y-3">
                <Link to={`/booking/${service.id}`} className="block">
                  <Button 
                    size="lg" 
                    className="w-full h-12 md:h-14 text-base md:text-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Book This Service Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:+97144XXXXXX" className="block">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full h-12 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <Link to="/contact" className="block">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full h-12 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700"
                    >
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-5 flex items-center justify-center space-x-2 text-xs md:text-sm text-muted-foreground bg-accent/30 dark:bg-accent/10 rounded-lg p-3 border border-border">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Satisfaction Guaranteed • Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All sections below have consistent background */}
      <div className="bg-background">
        {/* Pricing Packages */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-foreground mb-3 md:mb-4">
                <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Transparent Pricing Packages
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">Choose the perfect package for your property size</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {service.pricingPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-xl p-5 md:p-6 ${
                    pkg.popular ? 'ring-2 ring-emerald-600 dark:ring-emerald-400 relative' : 'border border-border'
                  } hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 md:active:scale-100`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-emerald-600 dark:bg-emerald-500 text-white border-0 text-xs md:text-sm">Most Popular</Badge>
                    </div>
                  )}
                  <h3 className="!text-base md:!text-xl mb-2">{pkg.name}</h3>
                  <div className="!text-2xl md:!text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-1">
                    AED {pkg.price}
                  </div>
                  <div className="!text-xs md:!text-sm !mb-4">{pkg.duration} • {pkg.ideal}</div>
                  <ul className="space-y-2 mb-5 md:mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 !text-xs md:!text-sm">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/booking/${service.id}`} className="block">
                    <Button className="w-full h-10 md:h-11 !text-sm md:!text-base bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95 transition-transform">
                      Select Package
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before & After Section */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-foreground mb-3 md:mb-4">
                <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  See the Transformation
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">Real before & after results from our services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {service.beforeAfter.map((item, index) => (
                <div key={index} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <ImageWithFallback
                        src={item.before}
                        alt={`Before ${item.title}`}
                        className="w-full h-40 md:h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Before
                      </div>
                    </div>
                    <div className="relative">
                      <ImageWithFallback
                        src={item.after}
                        alt={`After ${item.title}`}
                        className="w-full h-40 md:h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
                        After
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base md:text-lg text-foreground mb-1 font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits with Images */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-foreground mb-3 md:mb-4">
                <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Why Choose AL-Kabir?
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">The AL-Kabir difference in quality and service</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {service.benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon];
                return (
                  <div key={index} className="group bg-card rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 dark:hover:border-emerald-800 overflow-hidden">
                    {/* Icon Header with Gradient Background */}
                    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 md:p-8 flex items-center justify-center group-hover:from-emerald-100 group-hover:to-teal-100 dark:group-hover:from-emerald-900/40 dark:group-hover:to-teal-900/40 transition-all duration-300">
                      {/* Decorative Circle */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/20 dark:bg-emerald-700/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-teal-200/20 dark:bg-teal-700/10 rounded-full translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                      
                      {/* Icon Container */}
                      <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-base md:text-lg text-foreground mb-2 font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 fill-emerald-700 dark:fill-emerald-400" />
                <span className="text-sm">{service.rating} Average Rating • {service.reviewCount} Reviews</span>
              </div>
              <h2 className="text-foreground mb-3 md:mb-4">
                <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Customer Reviews from UAE
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real reviews from real customers who trusted AL-Kabir for their {service.name.toLowerCase()} needs
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {service.customerReviews.map((review) => (
                  <CarouselItem key={review.id} className="pl-3 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3">
                    <div className="bg-card rounded-xl p-4 md:p-6 relative hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border">
                      <Quote className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 text-emerald-100 dark:text-emerald-900/30" />
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <ImageWithFallback
                            src={review.image || `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400`}
                            alt={review.name}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-emerald-100 dark:border-emerald-900/50"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <h4 className="!text-sm md:!text-base !mb-0">{review.name}</h4>
                              {review.verified && (
                                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600 dark:text-emerald-400" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 !text-xs !mb-0">
                              <MapPin className="w-3 h-3" />
                              <span>{review.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-0.5 md:gap-1 mb-2 md:mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Property Type Badge */}
                      <div className="flex items-center gap-2 mb-2 md:mb-3">
                        <Badge className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 !text-xs">
                          {service.shortName}
                        </Badge>
                        <span className="!text-xs !mb-0">{review.propertyType}</span>
                      </div>

                      {/* Comment */}
                      <p className="!text-xs md:!text-sm leading-relaxed relative z-10 flex-1 mb-2 md:mb-3">
                        "{review.comment}"
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-border">
                        <span className="!text-xs !mb-0">{review.date}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="!text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>

            <div className="text-center mt-6 md:mt-8">
              <p className="text-muted-foreground mb-4">See what our customers are saying</p>
              <Button 
                variant="outline" 
                size="lg"
                className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700"
              >
                View All {service.reviewCount} Reviews
              </Button>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-foreground mb-3 md:mb-4">
                <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Related Services
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">Complete your needs with these services</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {service.relatedServices.map((related) => (
                <Link key={related.id} to={`/service/${related.id}`} className="group block">
                  <div className="bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 dark:hover:border-emerald-800 active:scale-95 md:active:scale-100">
                    <div className="relative h-40 md:h-52 overflow-hidden">
                      <ImageWithFallback
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      
                      {/* Verified Badge */}
                      <div className="absolute top-2 right-2 md:top-3 md:right-3">
                        <Badge className="bg-emerald-500 dark:bg-emerald-600 text-white border-0 shadow-lg !text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg px-2 py-1 md:px-2.5 md:py-1.5 shadow-lg">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="!text-xs md:!text-sm !mb-0">{related.rating || '4.8'}</span>
                          <span className="!text-xs !mb-0">({related.reviewCount || '500+'})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-5">
                      <h3 className="!text-sm md:!text-lg mb-2">{related.name}</h3>
                      <p className="!text-xs md:!text-sm mb-3 md:mb-4 line-clamp-2">{related.description}</p>
                      
                      {/* Service Details */}
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 !text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          <span>1-2 hrs</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/30"></div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          <span>2.3k+ served</span>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-border">
                        <div>
                          <p className="!text-xs !mb-0.5">Starting from</p>
                          <p className="!text-base md:!text-lg !mb-0 text-emerald-600 dark:text-emerald-400">AED {related.price}</p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-full p-2 md:p-2.5 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-foreground mb-3 md:mb-4">
                <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">Everything you need to know about our service</p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-xl overflow-hidden">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-4 md:px-6 py-4 text-left hover:no-underline hover:bg-accent/50 transition-colors">
                    <span className="text-sm md:text-base text-foreground font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 pb-4 text-sm md:text-base text-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      {/* Final CTA - Outside consistent background */}
      <section className="py-8 md:py-12 transition-colors duration-300">
        <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8">
          {/* Card Container */}
          <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-400/10 rounded-full"></div>
            
            {/* Content */}
            <div className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-bold">Ready to Experience {service.shortName}?</h2>
              <p className="text-lg md:text-xl text-emerald-100 dark:text-emerald-200 mb-6 md:mb-8 max-w-3xl mx-auto">
                Book now and get professional service with AL-Kabir's expert team
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-2xl mx-auto">
                <Link to={`/booking/${service.id}`} className="w-full sm:w-auto flex-1">
                  <Button 
                    size="lg" 
                    className="w-full h-12 md:h-14 text-base md:text-lg bg-white text-emerald-600 hover:bg-gray-100 dark:bg-white dark:text-emerald-700 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Book Service Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+97144XXXXXX" className="w-full sm:w-auto flex-1">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full h-12 md:h-14 text-base md:text-lg border-2 border-white text-white hover:bg-white/10 dark:hover:bg-white/20 hover:scale-105 transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call +971 4 XXX XXXX
                  </Button>
                </a>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-emerald-100 dark:text-emerald-200 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Available 7 days a week</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-emerald-300"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Same-day service available</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-emerald-300"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>100% Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
