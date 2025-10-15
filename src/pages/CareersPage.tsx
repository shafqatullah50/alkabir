import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Users, 
  Heart, 
  Award, 
  GraduationCap,
  DollarSign,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Operations Manager',
    department: 'Operations',
    location: 'Dubai',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead and optimize our operations team to deliver exceptional service quality across the UAE.',
    requirements: [
      'Bachelor\'s degree in Business Management or related field',
      '5+ years of experience in operations management',
      'Strong leadership and team management skills',
      'Experience in service-based industries preferred',
      'Excellent problem-solving abilities',
      'Fluency in English and Arabic is a plus'
    ]
  },
  {
    id: '2',
    title: 'Customer Support Specialist',
    department: 'Customer Service',
    location: 'Dubai',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Provide outstanding support to our customers and ensure their satisfaction with our services.',
    requirements: [
      'High school diploma or equivalent',
      '2+ years of customer service experience',
      'Excellent communication skills in English',
      'Arabic language skills highly preferred',
      'Strong problem-solving abilities',
      'Experience with CRM systems is a plus'
    ]
  },
  {
    id: '3',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Dubai',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Develop and execute marketing strategies to grow our brand presence across the UAE market.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '4+ years of marketing experience',
      'Proven track record in digital marketing',
      'Experience with social media marketing',
      'Strong analytical and creative skills',
      'Knowledge of UAE market preferred'
    ]
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    department: 'Technology',
    location: 'Dubai',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build and maintain our web and mobile platforms, ensuring scalability and performance.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of full stack development experience',
      'Proficiency in React, Node.js, and modern web technologies',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Strong problem-solving and debugging skills',
      'Experience with mobile app development is a plus'
    ]
  },
  {
    id: '5',
    title: 'Quality Assurance Supervisor',
    department: 'Quality Control',
    location: 'Dubai',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Ensure service quality standards are met and continuously improve our service delivery processes.',
    requirements: [
      'Bachelor\'s degree or equivalent experience',
      '3+ years in quality assurance or related field',
      'Strong attention to detail',
      'Experience in service quality management',
      'Excellent communication skills',
      'Valid UAE driving license preferred'
    ]
  },
  {
    id: '6',
    title: 'Human Resources Manager',
    department: 'Human Resources',
    location: 'Dubai',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Manage recruitment, training, and employee relations to build a strong team culture.',
    requirements: [
      'Bachelor\'s degree in HR or related field',
      '5+ years of HR management experience',
      'Knowledge of UAE labor laws',
      'Strong interpersonal and communication skills',
      'Experience with HRMS systems',
      'CIPD or SHRM certification is a plus'
    ]
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Salary',
    description: 'Market-leading compensation packages with performance bonuses'
  },
  {
    icon: Heart,
    title: 'Health Insurance',
    description: 'Comprehensive medical insurance coverage for you and your family'
  },
  {
    icon: Calendar,
    title: 'Paid Time Off',
    description: 'Generous vacation days, public holidays, and sick leave'
  },
  {
    icon: GraduationCap,
    title: 'Learning & Development',
    description: 'Professional training programs and career development opportunities'
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Clear career progression paths and internal promotion opportunities'
  },
  {
    icon: Users,
    title: 'Team Culture',
    description: 'Collaborative work environment with regular team building activities'
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl lg:text-5xl mb-4">Join Our Team</h1>
              <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
                Build a rewarding career with AL-Kabir across the UAE
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background border-b border-border transition-colors duration-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-4xl text-foreground mb-2">500+</div>
              <div className="text-muted-foreground">Employees</div>
            </div>
            <div>
              <div className="text-4xl text-foreground mb-2">7</div>
              <div className="text-muted-foreground">Emirates Covered</div>
            </div>
            <div>
              <div className="text-4xl text-foreground mb-2">4.8/5</div>
              <div className="text-muted-foreground">Employee Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Why Work With AL-Kabir?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a company that values its employees and invests in their growth and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground">
              Explore our current job openings and find your perfect role
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border bg-card"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{job.title}</CardTitle>
                        <CardDescription className="mb-4">{job.description}</CardDescription>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {job.department}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.type}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {job.experience}
                          </Badge>
                        </div>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{selectedJob.title}</CardTitle>
                      <CardDescription>{selectedJob.department} • {selectedJob.location}</CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedJob(null)}
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-foreground mb-3">About the Role</h3>
                      <p className="text-muted-foreground">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h3 className="text-foreground mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
                        onClick={() => {
                          window.location.href = `mailto:careers@alkabir.ae?subject=Application for ${selectedJob.title}`;
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Our Hiring Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've designed a straightforward, transparent hiring process to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply Online', description: 'Submit your application through our careers portal or via email' },
              { step: '2', title: 'Initial Screening', description: 'Our HR team reviews your application and contacts qualified candidates' },
              { step: '3', title: 'Interview', description: 'Meet with the hiring manager and team members for in-depth discussions' },
              { step: '4', title: 'Offer & Onboarding', description: 'Receive your offer and begin your journey with AL-Kabir' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-600 dark:bg-emerald-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Don't See the Right Role?</h2>
          <p className="text-emerald-50 dark:text-emerald-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your CV and 
            we'll keep you in mind for future opportunities.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-white dark:text-emerald-700 dark:hover:bg-emerald-50"
            onClick={() => {
              window.location.href = 'mailto:careers@alkabir.ae?subject=General Application';
            }}
          >
            Send Your CV
          </Button>
        </div>
      </section>
    </div>
  );
}
