import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-updated">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to CompConnect ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <p>We collect several types of information to provide and improve our service:</p>
            <ul>
              <li><strong>Account Information:</strong> Email address, password (encrypted), name, age, school/university, and country</li>
              <li><strong>Profile Information:</strong> Bio, photos, skills, portfolio links, project ideas, and other profile details</li>
              <li><strong>Usage Data:</strong> Swipes, matches, messages, and interactions with other users</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage statistics</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li>To create and manage your account</li>
              <li>To match you with compatible project partners</li>
              <li>To facilitate communication between matches</li>
              <li>To improve our algorithms and user experience</li>
              <li>To send important updates about the service</li>
              <li>To prevent fraud and ensure platform safety</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Sharing and Disclosure</h2>
            <p>
              We value your privacy and do not sell your personal information to third parties. We may share your data only in the following circumstances:
            </p>
            <ul>
              <li><strong>With Other Users:</strong> Your profile information is visible to other users as part of the matching process</li>
              <li><strong>Service Providers:</strong> We may share data with trusted service providers who help us operate our platform</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul>
              <li>Passwords are hashed using bcrypt encryption</li>
              <li>Data is stored on secure servers with restricted access</li>
              <li>We use HTTPS encryption for data transmission</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p>
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> You can view and download your personal data at any time</li>
              <li><strong>Correction:</strong> You can update your profile and account information in Settings</li>
              <li><strong>Deletion:</strong> You can delete your account and all associated data in Settings</li>
              <li><strong>Opt-out:</strong> You can opt out of promotional emails</li>
              <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p>
              You can manage cookie preferences in your browser settings, but disabling certain cookies may affect functionality.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active. When you delete your account:
            </p>
            <ul>
              <li>Your profile and personal data are permanently deleted within 30 days</li>
              <li>Messages may be retained in anonymized form for service improvement</li>
              <li>Some data may be retained longer if required by law</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>9. Children's Privacy</h2>
            <p>
              CompConnect is designed for college students and users 18 years or older. We do not knowingly collect information from users under 18.
              If you believe we have inadvertently collected data from a minor, please contact us immediately.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. International Users</h2>
            <p>
              Our services are available globally. By using CompConnect, you consent to the transfer and processing of your data in the United States
              or other countries where we operate. We comply with applicable data protection laws, including GDPR for European users.
            </p>
          </section>

          <section className="privacy-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
              We will notify you of significant changes by email or through a notice on our platform. Continued use of CompConnect
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="privacy-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this privacy policy or your personal data, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@compconnect.com</li>
              <li><strong>Address:</strong> CompConnect Inc., 123 Startup Lane, San Francisco, CA 94105</li>
              <li><strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>13. Your Consent</h2>
            <p>
              By using CompConnect, you consent to this privacy policy and agree to its terms. If you do not agree with this policy,
              please do not use our services.
            </p>
          </section>
        </div>

        <div className="privacy-footer">
          <p>© {new Date().getFullYear()} CompConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
