import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function DPAPage() {
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
                            <Sparkles className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold gradient-text">NanoReply</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold mb-2">Data Processing Agreement</h1>
                    <p className="text-muted-foreground mb-8">
                        <strong>Effective Date:</strong> January 1, 2026<br />
                        <strong>Last Updated:</strong> January 1, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Definitions and Interpretation</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            This Data Processing Agreement ("DPA") forms part of the Terms of Service between you ("Customer," "Data Controller," or "you") and NanoReply ("Processor," "we," "us," or "our") and governs the processing of personal data by NanoReply on behalf of the Customer in connection with the provision of the Service.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            For the purposes of this DPA, the following terms shall have the meanings set forth below:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person that is processed by NanoReply on behalf of the Customer in connection with the Service.</li>
                            <li><strong>"Data Subject"</strong> means the individual to whom Personal Data relates.</li>
                            <li><strong>"Processing"</strong> means any operation or set of operations performed on Personal Data, whether or not by automated means, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, dissemination, restriction, erasure, or destruction.</li>
                            <li><strong>"Sub-processor"</strong> means any third party engaged by NanoReply to process Personal Data on behalf of the Customer.</li>
                            <li><strong>"Data Protection Laws"</strong> means all applicable laws and regulations relating to the processing of Personal Data, including the General Data Protection Regulation (GDPR) (EU) 2016/679 and any successor legislation.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Scope and Roles</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Customer acts as the Data Controller and determines the purposes and means of processing Personal Data. NanoReply acts as the Data Processor and processes Personal Data solely on behalf of and in accordance with the documented instructions of the Customer, as set forth in this DPA and the Terms of Service.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            The subject matter, nature, purpose, and duration of the processing, as well as the types of Personal Data and categories of Data Subjects, are described in Annex A to this DPA. NanoReply shall not process Personal Data for any purpose other than as instructed by the Customer, except where required by applicable law, in which case NanoReply shall inform the Customer of such legal requirement before processing, unless prohibited by law.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Processor Obligations</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            NanoReply shall:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Process Personal Data only in accordance with the Customer's documented instructions and comply with all applicable Data Protection Laws;</li>
                            <li>Ensure that persons authorized to process Personal Data are subject to confidentiality obligations;</li>
                            <li>Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption, pseudonymization, access controls, and regular security assessments;</li>
                            <li>Assist the Customer in responding to Data Subject requests to exercise their rights under Data Protection Laws (e.g., access, rectification, erasure, data portability);</li>
                            <li>Assist the Customer in ensuring compliance with obligations relating to security, breach notifications, data protection impact assessments, and prior consultations with supervisory authorities;</li>
                            <li>At the Customer's choice, delete or return all Personal Data to the Customer after the end of the provision of services, and delete existing copies unless retention is required by applicable law;</li>
                            <li>Make available to the Customer all information necessary to demonstrate compliance with this DPA and allow for and contribute to audits and inspections conducted by the Customer or an authorized auditor;</li>
                            <li>Notify the Customer without undue delay upon becoming aware of a Personal Data breach affecting the Customer's Personal Data.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Sub-processing</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Customer authorizes NanoReply to engage Sub-processors to process Personal Data on the Customer's behalf. NanoReply shall enter into a written agreement with each Sub-processor imposing data protection obligations no less protective than those set forth in this DPA. NanoReply shall remain fully liable to the Customer for the performance of any Sub-processor's obligations.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            A list of current Sub-processors is provided in Annex B to this DPA. NanoReply shall inform the Customer of any intended changes concerning the addition or replacement of Sub-processors, giving the Customer the opportunity to object to such changes on reasonable grounds within thirty (30) days of notification. If the Customer does not object within this period, the changes shall be deemed accepted.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Security Measures</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            NanoReply implements and maintains appropriate technical and organizational measures to protect Personal Data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures include, but are not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Encryption:</strong> All data in transit is encrypted using TLS 1.2 or higher. All data at rest is encrypted using AES-256 or equivalent encryption standards.</li>
                            <li><strong>Access Controls:</strong> Role-based access controls (RBAC) and multi-factor authentication (MFA) are enforced for all personnel with access to Personal Data.</li>
                            <li><strong>Monitoring and Logging:</strong> Continuous monitoring, intrusion detection systems, and comprehensive audit logging are implemented to detect and respond to security incidents.</li>
                            <li><strong>Vulnerability Management:</strong> Regular security assessments, penetration testing, and vulnerability scanning are conducted to identify and remediate security weaknesses.</li>
                            <li><strong>Incident Response:</strong> A formal incident response plan is maintained and regularly tested to ensure rapid detection, containment, and remediation of security incidents.</li>
                            <li><strong>Employee Training:</strong> All personnel with access to Personal Data receive regular training on data protection and security best practices.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Data Breach Notification</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            In the event of a Personal Data breach, NanoReply shall notify the Customer without undue delay and, where feasible, no later than seventy-two (72) hours after becoming aware of the breach. The notification shall include, to the extent possible:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>A description of the nature of the breach, including the categories and approximate number of Data Subjects and Personal Data records affected;</li>
                            <li>The name and contact details of NanoReply's data protection officer or other contact point for further information;</li>
                            <li>A description of the likely consequences of the breach;</li>
                            <li>A description of the measures taken or proposed to be taken to address the breach and mitigate its potential adverse effects.</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                            NanoReply shall cooperate with the Customer and provide reasonable assistance in investigating the breach, mitigating its effects, and complying with any notification obligations to Data Subjects or supervisory authorities.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Personal Data may be transferred to and processed in countries outside the European Economic Area (EEA) where NanoReply or its Sub-processors maintain facilities. Where such transfers occur, NanoReply shall ensure that appropriate safeguards are in place to protect Personal Data in accordance with Data Protection Laws.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Such safeguards may include Standard Contractual Clauses approved by the European Commission, adequacy decisions, Binding Corporate Rules, or other legally recognized transfer mechanisms. Upon request, NanoReply shall provide the Customer with information about the safeguards in place for international data transfers.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Audits and Compliance</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            NanoReply shall make available to the Customer all information necessary to demonstrate compliance with this DPA and Data Protection Laws. The Customer or an independent auditor appointed by the Customer may, upon reasonable notice and during normal business hours, conduct audits or inspections of NanoReply's data processing activities, systems, and facilities to verify compliance with this DPA.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Such audits shall not unreasonably interfere with NanoReply's business operations and shall be conducted no more than once per year, unless required by a supervisory authority or in response to a suspected breach. The Customer shall bear all costs associated with such audits. NanoReply may require the auditor to execute a confidentiality agreement before granting access to its facilities or systems.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Term and Termination</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This DPA shall remain in effect for the duration of the Terms of Service and shall automatically terminate upon termination of the Terms of Service. Upon termination, NanoReply shall, at the Customer's choice, delete or return all Personal Data to the Customer and delete existing copies, unless retention is required by applicable law. NanoReply shall certify in writing to the Customer that it has complied with this obligation.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Liability and Indemnification</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Each party's liability under this DPA shall be subject to the limitations and exclusions of liability set forth in the Terms of Service. NanoReply shall indemnify and hold harmless the Customer from and against any claims, damages, losses, or expenses arising from NanoReply's breach of this DPA or Data Protection Laws, except to the extent caused by the Customer's instructions or actions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Annex A: Details of Processing</h2>
                        <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                            <div>
                                <p className="font-semibold mb-2">Subject Matter:</p>
                                <p className="text-muted-foreground text-sm">Provision of AI-powered automation services for Google Business Profile management.</p>
                            </div>
                            <div>
                                <p className="font-semibold mb-2">Nature and Purpose:</p>
                                <p className="text-muted-foreground text-sm">Processing of business and customer data to generate AI-powered review responses, blog posts, and images.</p>
                            </div>
                            <div>
                                <p className="font-semibold mb-2">Duration:</p>
                                <p className="text-muted-foreground text-sm">For the term of the Service agreement.</p>
                            </div>
                            <div>
                                <p className="font-semibold mb-2">Types of Personal Data:</p>
                                <p className="text-muted-foreground text-sm">Business information, customer reviews, names, email addresses, business addresses, phone numbers, and publicly available Google Business Profile data.</p>
                            </div>
                            <div>
                                <p className="font-semibold mb-2">Categories of Data Subjects:</p>
                                <p className="text-muted-foreground text-sm">Business owners, employees, and customers who interact with the Customer's Google Business Profile.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Annex B: List of Sub-processors</h2>
                        <div className="bg-muted/30 p-6 rounded-lg">
                            <p className="text-muted-foreground text-sm mb-4">
                                NanoReply may engage the following categories of Sub-processors:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
                                <li>Cloud hosting providers (e.g., AWS, Google Cloud Platform)</li>
                                <li>AI/ML service providers (e.g., OpenAI, Google AI)</li>
                                <li>Payment processors (e.g., Stripe, Razorpay)</li>
                                <li>Email service providers (e.g., SendGrid, Mailgun)</li>
                                <li>Analytics providers (e.g., Google Analytics)</li>
                            </ul>
                            <p className="text-muted-foreground text-sm mt-4">
                                A current list of specific Sub-processors is available upon request.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            For questions or concerns regarding this DPA, please contact:
                        </p>
                        <div className="bg-muted/30 p-6 rounded-lg">
                            <p className="font-semibold mb-2">NanoReply Data Protection Officer</p>
                            <p className="text-muted-foreground">Email: dpo@nanoreply.com</p>
                            <p className="text-muted-foreground">Address: [Company Address]</p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center">
                            This Data Processing Agreement is incorporated into and forms part of the Terms of Service between you and NanoReply.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
