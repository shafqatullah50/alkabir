import { useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = {
    booking: [
      {
        question: 'How do I book a service?',
        answer: 'Booking a service is easy! Simply search for the service you need, select your preferred date and time, enter your address, and complete the payment. You\'ll receive instant confirmation via email and SMS.',
      },
      {
        question: 'Can I book same-day services?',
        answer: 'Yes! Many of our professionals offer same-day service based on availability. When booking, look for the same-day availability indicator, or filter your search to show only same-day options.',
      },
      {
        question: 'How do I reschedule or cancel a booking?',
        answer: 'You can reschedule or cancel bookings from your dashboard. Go to "My Bookings", select the booking you want to modify, and click "Reschedule" or "Cancel". Please note our cancellation policy for any applicable fees.',
      },
      {
        question: 'Can I choose a specific professional?',
        answer: 'Absolutely! When booking, you can browse professional profiles and select your preferred service provider. You can also set preferences for future bookings.',
      },
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets like Apple Pay and Google Pay. All transactions are secure and encrypted.',
      },
      {
        question: 'When do I get charged?',
        answer: 'Your card is authorized when you book, but you\'re only charged after the service is completed. For hourly services, the final charge may differ slightly from the estimate based on actual time spent.',
      },
      {
        question: 'Is there a service fee?',
        answer: 'We charge a small service fee that helps us maintain the platform, verify professionals, and provide customer support. This fee is clearly shown before you complete your booking.',
      },
      {
        question: 'What is your refund policy?',
        answer: 'If you\'re not satisfied with a service, contact us within 24 hours. We offer a happiness guarantee and will work to resolve any issues, including refunds when appropriate.',
      },
    ],
    professionals: [
      {
        question: 'Are all professionals verified?',
        answer: 'Yes! Every professional on our platform undergoes a thorough verification process including background checks, license verification, insurance verification, and skills assessment.',
      },
      {
        question: 'How are professionals rated?',
        answer: 'Professionals are rated by customers after each job on a 5-star scale. Ratings consider quality of work, professionalism, punctuality, and value. Only verified customers can leave reviews.',
      },
      {
        question: 'What if I\'m not satisfied with the service?',
        answer: 'Customer satisfaction is our priority. If you\'re not happy with the service, contact us immediately. We\'ll work with you and the professional to resolve the issue or arrange for the job to be redone.',
      },
      {
        question: 'Can I request the same professional for future bookings?',
        answer: 'Yes! You can save your favorite professionals and book directly with them for future services. You\'ll also receive notifications when they have availability.',
      },
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Sign Up" in the top right corner and choose whether you\'re a customer or professional. You can sign up using email or through Google, Facebook, or Apple.',
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Absolutely. We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent.',
      },
      {
        question: 'Can I have both a customer and professional account?',
        answer: 'Yes! You can register as both a customer and professional using the same email address. You\'ll be able to switch between accounts in your dashboard.',
      },
      {
        question: 'How do I delete my account?',
        answer: 'You can delete your account from your profile settings. Please note that this action is permanent and will remove all your booking history and saved information.',
      },
    ],
    general: [
      {
        question: 'What areas do you serve?',
        answer: 'We currently serve over 50 major cities across the United States and are expanding rapidly. Enter your ZIP code during booking to see if service is available in your area.',
      },
      {
        question: 'Do you offer emergency services?',
        answer: 'Yes! Many of our professionals offer emergency services for urgent needs like plumbing leaks, electrical issues, and lockouts. Filter for "Emergency Service" when booking.',
      },
      {
        question: 'Are services insured?',
        answer: 'All professionals on our platform are required to carry liability insurance. Additionally, we provide supplemental insurance coverage for added peace of mind.',
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our 24/7 customer support team via live chat, email at support@servicehub.com, or phone at 1-800-SERVICE. We typically respond within minutes.',
      },
    ],
  };

  const allFaqs = Object.entries(faqCategories).flatMap(([category, faqs]) => 
    faqs.map(faq => ({ ...faq, category }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-12 h-14 bg-card shadow-sm border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results */}
        {filteredFaqs ? (
          <div className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <h2 className="text-2xl text-foreground mb-6">
              Search Results ({filteredFaqs.length})
            </h2>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No results found. Try different keywords or browse by category below.
              </p>
            )}
          </div>
        ) : (
          /* FAQ Categories */
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="inline-flex w-full justify-start overflow-x-auto scrollbar-hide mb-6 h-12">
              <TabsTrigger value="booking" className="flex-shrink-0">Booking</TabsTrigger>
              <TabsTrigger value="payments" className="flex-shrink-0">Payments</TabsTrigger>
              <TabsTrigger value="professionals" className="flex-shrink-0">Professionals</TabsTrigger>
              <TabsTrigger value="account" className="flex-shrink-0">Account</TabsTrigger>
              <TabsTrigger value="general" className="flex-shrink-0">General</TabsTrigger>
            </TabsList>

            {Object.entries(faqCategories).map(([category, faqs]) => (
              <TabsContent key={category} value={category}>
                <div className="bg-card rounded-xl shadow-sm p-8 border border-border">
                  <h2 className="text-2xl text-foreground mb-6 capitalize">
                    {category} Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 rounded-xl p-8 text-white text-center transition-colors duration-300">
          <h2 className="text-2xl mb-4">Still have questions?</h2>
          <p className="text-emerald-100 dark:text-emerald-200 mb-6">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact">
              <button className="bg-white text-emerald-600 hover:bg-gray-100 dark:bg-white dark:text-emerald-700 dark:hover:bg-gray-200 px-6 py-3 rounded-lg transition-colors">
                Contact Support
              </button>
            </a>
            <button className="bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-400 dark:hover:bg-emerald-500 px-6 py-3 rounded-lg transition-colors">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
