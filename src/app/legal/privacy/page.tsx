import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold gradient-text">NanoReply</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-8">
                        <strong>Effective Date:</strong> January 1, 2026<br />
                        <strong>Last Updated:</strong> January 1, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This Privacy Policy ("Policy") governs the manner in which NanoReply ("Company," "we," "us," or "our") collects, uses, maintains, and discloses information collected from users ("User," "you," or "your") of the NanoReply platform and associated services (collectively, the "Service"). This Policy applies to the Service and all products and services offered by NanoReply. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree with these terms, you must immediately discontinue use of the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Personal Identification Information</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We may collect personal identification information from Users in various ways, including, but not limited to, when Users visit our platform, register on the platform, subscribe to our services, respond to surveys, fill out forms, and in connection with other activities, services, features, or resources we make available on our Service. Users may be asked for, as appropriate, name, email address, mailing address, phone number, business information, payment information, and other relevant data. Users may, however, visit our Service anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information, except that it may prevent them from engaging in certain Service-related activities.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Non-Personal Identification Information</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We may collect non-personal identification information about Users whenever they interact with our Service. Non-personal identification information may include the browser name, the type of computer or mobile device, technical information about Users' means of connection to our Service, such as the operating system, Internet service providers utilized, IP addresses, device identifiers, and other similar information. This data is collected through the use of cookies, web beacons, log files, and other tracking technologies.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Google Business Profile Data</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            When you connect your Google Business Profile to our Service, we collect and process data from your Google Business Profile, including but not limited to: business name, address, phone number, website URL, business hours, categories, reviews, ratings, posts, photos, and other publicly available information. We access this data through official Google APIs using OAuth 2.0 authentication. We do not store your Google account password. Access tokens are encrypted and stored securely in compliance with industry standards and Google's API Services User Data Policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Collected Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            NanoReply may collect and use Users' personal information for the following purposes, which are necessary for the performance of the contract between you and NanoReply, for compliance with legal obligations, and for our legitimate business interests:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>To provide and maintain the Service:</strong> Including processing your requests, managing your account, and delivering the features and functionality of the Service.</li>
                            <li><strong>To improve customer service:</strong> Information you provide helps us respond to your customer service requests and support needs more efficiently and effectively.</li>
                            <li><strong>To personalize user experience:</strong> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Service, and to tailor content and features to individual user preferences.</li>
                            <li><strong>To process payments:</strong> We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the Service and process payments through secure third-party payment processors.</li>
                            <li><strong>To send periodic emails:</strong> We may use the email address to send User information and updates pertaining to their account and Service usage. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Service.</li>
                            <li><strong>To generate AI content:</strong> We use your business information and Google Business Profile data to generate AI-powered review responses, blog posts, and images tailored to your business. This processing is essential to the core functionality of our Service.</li>
                            <li><strong>To comply with legal obligations:</strong> We may process your data to comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Data Security and Encryption</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Service. All data transmission between your device and our servers is encrypted using industry-standard SSL/TLS protocols (minimum TLS 1.2). Sensitive data, including OAuth tokens and payment information, is encrypted at rest using AES-256 encryption or equivalent cryptographic standards.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Access to personal data is restricted to authorized personnel who require such access to perform their job functions. All personnel with access to personal data are subject to confidentiality obligations. We implement multi-factor authentication, role-based access controls, regular security audits, penetration testing, and continuous monitoring to detect and prevent security incidents. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We may disclose your personal information to third parties in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Such service providers may include payment processors, cloud hosting providers, AI/ML service providers, email service providers, and analytics providers.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g., a court, government agency, or law enforcement).</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, bankruptcy, or sale of all or a portion of our assets, your personal information may be transferred to the acquiring entity, subject to the same privacy protections as outlined in this Policy.</li>
                            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your explicit consent.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, enforce our legal agreements and policies, and for legitimate business purposes such as internal analysis and record-keeping. When your personal information is no longer required for these purposes, we will securely delete or anonymize it in accordance with applicable data protection laws. Backup copies of data may be retained for a limited period as required for disaster recovery purposes but will be subject to the same security measures as active data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Your Data Protection Rights (GDPR Compliance)</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). NanoReply aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal information. You have the following rights:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Right to Access:</strong> You have the right to request copies of your personal data. We may charge a reasonable fee for this service if your request is manifestly unfounded or excessive.</li>
                            <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                            <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions, such as when the data is no longer necessary for the purposes for which it was collected.</li>
                            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                            <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
                            <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                            <li><strong>Right to Withdraw Consent:</strong> Where we rely on your consent to process your personal data, you have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                            If you wish to exercise any of these rights, please contact us at the contact information provided below. We will respond to your request within one month of receipt. You also have the right to lodge a complaint with a supervisory authority, in particular in the EU member state of your habitual residence, place of work, or place of the alleged infringement if you believe that the processing of your personal data infringes the GDPR.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. AI-Generated Content Disclaimers</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Our Service utilizes artificial intelligence and machine learning technologies to generate content, including but not limited to review responses, blog posts, and images. While we strive to ensure that AI-generated content is accurate, appropriate, and compliant with applicable guidelines and policies, we cannot guarantee the accuracy, completeness, reliability, or suitability of such content for any particular purpose.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Users are solely responsible for reviewing, editing, and approving all AI-generated content before it is published to their Google Business Profile or any other platform. NanoReply disclaims all liability for any damages, losses, or consequences arising from the use of AI-generated content, including but not limited to reputational harm, legal liability, or violations of third-party rights. By using our Service, you acknowledge and agree that you bear full responsibility for all content published through the Service, whether generated by AI or otherwise.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to monitor, review, and remove AI-generated content that violates our Terms of Service, applicable laws, or third-party platform policies. However, we are under no obligation to do so and assume no liability for failure to monitor or remove such content.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including personal data, to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and that appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission or other legally recognized transfer mechanisms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Our Service is not directed to individuals under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from Children. If you are a parent or guardian and you are aware that your Child has provided us with personal data, please contact us. If we become aware that we have collected personal data from Children without verification of parental consent, we will take steps to remove that information from our servers immediately. If we need to rely on consent as a legal basis for processing your information and your country requires consent from a parent, we may require your parent's consent before we collect and use that information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Cookies and Tracking Technologies</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Our Service uses "cookies" and similar tracking technologies to enhance user experience, analyze trends, administer the Service, track users' movements around the Service, and gather demographic information about our user base as a whole. A cookie is a small text file that is stored on your device for record-keeping purposes. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted or until they expire).
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. We use the following types of cookies:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Essential Cookies:</strong> Required for the operation of our Service, such as cookies that enable you to log into secure areas.</li>
                            <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our Service, helping us improve the way our Service works.</li>
                            <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our Service, enabling us to personalize content and remember your preferences.</li>
                            <li><strong>Targeting Cookies:</strong> Record your visit to our Service, the pages you have visited, and the links you have followed, used to make our Service and advertising more relevant to your interests.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            NanoReply has the discretion to update this Privacy Policy at any time. When we do, we will revise the updated date at the top of this page and send you an email notification if the changes are material. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications. Your continued use of the Service after any changes to this Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Jurisdiction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This Privacy Policy and any dispute arising out of or related to it shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in [City, State], India, for the resolution of any disputes arising out of or relating to this Privacy Policy or your use of the Service. Notwithstanding the foregoing, we may seek injunctive or other equitable relief in any court of competent jurisdiction to protect our intellectual property rights or confidential information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this Privacy Policy, the practices of this Service, or your dealings with this Service, please contact us at:
                        </p>
                        <div className="bg-muted/30 p-6 rounded-lg">
                            <p className="font-semibold mb-2">NanoReply</p>
                            <p className="text-muted-foreground">Email: privacy@nanoreply.com</p>
                            <p className="text-muted-foreground">Address: [Company Address]</p>
                            <p className="text-muted-foreground">Phone: [Company Phone]</p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center">
                            This Privacy Policy was last updated on January 1, 2026. By using the NanoReply Service, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, please do not use our Service.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
