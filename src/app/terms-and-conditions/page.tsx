import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Civil At Hand",
  description: "Read the Terms and Conditions of Civil At Hand to understand our services, payments, client obligations, and legal agreements.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-wix-gray">
      <Header />

      <main className="flex-grow">
        {/* Editorial Page Header */}
        <section className="bg-wix-dark text-white py-16 md:py-20 border-b border-white/5 relative overflow-hidden">
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-3">Legal Documentation</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              Terms & Conditions
            </h1>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs font-medium text-slate-400">
              <span>Civil At Hand Group</span>
              <span>•</span>
              <span>civilathand.in</span>
              <span>•</span>
              <span className="text-white">Effective Date: June 10, 2026</span>
            </div>
          </div>
        </section>

        {/* Legal Text Layout */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-200/80 rounded-md p-8 md:p-12 shadow-sm font-sans text-sm text-slate-700 leading-relaxed space-y-10">
              
              {/* 1. Acceptance of Terms */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">1.</span> Acceptance of Terms
                </h2>
                <p className="mb-3">
                  These Terms and Conditions ("Terms") govern your access to and use of the website{" "}
                  <a href="https://civilathand.in" className="text-orange-600 hover:text-orange-700 underline font-semibold">
                    civilathand.in
                  </a>{" "}
                  and all services offered by Civil AT Hand ("Company," "we," "us," or "our"). By accessing our website, submitting a service inquiry, placing an order, or engaging our services in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must immediately discontinue use of our website and services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you ("Client," "User," or "you") and Civil AT Hand.
                </p>
              </div>

              {/* 2. Eligibility */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">2.</span> Eligibility
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>You must be at least 18 years of age to use our services or enter into any agreement with us.</li>
                  <li>By using our services, you represent and warrant that you have the legal capacity to enter into binding contracts.</li>
                  <li>If you are engaging our services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.</li>
                </ul>
              </div>

              {/* 3. Services Offered */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">3.</span> Services Offered
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">3.1 Scope of Services</h3>
                    <p className="mb-2">
                      Civil AT Hand provides civil engineering design, consultancy, and technology-assisted services, including but not limited to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Architectural and structural CAD drawings</li>
                      <li>BIM (Building Information Modelling) and Revit services</li>
                      <li>Estimation, Bill of Quantities (BOQ) preparation</li>
                      <li>PDF conversion and document processing</li>
                      <li>AI-assisted engineering workflows and tools</li>
                      <li>Training and consulting for civil engineering applications</li>
                      <li>Digital products and downloadable engineering resources</li>
                      <li>Any other civil engineering related service as listed on our website from time to time</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">3.2 Service Modifications</h3>
                    <p>
                      We reserve the right to modify, add, or discontinue any service at any time without prior notice. The current list of services is always available on our website.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">3.3 AI-Assisted Services</h3>
                    <p>
                      Civil AT Hand may utilize artificial intelligence (AI) tools, software, and workflows to enhance the efficiency and quality of deliverables. The use of AI-assisted tools does not diminish the professional nature or validity of our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">3.4 Customization</h3>
                    <p>
                      All services are customized based on project-specific requirements and information provided by the client. No two deliverables are identical.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Client Obligations */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">4.</span> Client Obligations
                </h2>
                <p className="mb-2">By engaging our services, you agree to:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Provide accurate, complete, and timely information, data, drawings, and specifications required for project execution</li>
                  <li>Review and respond to communications, queries, and deliverables within a reasonable timeframe</li>
                  <li>Ensure that any information, files, or materials provided to us do not infringe any third-party intellectual property rights</li>
                  <li>Use our deliverables only for the purposes agreed upon and within the scope of the project</li>
                  <li>Refrain from using our deliverables for any illegal, fraudulent, or harmful purpose</li>
                </ul>
              </div>

              {/* 5. Payments and Billing */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">5.</span> Payments and Billing
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">5.1 Payment Terms</h3>
                    <p>
                      A non-refundable advance payment of 40% of the total project value is required before work commences. The remaining balance is due upon completion and before delivery of final files.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">5.2 Payment Methods</h3>
                    <p>
                      We accept all major payment methods including UPI, bank transfer, credit/debit cards, and supported online payment gateways. For international clients, payments may be accepted in applicable foreign currencies as mutually agreed.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">5.3 GST and Taxes</h3>
                    <p>
                      Civil AT Hand is currently not registered under GST. Prices quoted are inclusive of all applicable charges unless otherwise stated. Any future tax obligations arising from regulatory changes will be communicated in advance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">5.4 Late or Non-Payment</h3>
                    <p>
                      Failure to make payments as per the agreed schedule entitles us to suspend or withhold delivery of work. We reserve the right to charge interest on overdue amounts at a rate of 2% per month or the maximum rate permitted by law, whichever is lower.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Intellectual Property */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">6.</span> Intellectual Property
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">6.1 Our Content</h3>
                    <p>
                      All content on{" "}
                      <a href="https://civilathand.in" className="text-orange-600 hover:text-orange-700 underline font-semibold">
                        civilathand.in
                      </a>
                      , including but not limited to text, graphics, logos, designs, software, tools, and proprietary methodologies, is the exclusive intellectual property of Civil AT Hand and is protected under applicable Indian and international intellectual property laws. Unauthorized reproduction, distribution, or use is strictly prohibited.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">6.2 Client Deliverables</h3>
                    <p className="mb-2">
                      Upon receipt of full and final payment, the client is granted a non-exclusive, non-transferable license to use the deliverables for the specific project for which they were created. This license does not permit the client to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Resell, sublicense, or commercially exploit the deliverables</li>
                      <li>Claim authorship or ownership of the deliverables</li>
                      <li>Reproduce or distribute the deliverables beyond the scope of the intended project</li>
                      <li>Use the deliverables as templates or bases for other projects without express written consent</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">6.3 Retention of Rights</h3>
                    <p>
                      Civil AT Hand retains the right to display completed projects as portfolio samples unless the client expressly requests confidentiality in writing prior to project commencement.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-wix-dark mb-1">6.4 Third-Party IP</h3>
                    <p>
                      The client warrants that any materials, data, or files provided to us are free from third-party intellectual property claims. The client shall indemnify and hold Civil AT Hand harmless against any claims arising from use of client-provided materials.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. Modifications and Revisions */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">7.</span> Modifications and Revisions
                </h2>
                <p>
                  Each project includes two (2) rounds of complimentary revisions within the originally agreed project scope. Additional revisions, changes in scope, or new requirements will be treated as separate work orders and billed accordingly. Revision requests must be submitted in writing within seven (7) days of delivery.
                </p>
              </div>

              {/* 8. Limitation of Liability */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">8.</span> Limitation of Liability
                </h2>
                <p className="mb-2">
                  To the maximum extent permitted by applicable law, Civil AT Hand shall not be liable for:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-2">
                  <li>Any indirect, incidental, consequential, special, or punitive damages arising from the use of our services or deliverables</li>
                  <li>Losses arising from errors, omissions, or inaccuracies in information provided by the client</li>
                  <li>Modifications made to our deliverables by the client or any third party after delivery</li>
                  <li>Construction defects, site errors, or losses arising from implementation of our deliverables</li>
                  <li>Delays caused by client-side failures, third-party services, or circumstances beyond our reasonable control</li>
                </ul>
                <p>
                  Our total cumulative liability to you shall not exceed the total amount paid by you to Civil AT Hand for the specific project giving rise to the claim.
                </p>
              </div>

              {/* 9. Confidentiality */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">9.</span> Confidentiality
                </h2>
                <p>
                  Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This obligation survives the termination of any service agreement.
                </p>
              </div>

              {/* 10. Termination */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">10.</span> Termination
                </h2>
                <p className="mb-2">
                  We reserve the right to terminate or suspend our services with immediate effect in the event of:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-2">
                  <li>Non-payment or breach of payment terms</li>
                  <li>Breach of these Terms and Conditions</li>
                  <li>Provision of fraudulent, inaccurate, or misleading information</li>
                  <li>Any conduct that we determine, in our sole discretion, to be harmful, abusive, or unlawful</li>
                </ul>
                <p>
                  Upon termination, all outstanding amounts become immediately due and payable.
                </p>
              </div>

              {/* 11. Governing Law and Dispute Resolution */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">11.</span> Governing Law and Dispute Resolution
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, specifically the laws applicable in the State of Haryana, without regard to conflict of law provisions.
                  In the event of any dispute, the parties shall first attempt to resolve the matter amicably through written communication within 30 days. If unresolved, the dispute shall be referred to arbitration or the courts of competent jurisdiction in Haryana, India, which shall have exclusive jurisdiction.
                </p>
              </div>

              {/* 12. Amendments */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">12.</span> Amendments
                </h2>
                <p>
                  We reserve the right to amend these Terms at any time. Updated Terms will be posted on our website at civilathand.in and will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the revised Terms.
                </p>
              </div>

              {/* 13. Severability */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">13.</span> Severability
                </h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.
                </p>
              </div>

              {/* 14. Entire Agreement */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">14.</span> Entire Agreement
                </h2>
                <p>
                  These Terms, together with our Privacy Policy, Refund Policy, and any project-specific agreements, constitute the entire agreement between you and Civil AT Hand with respect to the subject matter herein and supersede all prior agreements and understandings.
                </p>
              </div>

              {/* 15. Contact Information */}
              <div>
                <h2 className="font-display font-extrabold text-lg text-wix-dark uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="text-orange-500 font-black">15.</span> Contact Information
                </h2>
                <p className="mb-2">
                  For queries regarding these Terms and Conditions, please contact:
                </p>
                <div className="space-y-1 text-slate-600 font-medium">
                  <p>
                    Email:{" "}
                    <a href="mailto:info.civilathand@gmail.com" className="text-orange-600 hover:text-orange-700 underline">
                      info.civilathand@gmail.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href="tel:+917703977002" className="text-orange-600 hover:text-orange-700 underline">
                      +91 7703977002
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <a href="https://civilathand.in" className="text-orange-600 hover:text-orange-700 underline">
                      civilathand.in
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
