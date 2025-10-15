import { Shield, Clock, Award, Users, CheckCircle, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Company-Employed Staff',
    description: 'All our professionals are directly employed, trained, and certified by AL-Kabir - not independent contractors'
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Every service comes with our satisfaction guarantee and professional standards'
  },
  {
    icon: Clock,
    title: 'On-Time Service',
    description: 'We respect your time with punctual arrivals and efficient service delivery'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to assist you whenever you need us'
  },
  {
    icon: CheckCircle,
    title: 'Transparent Pricing',
    description: 'Clear, upfront pricing with no hidden fees or surprise charges'
  },
  {
    icon: Users,
    title: 'Trusted by Thousands',
    description: '15,800+ satisfied customers across the UAE trust AL-Kabir for their service needs'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
            Why Choose AL-Kabir?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted service company in the UAE with professional, reliable staff
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
