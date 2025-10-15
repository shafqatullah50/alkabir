import { Link } from 'react-router-dom';
import { Star, BadgeCheck, Users, ArrowRight, Wrench } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const serviceTeams = [
  {
    id: 'cleaning',
    serviceName: 'House Cleaning Services',
    description: 'Professional cleaning teams for spotless results',
    teamSize: '50+ Cleaners',
    rating: 4.8,
    reviews: 847,
    completedJobs: '5,200+',
    startingPrice: 199,
    specialties: ['Deep Cleaning', 'Regular Maintenance', 'Move In/Out'],
    location: 'All UAE Emirates',
    verified: true,
    image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZyUyMHRlYW18ZW58MXx8fHwxNzYwMzg4MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badgeColor: 'bg-emerald-600',
  },
  {
    id: 'plumbing',
    serviceName: 'Plumbing Services',
    description: 'Licensed plumbers for all your plumbing needs',
    teamSize: '35+ Plumbers',
    rating: 4.9,
    reviews: 654,
    completedJobs: '3,800+',
    startingPrice: 149,
    specialties: ['Leak Repairs', 'Installations', 'Emergency Service'],
    location: 'Dubai, Abu Dhabi & More',
    verified: true,
    image: 'https://images.unsplash.com/photo-1568139510872-a900ba9b46da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd29ya2VyJTIwdW5pZm9ybXxlbnwxfHx8fDE3NjA0Mjc3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badgeColor: 'bg-blue-600',
  },
  {
    id: 'electrical',
    serviceName: 'Electrical Services',
    description: 'Certified electricians for safe electrical work',
    teamSize: '30+ Electricians',
    rating: 4.9,
    reviews: 523,
    completedJobs: '2,900+',
    startingPrice: 149,
    specialties: ['Installations', 'Repairs', 'Safety Inspections'],
    location: 'Serving All UAE',
    verified: true,
    image: 'https://images.unsplash.com/photo-1660330589693-99889d60181e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwNDI2MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badgeColor: 'bg-yellow-600',
  },
  {
    id: 'painting',
    serviceName: 'Painting Services',
    description: 'Expert painters for interior & exterior projects',
    teamSize: '25+ Painters',
    rating: 4.7,
    reviews: 432,
    completedJobs: '2,100+',
    startingPrice: 899,
    specialties: ['Interior Painting', 'Exterior Work', 'Color Consultation'],
    location: 'Dubai & Surrounding Areas',
    verified: true,
    image: 'https://images.unsplash.com/photo-1752649935095-ac8f23ec446b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDM3MDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badgeColor: 'bg-purple-600',
  },
  {
    id: 'handyman',
    serviceName: 'Handyman Services',
    description: 'Versatile handymen for all home repairs',
    teamSize: '20+ Handymen',
    rating: 4.8,
    reviews: 389,
    completedJobs: '1,800+',
    startingPrice: 99,
    specialties: ['Furniture Assembly', 'Repairs', 'Installations'],
    location: 'All Major Cities',
    verified: true,
    image: 'https://images.unsplash.com/photo-1611134313089-c28c32796751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5keW1hbiUyMHRvb2xzJTIwd29ya3xlbnwxfHx8fDE3NjAzNTMzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badgeColor: 'bg-orange-600',
  },
];

export default function FeaturedProfessionals() {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/30 to-emerald-50/20 dark:from-accent/20 dark:to-emerald-950/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm">Company-Employed Teams</span>
          </div>
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
            Meet Our Professional Service Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All our service professionals are directly employed, trained, and certified by AL-Kabir for consistent quality and reliability
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mb-8"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {serviceTeams.map((team) => (
              <CarouselItem key={team.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link to={`/service/${team.id}`} className="block h-full">
                  <div className="bg-card rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-border h-full flex flex-col card-hover">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageWithFallback
                    src={team.image}
                    alt={team.serviceName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge className={`${team.badgeColor} text-white border-0`}>
                        {team.teamSize}
                      </Badge>
                    </div>
                  </div>
                  {team.verified && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white rounded-full p-1.5 shadow-lg">
                      <BadgeCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg text-foreground mb-1">{team.serviceName}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{team.description}</p>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-foreground">{team.rating}</span>
                    <span className="text-sm text-muted-foreground">({team.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3 text-xs">
                    <Badge variant="secondary" className="text-xs">
                      <Wrench className="w-3 h-3 mr-1" />
                      {team.completedJobs} Jobs
                    </Badge>
                  </div>

                  {/* Specialties */}
                  <div className="mb-3 flex-1">
                    <div className="flex flex-wrap gap-1">
                      {team.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-accent dark:bg-accent/50 text-foreground px-2 py-1 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                    <div>
                      <span className="text-xs text-muted-foreground">Starting from</span>
                      <div className="text-lg text-emerald-600 dark:text-emerald-400">AED {team.startingPrice}</div>
                    </div>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 group-hover:translate-x-1 transition-transform">
                      Book
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12" />
      <CarouselNext className="hidden md:flex -right-12" />
    </Carousel>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl shadow-lg p-8 mb-8 border border-border transition-colors duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl text-emerald-600 dark:text-emerald-400 mb-2">160+</div>
              <div className="text-sm text-muted-foreground">Company Employees</div>
            </div>
            <div>
              <div className="text-3xl text-emerald-600 dark:text-emerald-400 mb-2">15,800+</div>
              <div className="text-sm text-muted-foreground">Jobs Completed</div>
            </div>
            <div>
              <div className="text-3xl text-emerald-600 dark:text-emerald-400 mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl text-emerald-600 dark:text-emerald-400 mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Company Employed</div>
            </div>
          </div>
        </div>

        {/* Why Our Teams Section */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 rounded-2xl p-8 text-white mb-8 transition-colors duration-300">
          <h3 className="text-2xl mb-6 text-center">Why Choose AL-Kabir Service Teams?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg mb-2">Fully Vetted</h4>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">Background checks, training & certifications for all team members</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg mb-2">Company Employed</h4>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">All professionals are AL-Kabir employees, not freelancers</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="text-lg mb-2">Consistent Quality</h4>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">Standardized training ensures reliable service every time</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/categories">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
