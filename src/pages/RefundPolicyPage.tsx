import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, AlertCircle, RefreshCcw } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <RefreshCcw className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl mb-4">Refund & Cancellation Policy</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
              Transparent and fair refund terms for our valued customers
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Optimized for Reading */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Last Updated */}
        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">Last Updated: October 14, 2025</p>
        </div>

        {/* Introduction Box */}
        <div className="mb-12 p-6 lg:p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
          <p className="!mb-0">
            At AL-Kabir, we strive to provide exceptional service quality. This policy outlines our 
            refund and cancellation terms to ensure transparency and fairness for all parties.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Cancellation Policy */}
          <section>
            <h2>1. Cancellation Policy</h2>
            
            {/* Policy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                  <h4 className="!mb-0">Free Cancellation</h4>
                </div>
                <p className="text-green-700 dark:text-green-400 !mb-0 text-sm">
                  Cancel or reschedule up to 24 hours before your appointment with no penalty
                </p>
              </div>

              <div className="p-6 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 flex-shrink-0" />
                  <h4 className="!mb-0">Late Cancellation</h4>
                </div>
                <p className="text-orange-700 dark:text-orange-400 !mb-0 text-sm">
                  Cancellations within 24 hours of appointment are subject to a 50% cancellation fee
                </p>
              </div>
            </div>

            <h3>1.1 How to Cancel</h3>
            <p>You can cancel your booking through:</p>
            <ul>
              <li>Your customer dashboard on our website or app</li>
              <li>Calling our customer service at +971 4 XXX XXXX</li>
              <li>Emailing support@alkabir.ae with your booking reference</li>
              <li>Using the WhatsApp support line</li>
            </ul>

            <h3>1.2 No-Show Policy</h3>
            <p>
              If you are not present at the service location at the scheduled time and have not 
              notified us in advance, this will be considered a no-show. No-shows are non-refundable, 
              and you will be charged the full service amount.
            </p>

            <h3>1.3 Rescheduling</h3>
            <p>
              You may reschedule your appointment up to 24 hours before the scheduled time at no charge. 
              Rescheduling within 24 hours of the appointment may be subject to availability and a 
              rescheduling fee.
            </p>
          </section>

          {/* Refund Policy */}
          <section>
            <h2>2. Refund Policy</h2>

            <h3>2.1 Eligible Refund Situations</h3>
            <p>You may be eligible for a full or partial refund in the following situations:</p>
            
            {/* Eligible Situations */}
            <div className="space-y-4 my-8">
              <div className="p-5 lg:p-6 rounded-xl border border-border bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <h4 className="!mb-0">Service Not Performed</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If our service provider fails to show up or the service is not completed, you are 
                  entitled to a full refund.
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-border bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <h4 className="!mb-0">Unsatisfactory Service Quality</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If the service does not meet our quality standards and you report it within 24 hours, 
                  we will re-service at no charge or provide a partial/full refund based on the severity 
                  of the issue.
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-border bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <h4 className="!mb-0">Technical Issues</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If you were charged incorrectly due to a technical error on our platform, we will 
                  issue a full refund immediately upon verification.
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-border bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <h4 className="!mb-0">Service Provider Cancellation</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If AL-Kabir cancels your appointment due to provider unavailability or other 
                  circumstances beyond your control, you will receive a full refund.
                </p>
              </div>
            </div>

            <h3>2.2 Non-Refundable Situations</h3>
            <p>Refunds will not be issued in the following cases:</p>
            
            {/* Non-Refundable Situations */}
            <div className="space-y-4 my-8">
              <div className="p-5 lg:p-6 rounded-xl border border-red-200 dark:border-red-800 bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0" />
                  <h4 className="!mb-0">Customer No-Show</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If you are not present at the scheduled time without prior notice.
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-red-200 dark:border-red-800 bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0" />
                  <h4 className="!mb-0">Late Cancellation</h4>
                </div>
                <p className="!mb-0 text-sm">
                  Cancellations made less than 24 hours before the scheduled appointment (50% fee applies).
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-red-200 dark:border-red-800 bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0" />
                  <h4 className="!mb-0">Change of Mind</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If you decide you no longer want the service after it has been partially or fully completed.
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-red-200 dark:border-red-800 bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0" />
                  <h4 className="!mb-0">Denied Access</h4>
                </div>
                <p className="!mb-0 text-sm">
                  If our service provider is denied access to the service location or cannot complete 
                  the work due to circumstances beyond our control.
                </p>
              </div>

              <div className="p-5 lg:p-6 rounded-xl border border-red-200 dark:border-red-800 bg-card dark:bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0" />
                  <h4 className="!mb-0">Late Complaints</h4>
                </div>
                <p className="!mb-0 text-sm">
                  Complaints about service quality reported more than 48 hours after service completion.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2>3. Refund Process</h2>

            <h3>3.1 How to Request a Refund</h3>
            <p>To request a refund, please:</p>
            <ol>
              <li>Contact our customer service team within 24-48 hours of service completion</li>
              <li>Provide your booking reference number</li>
              <li>Explain the reason for the refund request with supporting details or evidence if applicable</li>
              <li>Our team will investigate and respond within 2-3 business days</li>
            </ol>

            <h3>3.2 Refund Timeline</h3>
            <div className="bg-accent/50 dark:bg-accent/30 p-6 lg:p-8 rounded-xl my-8 border border-border">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="!mb-2"><strong>Processing Time</strong></p>
                  <p className="!mb-0 text-sm">
                    Once approved, refunds are typically processed within 5-10 business days, depending 
                    on your payment method and financial institution.
                  </p>
                </div>
              </div>
            </div>

            <h3>3.3 Refund Method</h3>
            <p>
              Refunds will be issued to the original payment method used for the booking. If the original 
              payment method is no longer available, please contact our customer service team to arrange 
              an alternative refund method.
            </p>
          </section>

          {/* Service Guarantee */}
          <section>
            <h2>4. Service Guarantee</h2>
            <p>
              AL-Kabir is committed to delivering high-quality services. If you are not satisfied with 
              the service provided, we offer the following guarantee:
            </p>
            <ul>
              <li><strong>Re-Service Option:</strong> We will send another service provider to complete 
              the work at no additional charge if you report the issue within 24 hours</li>
              <li><strong>Quality Inspection:</strong> Our quality assurance team may conduct an 
              inspection to verify service quality issues</li>
              <li><strong>Fair Resolution:</strong> We will work with you to find a fair resolution, 
              which may include partial or full refund, credit towards future services, or re-service</li>
            </ul>
          </section>

          {/* Special Circumstances */}
          <section>
            <h2>5. Special Circumstances</h2>

            <h3>5.1 Weather and Emergency Situations</h3>
            <p>
              In cases of severe weather, natural disasters, or other emergencies that prevent service 
              delivery, AL-Kabir may need to cancel or reschedule appointments. In such cases, you will 
              receive a full refund or the option to reschedule at no additional charge.
            </p>

            <h3>5.2 Subscription and Package Services</h3>
            <p>
              For subscription-based or package services, different cancellation and refund terms may 
              apply. Please refer to your specific service agreement or contact customer service for details.
            </p>

            <h3>5.3 Promotional Offers</h3>
            <p>
              Services booked using promotional codes, discounts, or special offers may have specific 
              cancellation and refund terms. These will be clearly stated at the time of booking.
            </p>
          </section>

          {/* Disputes */}
          <section>
            <h2>6. Dispute Resolution</h2>
            <p>
              If you disagree with a refund decision or have a dispute about a service:
            </p>
            <ol>
              <li>Contact our customer service team to discuss the issue</li>
              <li>If unresolved, escalate to our customer service manager</li>
              <li>For formal complaints, submit a written complaint to complaints@alkabir.ae</li>
              <li>We will respond to all formal complaints within 5-7 business days</li>
            </ol>
            <p>
              For matters that cannot be resolved through our internal process, you may refer to the 
              relevant consumer protection authorities in the UAE.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2>7. Policy Modifications</h2>
            <p>
              AL-Kabir reserves the right to modify this Refund and Cancellation Policy at any time. 
              Any changes will be posted on our website with an updated "Last Updated" date. Continued 
              use of our services after changes are posted constitutes acceptance of the modified policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this policy or need assistance with a refund or cancellation:
            </p>
            <div className="bg-accent rounded-lg p-6 border border-border transition-colors duration-300 mt-6">
              <p className="!mb-2"><strong>AL-Kabir Services LLC</strong></p>
              <p className="text-sm !mb-2">Email: support@alkabir.ae</p>
              <p className="text-sm !mb-2">Phone: +971 4 XXX XXXX</p>
              <p className="text-sm !mb-2">WhatsApp: +971 5X XXX XXXX</p>
              <p className="text-sm !mb-2">Address: Dubai, United Arab Emirates</p>
              <p className="text-sm !mb-0">Business Hours: Sunday - Thursday, 9:00 AM - 6:00 PM GST</p>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
            <h3 className="!text-emerald-600 dark:!text-emerald-400 !mb-4">Our Commitment to You</h3>
            <p className="!mb-0">
              At AL-Kabir, your satisfaction is our priority. We are committed to being fair, transparent, 
              and responsive to all refund and cancellation requests. Our goal is to provide exceptional 
              service and resolve any issues quickly and professionally.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
