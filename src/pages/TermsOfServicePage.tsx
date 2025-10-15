import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl mb-4">Terms of Service</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
              Please read our terms and conditions carefully before using our services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Optimized for Reading */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Last Updated */}
        <div className="mb-12 text-center">
          <p className="text-sm text-muted-foreground">Last Updated: October 14, 2025</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to AL-Kabir Services LLC ("AL-Kabir", "we", "us", or "our"). These Terms of Service 
              ("Terms") govern your access to and use of our website, mobile application, and services 
              (collectively, the "Services"). By accessing or using our Services, you agree to be bound 
              by these Terms. If you do not agree to these Terms, please do not use our Services.
            </p>
          </section>

          {/* Services Description */}
          <section>
            <h2>2. Services Description</h2>
            <p>
              AL-Kabir operates a platform connecting customers with professional service providers for 
              home and office services throughout the United Arab Emirates. Our services include but are 
              not limited to:
            </p>
            <ul>
              <li>House and office cleaning</li>
              <li>Plumbing and electrical repairs</li>
              <li>Painting and renovation</li>
              <li>Pest control</li>
              <li>Moving and relocation</li>
              <li>Furniture assembly</li>
              <li>IT support</li>
              <li>Gardening and landscaping</li>
            </ul>
            <p>
              All service providers are employed and trained by AL-Kabir. We do not operate as a 
              marketplace for independent contractors.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2>3. Account Registration</h2>
            <p>
              To access certain features of our Services, you must register for an account. When you 
              register, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              You must be at least 18 years old to create an account and use our Services.
            </p>
          </section>

          {/* Booking and Payment */}
          <section>
            <h2>4. Booking and Payment</h2>
            
            <h3>4.1 Service Bookings</h3>
            <p>
              When you book a service through AL-Kabir, you are entering into a binding agreement. 
              All bookings are subject to availability and confirmation by AL-Kabir.
            </p>

            <h3>4.2 Pricing</h3>
            <p>
              All prices are displayed in UAE Dirhams (AED) and are inclusive of applicable taxes 
              unless otherwise stated. We reserve the right to modify our prices at any time, but 
              price changes will not affect bookings already confirmed.
            </p>

            <h3>4.3 Payment Terms</h3>
            <p>
              Payment is due at the time of booking or upon service completion, depending on the 
              service type. We accept major credit cards, debit cards, and other payment methods 
              as displayed on our platform. All payments are processed securely through our 
              third-party payment processors.
            </p>

            <h3>4.4 Additional Charges</h3>
            <p>
              Additional charges may apply if the scope of work exceeds the initial booking description, 
              requires additional materials, or involves unforeseen complications. We will inform you 
              of any additional charges before proceeding with the work.
            </p>
          </section>

          {/* Cancellation and Refund */}
          <section>
            <h2>5. Cancellation and Refund Policy</h2>
            <p>
              Please refer to our <Link to="/refund-policy" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
              Refund and Cancellation Policy</Link> for detailed information about cancellations, 
              rescheduling, and refunds.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2>6. User Responsibilities</h2>
            <p>As a user of our Services, you agree to:</p>
            <ul>
              <li>Provide accurate information about the service required</li>
              <li>Ensure access to the service location at the scheduled time</li>
              <li>Provide a safe working environment for our service providers</li>
              <li>Treat our service providers with respect and professionalism</li>
              <li>Not use our Services for any illegal or unauthorized purpose</li>
              <li>Comply with all applicable UAE laws and regulations</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2>7. Prohibited Activities</h2>
            <p>You are prohibited from:</p>
            <ul>
              <li>Attempting to hire our service providers directly to circumvent our platform</li>
              <li>Using our Services for any fraudulent or illegal purpose</li>
              <li>Interfering with or disrupting the operation of our Services</li>
              <li>Attempting to gain unauthorized access to our systems or networks</li>
              <li>Transmitting any viruses, malware, or harmful code</li>
              <li>Harassing, threatening, or abusing our staff or service providers</li>
              <li>Posting false or misleading reviews or feedback</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2>8. Intellectual Property</h2>
            <p>
              All content on our Services, including text, graphics, logos, images, software, and 
              other materials, is the property of AL-Kabir or its licensors and is protected by 
              UAE and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, 
              or exploit any of our content without our express written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by UAE law, AL-Kabir shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, or any loss of 
              profits or revenues, whether incurred directly or indirectly, or any loss of data, 
              use, goodwill, or other intangible losses resulting from:
            </p>
            <ul>
              <li>Your use or inability to use our Services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our Services</li>
              <li>Any bugs, viruses, or the like that may be transmitted through our Services by any third party</li>
              <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the Services</li>
            </ul>
          </section>

          {/* Warranty Disclaimer */}
          <section>
            <h2>10. Warranty Disclaimer</h2>
            <p>
              Our Services are provided "as is" and "as available" without warranties of any kind, 
              either express or implied. While we strive to provide high-quality services, we do not 
              warrant that our Services will be uninterrupted, error-free, or secure.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless AL-Kabir, its officers, directors, 
              employees, agents, and affiliates from and against any claims, liabilities, damages, 
              losses, and expenses, including reasonable legal fees, arising out of or in any way 
              connected with your access to or use of our Services, your violation of these Terms, 
              or your violation of any rights of another person or entity.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2>12. Dispute Resolution</h2>
            
            <h3>12.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the 
              United Arab Emirates and the Emirate of Dubai, without regard to conflict of law principles.
            </p>

            <h3>12.2 Dispute Resolution Process</h3>
            <p>
              In the event of any dispute arising out of or relating to these Terms or our Services, 
              the parties agree to first attempt to resolve the dispute through good faith negotiations. 
              If the dispute cannot be resolved through negotiation within 30 days, it shall be 
              referred to mediation in Dubai, UAE.
            </p>

            <h3>12.3 Jurisdiction</h3>
            <p>
              Any disputes not resolved through negotiation or mediation shall be subject to the 
              exclusive jurisdiction of the courts of Dubai, United Arab Emirates.
            </p>
          </section>

          {/* Service Quality and Complaints */}
          <section>
            <h2>13. Service Quality and Complaints</h2>
            <p>
              We are committed to providing high-quality services. If you are not satisfied with 
              any aspect of our service, please contact our customer support team within 24 hours 
              of service completion. We will investigate all complaints and work to resolve any 
              issues promptly.
            </p>
          </section>

          {/* Force Majeure */}
          <section>
            <h2>14. Force Majeure</h2>
            <p>
              AL-Kabir shall not be liable for any failure or delay in performance resulting from 
              circumstances beyond our reasonable control, including but not limited to acts of God, 
              war, terrorism, civil unrest, government restrictions, pandemics, natural disasters, 
              or failures of telecommunications or utility services.
            </p>
          </section>

          {/* Modification of Services */}
          <section>
            <h2>15. Modification of Services</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of our Services 
              at any time, with or without notice. We shall not be liable to you or any third party 
              for any modification, suspension, or discontinuance of our Services.
            </p>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2>16. Privacy Policy</h2>
            <p>
              Your use of our Services is also governed by our{' '}
              <Link to="/privacy-policy" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                Privacy Policy
              </Link>, which explains how we collect, use, and protect your personal information. 
              By using our Services, you consent to the practices described in our Privacy Policy.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2>17. Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time without prior notice. 
              Any changes will be effective immediately upon posting the updated Terms on our Services 
              and updating the "Last Updated" date. Your continued use of our Services after any 
              changes constitutes your acceptance of the modified Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2>18. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, 
              the remaining provisions will continue in full force and effect. The invalid provision 
              will be limited or eliminated to the minimum extent necessary so that these Terms will 
              otherwise remain in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2>19. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and AL-Kabir regarding your use 
              of our Services and supersede all prior agreements and understandings, whether written 
              or oral.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2>20. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-accent rounded-lg p-6 border border-border transition-colors duration-300 mt-6">
              <p className="!mb-2"><strong>AL-Kabir Services LLC</strong></p>
              <p className="text-sm !mb-2">Email: legal@alkabir.ae</p>
              <p className="text-sm !mb-2">Phone: +971 4 XXX XXXX</p>
              <p className="text-sm !mb-2">Address: Dubai, United Arab Emirates</p>
              <p className="text-sm !mb-0">Business Hours: Sunday - Thursday, 9:00 AM - 6:00 PM GST</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
            <h3 className="!text-emerald-600 dark:!text-emerald-400 !mb-4">Acknowledgment</h3>
            <p className="!mb-0">
              By using our Services, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms of Service. If you do not agree to these Terms, you must discontinue 
              use of our Services immediately.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
