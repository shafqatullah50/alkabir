import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl mb-4">Contact Us</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
              Have a question? We're here to help. Reach out to us anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
              <h2 className="text-2xl text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      required
                      placeholder="John Doe"
                      className="mt-2"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="mt-2"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="(555) 123-4567"
                      className="mt-2"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Select value={formData.subject} onValueChange={(v) => setFormData({...formData, subject: v})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Booking Question</SelectItem>
                        <SelectItem value="professional">Become a Professional</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    required
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="mt-2"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
              <h3 className="text-xl text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phone</div>
                    <div className="text-foreground">+971 4 XXX XXXX</div>
                    <div className="text-foreground">+971 50 XXX XXXX</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <div className="text-foreground">support@al-kabir.ae</div>
                    <div className="text-foreground">info@al-kabir.ae</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Address</div>
                    <div className="text-foreground">Dubai, UAE</div>
                    <div className="text-foreground">Serving all 7 Emirates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-lg text-foreground mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday:</span>
                  <span className="text-foreground">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday:</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday:</span>
                  <span className="text-foreground">10:00 AM - 4:00 PM</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                  <span>24/7 Emergency Support Available</span>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white rounded-xl p-6 transition-colors duration-300">
              <h3 className="text-lg mb-3">Need immediate help?</h3>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm mb-4">
                Chat with our support team right now
              </p>
              <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100 dark:bg-white dark:text-emerald-700 dark:hover:bg-gray-200">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="h-96 bg-accent overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68893033475!2d54.89782924359262!3d25.076022814017973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1729000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AL-Kabir Location - Dubai, UAE"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
