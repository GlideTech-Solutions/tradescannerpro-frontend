"use client";

import PageHeader from "@/components/PageHeader/PageHeader";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";

export default function PrivacyPage() {
  return (
    <main className="container">
      <PageHeader />
      <div className="content">
        <ThemeToggleBtn />
        
        <div className="legal-page">
          <h1>Privacy Policy</h1>
          
          <div className="legal-content">
            <section>
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support. This may include:
              </p>
              <ul>
                <li>Account information (username, email address)</li>
                <li>Usage data and analytics</li>
                <li>Device information and IP address</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Personalize and improve your experience</li>
              </ul>
            </section>

            <section>
              <h2>3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except in the following circumstances:
              </p>
              <ul>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In connection with a business transfer or acquisition</li>
                <li>With service providers who assist us in operating our platform</li>
              </ul>
            </section>

            <section>
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2>5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. 
                You can control cookie settings through your browser preferences, though some features may not 
                function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2>6. Third-Party Services</h2>
              <p>
                Our platform may contain links to third-party websites or services. We are not responsible for 
                the privacy practices of these third parties. We encourage you to read their privacy policies 
                before providing any personal information.
              </p>
            </section>

            <section>
              <h2>7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill 
                the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2>8. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              <ul>
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
            </section>

            <section>
              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected personal 
                information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new privacy policy on this page and updating the "Last Updated" date. Your continued use of 
                our services after any modifications constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p>
                Email: privacy@tradescannerpro.com<br />
                Address: TradeScannerPro Privacy Team
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
