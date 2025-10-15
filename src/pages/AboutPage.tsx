import { Users, Target, Award, TrendingUp, Shield, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Verified Professionals', value: '500+', icon: Shield },
    { label: 'Services Completed', value: '50,000+', icon: Award },
    { label: 'Cities Served', value: '50+', icon: TrendingUp },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Every professional is thoroughly vetted and background-checked for your peace of mind.',
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'We maintain the highest standards and ensure 100% satisfaction on every job.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond for our customers.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1530233173487-849dc2a4a090?w=400' },
    { name: 'Michael Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1530233173487-849dc2a4a090?w=400' },
    { name: 'Emily Davis', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1530233173487-849dc2a4a090?w=400' },
    { name: 'David Martinez', role: 'Head of Customer Success', image: 'https://images.unsplash.com/photo-1530233173487-849dc2a4a090?w=400' },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl mb-6">About AL-Kabir</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-3xl mx-auto">
              We're on a mission to make professional home and office services accessible, 
              reliable, and affordable for everyone across the UAE.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-3xl text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  AL-Kabir was founded with a simple vision: to revolutionize how people 
                  access and book professional services for their homes and offices in the UAE.
                </p>
                <p>
                  We noticed that finding reliable, company-employed professionals was time-consuming and 
                  stressful. So we built AL-Kabir with our own trained staff, making the entire process seamless and trustworthy.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers across all 7 Emirates, with a 
                  network of over 150 skilled professionals ready to help with everything from 
                  cleaning to repairs.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1530233173487-849dc2a4a090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwaG9tZSUyMHNlcnZpY2V8ZW58MXx8fHwxNzYwNDIyODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our team"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <Target className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-2xl text-foreground mb-4">Our Mission</h3>
              <p className="text-foreground leading-relaxed">
                To empower people across the UAE by providing instant access to company-employed, trained professionals 
                that make their lives easier and their spaces better. We strive to provide 
                stable employment for skilled professionals while delivering exceptional value to 
                our customers.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-2xl text-foreground mb-4">Our Vision</h3>
              <p className="text-foreground leading-relaxed">
                To become the most trusted and comprehensive platform for home and office services 
                nationwide. We envision a future where quality service is accessible to everyone, 
                and skilled professionals can build thriving businesses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The dedicated people behind AL-Kabir
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-4 shadow-lg"
                />
                <h4 className="text-lg text-foreground mb-1">{member.name}</h4>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
