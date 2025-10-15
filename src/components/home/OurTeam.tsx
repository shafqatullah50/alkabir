import { Link } from 'react-router-dom';
import { Star, Award, Shield } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const teamMembers = [
  {
    id: '1',
    name: 'Ahmed Al-Mansoori',
    role: 'Senior Plumber',
    experience: '12 years',
    rating: 4.9,
    completedJobs: 850,
    specialties: ['Plumbing', 'Pipe Fitting', 'Water Systems'],
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNDIyODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Head Cleaning Specialist',
    experience: '8 years',
    rating: 5.0,
    completedJobs: 1200,
    specialties: ['Deep Cleaning', 'Sanitization', 'Villa Cleaning'],
    image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzYwMzIwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    role: 'Electrical Technician',
    experience: '10 years',
    rating: 4.8,
    completedJobs: 680,
    specialties: ['Electrical', 'Wiring', 'Lighting'],
    image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd29yayUyMHRlY2huaWNpYW58ZW58MXx8fHwxNzYwNDE3MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    name: 'Mohammed Ali',
    role: 'Painting Specialist',
    experience: '15 years',
    rating: 4.9,
    completedJobs: 920,
    specialties: ['Interior Painting', 'Exterior Painting', 'Wallpaper'],
    image: 'https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMHNlcnZpY2UlMjB3b3JrZXJ8ZW58MXx8fHwxNzYwNDIyODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export default function OurTeam() {
  return (
    <section className="py-16 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
            Meet Our Professional Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced, certified, and dedicated professionals employed by AL-Kabir
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border card-hover">
              <div className="aspect-square overflow-hidden relative">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full p-2">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">{member.role}</p>
                
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-foreground">{member.rating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Award className="w-4 h-4 mr-1" />
                  {member.experience} experience
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-1">Specialties:</div>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            <span className="text-emerald-600 dark:text-emerald-400">150+ certified professionals</span> ready to serve you across the UAE
          </p>
        </div>
      </div>
    </section>
  );
}
