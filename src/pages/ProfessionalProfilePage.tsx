import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, BadgeCheck, Calendar, DollarSign, Award, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function ProfessionalProfilePage() {
  const { professionalId } = useParams();

  const professional = {
    id: professionalId,
    name: 'Michael Johnson',
    specialty: 'Plumbing Expert',
    bio: 'Certified plumber with over 10 years of experience in residential and commercial plumbing. Specializing in repairs, installations, and emergency services. Licensed and insured.',
    rating: 4.9,
    reviews: 156,
    completedJobs: 450,
    hourlyRate: 75,
    location: 'New York, NY',
    verified: true,
    joinedDate: 'January 2020',
    responseTime: '< 1 hour',
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNDIyODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Pipe Repair', 'Drain Cleaning', 'Water Heater Installation', 'Emergency Services', 'Leak Detection'],
    certifications: ['Licensed Plumber', 'EPA Certified', 'OSHA Safety Trained'],
  };

  const reviews = [
    {
      id: 1,
      name: 'Jennifer Smith',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Michael was fantastic! Fixed our leaking pipe quickly and professionally. Very knowledgeable and explained everything clearly. Highly recommend!',
    },
    {
      id: 2,
      name: 'Robert Brown',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent service. Arrived on time, completed the work efficiently, and cleaned up afterwards. Will definitely hire again.',
    },
    {
      id: 3,
      name: 'Lisa Garcia',
      rating: 4,
      date: '2 months ago',
      comment: 'Great work on our water heater installation. Very professional and courteous. Price was fair.',
    },
  ];

  const portfolio = [
    { id: 1, title: 'Kitchen Sink Installation', image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400' },
    { id: 2, title: 'Bathroom Renovation', image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400' },
    { id: 3, title: 'Emergency Leak Repair', image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <ImageWithFallback
                  src={professional.image}
                  alt={professional.name}
                  className="w-48 h-48 rounded-xl object-cover"
                />
                {professional.verified && (
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white rounded-full p-3 shadow-lg">
                    <BadgeCheck className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl text-gray-900 mb-2">{professional.name}</h1>
                  <p className="text-lg text-gray-600 mb-3">{professional.specialty}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg text-gray-900">{professional.rating}</span>
                      <span className="text-gray-600">({professional.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{professional.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <div className="text-3xl text-blue-600 mb-1">${professional.hourlyRate}/hr</div>
                  <Link to={`/booking/plumbing`}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Jobs Completed</span>
                  </div>
                  <div className="text-2xl text-gray-900">{professional.completedJobs}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Response Time</span>
                  </div>
                  <div className="text-xl text-gray-900">{professional.responseTime}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <div className="text-lg text-gray-900">{professional.joinedDate}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="text-sm">Verified</span>
                  </div>
                  <div className="text-lg text-green-600">Yes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({professional.reviews})</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl text-gray-900 mb-4">About Me</h2>
                  <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl text-gray-900 mb-4">Services Offered</h2>
                  <div className="flex flex-wrap gap-2">
                    {professional.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {professional.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg text-gray-900 mb-3">Ready to book?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get professional service with guaranteed satisfaction
                  </p>
                  <Link to={`/booking/plumbing`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Book {professional.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg text-gray-900">{review.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-gray-900">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
