import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
              Your privacy and data security are our top priorities
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
              AL-Kabir Services LLC ("AL-Kabir", "we", "us", or "our") is committed to protecting your 
              privacy and ensuring the security of your personal information. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our website, 
              mobile application, and services (collectively, the "Services").
            </p>
            <p>
              By using our Services, you consent to the practices described in this Privacy Policy. If 
              you do not agree with this policy, please do not access or use our Services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
              <li><strong>Service Address:</strong> Physical addresses where services are to be performed</li>
              <li><strong>Payment Information:</strong> Credit/debit card details, billing address (processed securely through third-party payment processors)</li>
              <li><strong>Booking Details:</strong> Service type, date, time, special instructions, and preferences</li>
              <li><strong>Communication Data:</strong> Messages, feedback, reviews, and support inquiries</li>
              <li><strong>Profile Information:</strong> Any additional information you choose to provide in your profile</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you access our Services, we automatically collect certain information:</p>
            <ul>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages viewed, links clicked, time spent on pages, referral sources</li>
              <li><strong>Location Data:</strong> Approximate geographic location based on IP address or precise location if you grant permission</li>
              <li><strong>Cookies and Tracking:</strong> Information collected through cookies, web beacons, and similar technologies</li>
            </ul>

            <h3>2.3 Information from Third Parties</h3>
            <p>We may receive information from third-party services such as:</p>
            <ul>
              <li>Social media platforms (if you connect your account)</li>
              <li>Payment processors</li>
              <li>Analytics providers</li>
              <li>Marketing partners</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            
            <h3>3.1 Service Delivery</h3>
            <ul>
              <li>Process and manage your service bookings</li>
              <li>Assign and dispatch service providers</li>
              <li>Facilitate communication between you and our team</li>
              <li>Process payments and send receipts</li>
              <li>Provide customer support</li>
            </ul>

            <h3>3.2 Account Management</h3>
            <ul>
              <li>Create and maintain your account</li>
              <li>Authenticate your identity</li>
              <li>Send account-related notifications</li>
              <li>Manage your preferences and settings</li>
            </ul>

            <h3>3.3 Improvement and Analytics</h3>
            <ul>
              <li>Analyze usage patterns and trends</li>
              <li>Improve our Services and user experience</li>
              <li>Develop new features and services</li>
              <li>Conduct research and analysis</li>
            </ul>

            <h3>3.4 Marketing and Communication</h3>
            <ul>
              <li>Send promotional offers and service updates (with your consent)</li>
              <li>Provide personalized recommendations</li>
              <li>Send newsletters and blog updates</li>
              <li>Conduct surveys and collect feedback</li>
            </ul>

            <h3>3.5 Legal and Security</h3>
            <ul>
              <li>Comply with legal obligations and regulations</li>
              <li>Protect against fraud and unauthorized transactions</li>
              <li>Enforce our Terms of Service</li>
              <li>Protect the rights, safety, and property of AL-Kabir, users, and the public</li>
            </ul>
          </section>

          {/* Information Sharing and Disclosure */}
          <section>
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            
            <h3>4.1 Service Providers</h3>
            <p>
              We share information with our employed service providers who need access to perform services 
              on your behalf. All service providers are bound by confidentiality obligations.
            </p>

            <h3>4.2 Third-Party Service Providers</h3>
            <p>We may share information with trusted third parties who assist us in:</p>
            <ul>
              <li>Payment processing</li>
              <li>Data analytics and insights</li>
              <li>Email and SMS communication</li>
              <li>Customer support tools</li>
              <li>Marketing and advertising platforms</li>
            </ul>

            <h3>4.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, reorganization, or sale of assets, your information 
              may be transferred as part of the transaction.
            </p>

            <h3>4.4 Legal Requirements</h3>
            <p>We may disclose your information if required to do so by law or in response to:</p>
            <ul>
              <li>Court orders or legal processes</li>
              <li>Government or regulatory requests</li>
              <li>Law enforcement investigations</li>
              <li>Protection of our rights and safety</li>
            </ul>

            <h3>4.5 With Your Consent</h3>
            <p>
              We may share your information for any other purpose with your explicit consent.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction. 
              These measures include:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Secure server infrastructure</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication protocols</li>
              <li>Employee training on data protection</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. 
              While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes 
              outlined in this Privacy Policy, unless a longer retention period is required or permitted 
              by law. Factors we consider when determining retention periods include:
            </p>
            <ul>
              <li>The nature of the information collected</li>
              <li>Legal, accounting, or regulatory requirements</li>
              <li>The purposes for which the information was collected</li>
              <li>Whether you have an active account with us</li>
              <li>Potential legal claims or disputes</li>
            </ul>
            <p>
              When information is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section>
            <h2>7. Your Rights and Choices</h2>
            
            <h3>7.1 Access and Update</h3>
            <p>
              You have the right to access, update, or correct your personal information at any time 
              through your account settings or by contacting us.
            </p>

            <h3>7.2 Account Deletion</h3>
            <p>
              You may request deletion of your account and associated personal information by contacting 
              us. Please note that we may retain certain information as required by law or for legitimate 
              business purposes.
            </p>

            <h3>7.3 Marketing Communications</h3>
            <p>
              You can opt out of receiving promotional emails by clicking the "unsubscribe" link in any 
              marketing email or by updating your communication preferences in your account settings. 
              Please note that you will still receive transactional and service-related communications.
            </p>

            <h3>7.4 Cookie Management</h3>
            <p>
              You can control cookies through your browser settings. However, disabling cookies may 
              affect the functionality of our Services.
            </p>

            <h3>7.5 Location Data</h3>
            <p>
              You can disable location tracking through your device settings. This may limit certain 
              features of our Services.
            </p>

            <h3>7.6 Data Portability</h3>
            <p>
              You have the right to request a copy of your personal information in a structured, 
              commonly used, and machine-readable format.
            </p>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section>
            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, web beacons, and similar tracking technologies to enhance your experience, 
              analyze usage, and deliver personalized content. Types of cookies we use include:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for the operation of our Services</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Services</li>
              <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings or our cookie consent tool.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2>9. Third-Party Links and Services</h2>
            <p>
              Our Services may contain links to third-party websites, applications, or services that are 
              not operated by us. We are not responsible for the privacy practices of these third parties. 
              We encourage you to review the privacy policies of any third-party services you access.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2>10. Children's Privacy</h2>
            <p>
              Our Services are not intended for children under the age of 18. We do not knowingly collect 
              personal information from children. If you believe we have collected information from a child, 
              please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2>11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than the UAE. These 
              countries may have different data protection laws. When we transfer your information, we 
              ensure appropriate safeguards are in place to protect your data in accordance with this 
              Privacy Policy.
            </p>
          </section>

          {/* UAE Data Protection */}
          <section>
            <h2>12. UAE Data Protection Compliance</h2>
            <p>
              AL-Kabir operates in compliance with UAE data protection laws, including but not limited to 
              Federal Law No. 45 of 2021 on the Protection of Personal Data. We are committed to:
            </p>
            <ul>
              <li>Processing personal data lawfully, fairly, and transparently</li>
              <li>Collecting data for specific, explicit, and legitimate purposes</li>
              <li>Ensuring data accuracy and keeping it up to date</li>
              <li>Implementing appropriate security measures</li>
              <li>Respecting your rights as a data subject</li>
            </ul>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, 
              technology, legal requirements, or other factors. We will notify you of any material changes 
              by posting the updated policy on our Services and updating the "Last Updated" date. We 
              encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
              practices, please contact us:
            </p>
            <div className="bg-accent rounded-lg p-6 border border-border transition-colors duration-300 mt-6">
              <p className="!mb-2"><strong>AL-Kabir Services LLC</strong></p>
              <p className="!mb-2"><strong>Data Protection Officer</strong></p>
              <p className="text-sm !mb-2">Email: privacy@alkabir.ae</p>
              <p className="text-sm !mb-2">Phone: +971 4 XXX XXXX</p>
              <p className="text-sm !mb-2">Address: Dubai, United Arab Emirates</p>
              <p className="text-sm !mb-0">Business Hours: Sunday - Thursday, 9:00 AM - 6:00 PM GST</p>
            </div>
          </section>

          {/* Your Consent */}
          <section className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
            <h3 className="!text-emerald-600 dark:!text-emerald-400 !mb-4">Your Consent</h3>
            <p className="!mb-0">
              By using our Services, you acknowledge that you have read and understood this Privacy Policy 
              and consent to the collection, use, and disclosure of your information as described herein. 
              If you do not agree with this Privacy Policy, please discontinue use of our Services.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
