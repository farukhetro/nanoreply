import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Logo className="h-8 w-8" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                    <p className="text-muted-foreground mb-8">
                        <strong>Effective Date:</strong> January 1, 2026<br />
                        <strong>Last Updated:</strong> January 1, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            These Terms of Service ("Terms," "Agreement") constitute a legally binding agreement between you ("User," "you," or "your") and ReplyBuzz ("Company," "we," "us," or "our") governing your access to and use of the ReplyBuzz platform, website, applications, and all related services (collectively, the "Service"). By accessing, browsing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must immediately cease all use of the Service. We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Service following the posting of revised Terms constitutes your acceptance of such changes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Eligibility and Account Registration</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You must be at least 18 years of age and have the legal capacity to enter into binding contracts to use the Service. By using the Service, you represent and warrant that you meet these eligibility requirements. If you are using the Service on behalf of a business entity, you represent and warrant that you have the authority to bind that entity to these Terms.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security. We shall not be liable for any loss or damage arising from your failure to comply with these security obligations.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Description of Service</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            ReplyBuzz provides an AI-powered automation platform that connects to your Google Business Profile to perform the following functions: (a) generate and publish automated responses to customer reviews; (b) create and publish SEO-optimized blog posts; (c) generate and publish AI-created images; and (d) provide analytics and reporting related to these activities. The Service utilizes artificial intelligence, machine learning, and natural language processing technologies to generate content.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice, for any reason, including but not limited to maintenance, upgrades, or changes in business strategy. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities and Conduct</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You are solely responsible for all content, data, and information that you submit, upload, or otherwise make available through the Service ("User Content"). You retain all ownership rights in your User Content, but you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with providing and improving the Service.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You agree not to use the Service to: (a) violate any applicable laws, regulations, or third-party rights; (b) transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable; (c) impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity; (d) transmit any unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation; (e) transmit any material that contains software viruses, malware, or any other computer code designed to interrupt, destroy, or limit the functionality of any computer software or hardware; (f) interfere with or disrupt the Service or servers or networks connected to the Service; (g) attempt to gain unauthorized access to any portion of the Service or any other systems or networks connected to the Service; (h) use any automated means, including robots, crawlers, or scrapers, to access the Service without our prior written permission; or (i) use the Service in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party's use of the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. AI-Generated Content and User Responsibility</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Service utilizes artificial intelligence to generate content, including review responses, blog posts, and images. While we employ advanced technologies and quality control measures, AI-generated content may contain errors, inaccuracies, or inappropriate material. You acknowledge and agree that: (a) all AI-generated content is provided "as is" without any warranties of any kind; (b) you are solely responsible for reviewing, editing, and approving all AI-generated content before it is published; (c) you bear full legal responsibility for all content published through the Service, whether generated by AI or otherwise; and (d) we disclaim all liability for any damages, losses, or consequences arising from the use of AI-generated content.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            You agree to indemnify, defend, and hold harmless ReplyBuzz, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to your use of AI-generated content or any violation of these Terms by you.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Subscription Plans, Billing, and Payment</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Service is offered on a subscription basis with various pricing plans as described on our website. By subscribing to a paid plan, you agree to pay all applicable fees and charges in accordance with the billing terms in effect at the time the fees or charges become payable. All fees are non-refundable except as expressly set forth in our Refund Policy. Subscription fees are billed in advance on a recurring monthly basis and will automatically renew at the end of each billing period unless you cancel your subscription prior to the renewal date.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You authorize us to charge your designated payment method for all fees and charges incurred in connection with your use of the Service. If your payment method fails or your account is past due, we may suspend or terminate your access to the Service until payment is received. We reserve the right to change our fees and billing methods at any time upon thirty (30) days' prior notice to you. Your continued use of the Service after such notice constitutes your acceptance of the new fees and billing methods.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Certain plans include usage limits (e.g., number of posts, photos, or replies per month). If you exceed these limits, you will be charged overage fees as specified in your plan. You are responsible for monitoring your usage and managing your account to avoid unexpected charges.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Service and all content, features, and functionality thereof, including but not limited to all information, software, text, displays, images, video, audio, design, presentation, selection, and arrangement, are owned by ReplyBuzz, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. These Terms grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service for your internal business purposes in accordance with these Terms.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            You may not: (a) copy, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as incidental to normal use of the Service; (b) remove, alter, or obscure any copyright, trademark, or other proprietary rights notices from the Service; (c) reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service; or (d) use the Service to develop competing products or services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services and Integrations</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Service integrates with third-party services, including Google Business Profile, through official APIs. Your use of these third-party services is subject to their respective terms of service and privacy policies. We are not responsible for the availability, accuracy, or content of third-party services, and we disclaim all liability arising from your use of such services.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            You acknowledge that your connection to Google Business Profile requires you to grant us certain permissions and access rights through OAuth authentication. You are responsible for ensuring that you have the authority to grant such permissions and that your use of the Service complies with Google's terms of service and policies. We may suspend or terminate your access to the Service if we determine that your use violates Google's terms or policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND FREEDOM FROM COMPUTER VIRUS OR OTHER HARMFUL CODE. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT DEFECTS WILL BE CORRECTED.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY, COMPLETENESS, RELIABILITY, OR SUITABILITY OF ANY AI-GENERATED CONTENT OR ANY OTHER CONTENT, INFORMATION, OR MATERIALS PROVIDED THROUGH THE SERVICE. YOUR USE OF THE SERVICE AND ANY RELIANCE ON AI-GENERATED CONTENT OR OTHER MATERIALS PROVIDED THROUGH THE SERVICE IS AT YOUR OWN RISK.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL REPLYBUZZ, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE SERVICE DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You agree to indemnify, defend, and hold harmless ReplyBuzz, its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees and court costs) arising out of or relating to: (a) your use of the Service; (b) your User Content; (c) your violation of these Terms; (d) your violation of any rights of another party, including any intellectual property rights; (e) your violation of any applicable laws or regulations; or (f) any AI-generated content published through your account. We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You may terminate your account and discontinue use of the Service at any time by following the cancellation procedures outlined in your account settings. We may suspend or terminate your access to the Service at any time, with or without cause, with or without notice, effective immediately, including but not limited to if we believe you have violated these Terms or engaged in conduct that we deem inappropriate or harmful to the Service or other users.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Upon termination, your right to use the Service will immediately cease, and we may delete your account and all associated data. We shall not be liable to you or any third party for any termination of your access to the Service. All provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity obligations, and limitations of liability.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Dispute Resolution</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            These Terms and any dispute arising out of or related to them or the Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms or the Service shall be instituted exclusively in the courts located in [City, State], India, and you irrevocably submit to the jurisdiction of such courts and waive any objection to the venue of any such proceeding.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Prior to initiating any legal action, the parties agree to attempt to resolve any dispute through good faith negotiations. If the dispute cannot be resolved through negotiations within thirty (30) days, either party may pursue legal remedies. Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual property rights or confidential information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">14. Miscellaneous</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and any other policies or agreements referenced herein, constitute the entire agreement between you and ReplyBuzz regarding the Service and supersede all prior or contemporaneous understandings and agreements, whether written or oral.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            <strong>Severability:</strong> If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            <strong>Waiver:</strong> No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or condition or any other term or condition.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Assignment:</strong> You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign or transfer these Terms or our rights hereunder without restriction.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            If you have any questions, concerns, or disputes regarding these Terms, please contact us at:
                        </p>
                        <div className="bg-muted/30 p-6 rounded-lg">
                            <p className="font-semibold mb-2">ReplyBuzz</p>
                            <p className="text-muted-foreground">Email: legal@replybuzz.com</p>
                            <p className="text-muted-foreground">Address: [Company Address]</p>
                            <p className="text-muted-foreground">Phone: [Company Phone]</p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center">
                            By using the ReplyBuzz Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
