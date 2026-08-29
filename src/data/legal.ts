/**
 * src/data/legal.ts
 *
 * Legal content and policies for Teesside Digital.
 * Structured data that can be reused across pages and potentially a legal page index.
 *
 * Includes:
 * - Privacy Policy (GDPR compliant, cookie notice)
 * - Accessibility Statement (WCAG 2.2 AA)
 * - Terms of Service (business terms, cancellation, liability)
 */

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalPolicy {
  title: string;
  lastUpdated: string;
  description: string;
  sections: LegalSection[];
}

/**
 * Privacy Policy
 * GDPR-compliant privacy notice for Teesside Digital
 */
export const privacyPolicy: LegalPolicy = {
  title: 'Privacy Policy',
  lastUpdated: '2026-08-28',
  description:
    'How we collect, use, and protect your personal data at Teesside Digital.',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Teesside Digital ('we', 'us', 'our') operates teessidedigital.uk. This page explains how we collect, use, and protect your personal data.

We are committed to protecting your privacy. We collect only the data we need, use it only for stated purposes, and never share it with third parties without your consent.

This policy applies to our website and services. If you have questions, contact us at dave@teessidedigital.uk.`,
    },
    {
      id: 'what-data-we-collect',
      title: 'What Data We Collect',
      content: `We collect data only when you provide it:

Contact Forms: When you use our contact form, we collect your name, email address, and message. This data is used to respond to your inquiry.

Health Check Tool: When you run the free health check tool, your website URL is analysed client-side (in your browser). We do not send your URL to our servers. If you choose to email yourself a report, we collect your email address to send the summary.

Email Submissions: If you request a detailed report via our health check form, we store your email address and the results for follow-up communication.

Cookies: We do not use cookies for tracking or analytics. If you visit our site, no tracking cookies are set.

Log Data: Our server (Netlify) may collect standard HTTP log data (IP address, browser type, referring URL, pages visited) for security and performance monitoring. This data is not shared with third parties and is deleted after 30 days.`,
    },
    {
      id: 'how-we-use-data',
      title: 'How We Use Your Data',
      content: `We use collected data only for these purposes:

Responding to inquiries: Contact form submissions are used to answer your questions and provide service information.

Service delivery: Email addresses are used to send requested reports or follow-up communication.

Improving our services: We may use anonymised feedback to improve the health check tool and our website (no personal data included).

Legal compliance: We retain data as required by UK law (typically 6 years for business records).

We do not:
- Sell your data to third parties
- Share your data with marketing companies
- Use your data for purposes other than those stated
- Send you marketing emails unless you request them
- Share data with international companies outside the UK`,
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: `Under UK GDPR, you have the right to:

Access: Request a copy of the personal data we hold about you.

Correction: Request that we correct inaccurate data.

Deletion: Request that we delete your data ('right to be forgotten'), except where we're legally required to retain it.

Withdraw Consent: If you've consented to contact us, you can withdraw that consent at any time by replying 'unsubscribe' to any email.

Complaint: If you believe we've mishandled your data, you can lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.

To exercise any of these rights, contact dave@teessidedigital.uk with your request.`,
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: `We protect your data using:

Encryption: All data transmitted to our servers is encrypted (HTTPS).

Access Controls: Only authorised staff can access your data.

Secure Storage: Data is stored on Netlify (secure UK-based infrastructure).

Backup: Data is backed up securely and retained only as long as necessary.

No third-party sharing: We do not share data with third-party services, databases, or analytics platforms (as of Phase 1).

If you're concerned about data security or want to verify our practices, contact dave@teessidedigital.uk.`,
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content: `If you have questions about this privacy policy or how we handle your data, contact:

Dave
Teesside Digital
dave@teessidedigital.uk

We'll respond within 48 hours. For GDPR-related inquiries, we'll respond within 30 days.`,
    },
  ],
};

/**
 * Accessibility Statement
 * WCAG 2.2 AA compliance statement
 */
