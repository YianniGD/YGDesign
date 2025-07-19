
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PageWrapper from '@/components/layout/PageWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy | YGDesign',
  description: 'Read the Privacy Policy for YGDesign.',
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">Last updated: June 25, 2024</p>
          
          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              Welcome to YGDesign. I am committed to protecting your privacy. This Privacy Policy explains how I collect, use, disclose, and safeguard your information when you visit my website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information I Collect</h2>
            <p>
              This website is designed to minimize direct collection of your personal information. As the site owner, I personally do not actively collect identifiable user information beyond what you voluntarily provide. However, like most websites, some information may be collected automatically by web servers or by third-party services integrated into the site. The types of information that may be relevant include:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>Personal Data (Voluntarily Provided):</strong> Personally identifiable information, such as your name, email address, and message content that you voluntarily give to me when you use my contact form. This is the only personal information I directly receive and store.
              </li>
              <li>
                <strong>Derivative Data (Server Logs):</strong> Information my web hosting servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed. This is standard server log data, generally used for site administration, security, and aggregate statistics, and is not used by me for individual user tracking.
              </li>
              <li>
                <strong>Third-Party Data (e.g., Google AdSense):</strong> I use third-party services like Google AdSense to display ads. These services may use cookies or other tracking technologies to collect information about your browsing behavior to provide personalized advertisements. This data is collected and managed by the third party according to their own privacy policies. For more information on how Google uses data, please visit Google's Privacy & Terms page. I do not have direct access to or control over the specific data collected by these third parties for advertising purposes.
              </li>
            </ul>
          </section>
          
          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Use of Your Information</h2>
            <p>
              Having accurate information about you permits me to provide you with a smooth, efficient, and customized experience. Specifically, I may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Respond to your inquiries and fulfill your requests (based on voluntarily provided information).</li>
              <li>Send you administrative information, such as changes to my terms, conditions, and policies.</li>
              <li>Administer my Site and for internal operations, including troubleshooting, data analysis (using aggregated and anonymized server log data), testing, research, statistical and survey purposes.</li>
              <li>Facilitate the display of personalized advertisements through third-party services like Google AdSense.</li>
            </ul>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Disclosure of Your Information</h2>
            <p>
              I do not sell or rent your voluntarily provided personal information. I may share information I have collected about you only in certain, limited situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>By Law or to Protect Rights:</strong> If I believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of my policies, or to protect the rights, property, and safety of others, I may share your information as permitted or required by any applicable law, rule, or regulation.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> Information collected by third-party services (like Google AdSense or web hosting providers) is managed according to their respective privacy policies. I may interact with data processed by these providers (e.g., aggregated analytics from server logs) but do not typically share your voluntarily provided personal data with them unless essential for a service you requested (e.g., processing a contact form that might, hypothetically, integrate with an email service).
              </li>
            </ul>
          </section>
          
          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Tracking Technologies</h2>
            <p>
              <strong>Cookies and Web Beacons:</strong> My website itself may use minimal cookies essential for basic functionality. However, third-party services integrated into the site, most notably Google AdSense, will use cookies, web beacons, tracking pixels, and other tracking technologies to help customize the Site, improve your experience, and serve personalized ads. When you access the Site, your personal information is not directly collected by me through these tracking technologies, but by the third parties operating them. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
            </p>
            <p>
              My advertising partner, Google AdSense, uses cookies to serve ads based on a user's prior visits to my website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>. You can also opt out of some third-party vendors’ uses of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info/choices</a>.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Me</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact me using the contact form on my website or via email at: ygaliatsatos@gmail.com
            </p>
          </section>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