export const accessibilityStatement: LegalPolicy = {
  title: 'Accessibility Statement',
  lastUpdated: '2026-08-28',
  description:
    'Our commitment to web accessibility and how we meet WCAG 2.2 AA standards.',
  sections: [
    {
      id: 'commitment',
      title: 'Our Commitment',
      content: `Teesside Digital is committed to ensuring digital accessibility for everyone. We design and build our website to be accessible to all users, regardless of ability or disability.

This website is built to meet WCAG 2.2 Level AA standards. We test regularly for accessibility and make continuous improvements.`,
    },
    {
      id: 'accessible-features',
      title: 'Accessible Features',
      content: `Our website includes:

Semantic HTML: Proper heading structure, landmark regions, and semantic elements help screen reader users navigate.

Keyboard Navigation: All interactive elements (buttons, links, forms) are accessible via keyboard. You can tab through the site and press Enter to activate buttons.

Focus Indicators: When you tab through the site, you'll see a clear focus ring indicating your current position.

Color Contrast: Text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).

Alt Text: All images have descriptive alt text for screen reader users.

Form Labels: All form fields have associated labels.

Accessible Forms: Error messages are clear and associated with the fields they describe.

Skip Links: A "skip to main content" link is available on every page for keyboard users.

Reduced Motion: We respect the prefers-reduced-motion setting. Users who prefer reduced motion will see animations disabled.

Responsive Design: The site works on all screen sizes, from 320px mobile phones to large desktop displays.

Plain Language: We use clear, simple language and avoid unnecessary jargon.`,
    },
    {
      id: 'testing',
      title: 'How We Test',
      content: `We test accessibility using:

Automated Tools: Lighthouse, axe, and WAVE to catch common issues.

Manual Testing: Keyboard navigation, screen reader testing (NVDA, VoiceOver).

Responsive Testing: Checking functionality across device sizes.

User Testing: Gathering feedback from users with disabilities.

Regular Audits: Quarterly accessibility reviews to maintain standards.`,
    },
    {
      id: 'known-limitations',
      title: 'Known Limitations',
      content: `Some third-party tools may have accessibility limitations:

Health Check Tool: The health check tool uses client-side JavaScript. While the interface is keyboard-accessible, some analysis results may be complex for screen readers. We're working on improving this.

If you encounter accessibility issues with these tools, please let us know so we can improve.`,
    },
    {
      id: 'assistive-technology',
      title: 'Using Assistive Technology',
      content: `Our website is tested with:

Screen Readers: NVDA (Windows), VoiceOver (Mac/iOS)

Magnification: Browser zoom (up to 200%)

Voice Control: Works with standard browser controls

Captions: Not applicable (no video content on this site)

Keyboard Only: Full navigation without a mouse

If you use assistive technology and encounter issues, please contact us so we can help.`,
    },
    {
      id: 'feedback',
      title: 'Accessibility Feedback',
      content: `If you experience accessibility issues or have suggestions for improvement:

Contact Dave: dave@teessidedigital.uk

Describe the issue: Tell us what you're trying to do and what happens.

Include your setup: Let us know what device, browser, and assistive technology you use.

Response Time: We'll respond within 48 hours and work to fix the issue.

This feedback helps us make our website better for everyone.`,
    },
    {
      id: 'standards',
      title: 'Standards & References',
      content: `We follow these standards:

WCAG 2.2 Level AA: Web Content Accessibility Guidelines maintained by W3C.

UK Equality Act 2010: Legal requirement for accessibility in the UK.

Authoritative Resources:
- W3C Web Accessibility Initiative: https://www.w3.org/WAI/
- WCAG 2.2 Guidelines: https://www.w3.org/WAI/WCAG22/quickref/
- UK Government Accessibility Standards: https://www.gov.uk/guidance/design-for-users-with-disabilities`,
    },
  ],
};

/**
 * Terms of Service
 * Standard business terms for Teesside Digital services
 */
export const termsOfService: LegalPolicy = {
  title: 'Terms of Service',
  lastUpdated: '2026-08-28',
  description: 'Terms governing the use of Teesside Digital services.',
  sections: [
    {
      id: 'agreement',
      title: 'Agreement to Terms',
      content: `By accessing and using teessidedigital.uk, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you may not use our website or services.

Teesside Digital reserves the right to modify these terms at any time. Changes become effective immediately upon posting. Your continued use of the site constitutes acceptance of the updated terms.`,
    },
    {
      id: 'use-license',
      title: 'Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on teessidedigital.uk for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

- Modify or copy the materials
- Use the materials for any commercial purpose or for any public display
- Attempt to reverse engineer, disassemble, or hack any software contained on the site
- Remove any copyright or other proprietary notations from the materials
- Transfer the materials to another person or 'mirror' the materials on any other server
- Violate any applicable laws or regulations

This license automatically terminates if you violate any of these restrictions and may be terminated by Teesside Digital at any time. Upon termination, you must destroy any downloaded materials in your possession.`,
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: `The materials on teessidedigital.uk are provided 'as is'. Teesside Digital makes no warranties, express or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, Teesside Digital does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its web site or otherwise relating to such materials or on any sites linked to this site.`,
    },
    {
      id: 'limitations',
      title: 'Limitations of Liability',
      content: `In no event shall Teesside Digital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on teessidedigital.uk, even if Teesside Digital or an authorised representative has been notified orally or in writing of the possibility of such damage.

Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.`,
    },
    {
      id: 'accuracy',
      title: 'Accuracy of Materials',
      content: `The materials appearing on teessidedigital.uk could include technical, typographical, or photographic errors. Teesside Digital does not warrant that any of the materials on its website are accurate, complete, or current. Teesside Digital may make changes to the materials contained on its website at any time without notice.

Teesside Digital does not, however, make any commitment to update the materials.`,
    },
    {
      id: 'links',
      title: 'Links',
      content: `Teesside Digital has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Teesside Digital of the site. Use of any such linked website is at the user's own risk.

If you find a broken link or suspect a linked site contains harmful content, please contact dave@teessidedigital.uk so we can investigate.`,
    },
    {
      id: 'modifications',
      title: 'Modifications',
      content: `Teesside Digital may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.`,
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: `The materials appearing on teessidedigital.uk are governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflicts of law provisions. You irrevocably consent to the exclusive jurisdiction and venue of the courts located in England for any legal action or proceeding relating to these terms or your use of the site.`,
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: `If you have questions about these Terms of Service, please contact:

Dave
Teesside Digital
dave@teessidedigital.uk

We'll respond within 48 hours.`,
    },
  ],
};

/**
 * Get a policy by type
 */
export function getLegalPolicy(type: 'privacy' | 'accessibility' | 'terms'): LegalPolicy {
  switch (type) {
    case 'privacy':
      return privacyPolicy;
    case 'accessibility':
      return accessibilityStatement;
    case 'terms':
      return termsOfService;
    default:
      throw new Error(`Unknown legal policy type: ${type}`);
  }
}
