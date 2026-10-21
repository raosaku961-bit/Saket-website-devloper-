import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What services do you offer?',
      answer:
        'I specialize in three core areas: (1) Modern Website Development — including business websites, landing pages, restaurants, salons, and e-commerce; (2) AI Call Agent Development — intelligent inbound voice agents, appointment booking assistants, and lead qualification; and (3) Workflow Automation — connecting your business apps to automate repetitive manual work.',
      category: 'General',
    },
    {
      question: 'Can you build a custom website?',
      answer:
        'Yes, absolutely. Every business has unique needs, and each website project can be custom planned according to your specific branding, feature requirements, design preferences, and customer journey.',
      category: 'Websites',
    },
    {
      question: 'What is an AI call agent?',
      answer:
        'An AI call agent is an automated voice system configured to handle real-time phone conversations. It can answer frequent customer questions, check business hours, capture caller details, qualify leads, and support appointment booking workflows 24 hours a day.',
      category: 'AI Voice',
    },
    {
      question: 'Can you automate business workflows?',
      answer:
        'Yes. Suitable business workflows can be automated depending on the digital tools you use and your operational requirements. Typical examples include capturing web leads, routing notifications to your phone, formatting customer inquiries, and reducing manual repetitive data entry.',
      category: 'Automation',
    },
    {
      question: 'How much do your services cost?',
      answer:
        'Pricing depends directly on the project scope, feature complexity, third-party integrations, and delivery timeline. Transparent estimates are provided upfront during our discovery phase, with options designed for small businesses and growing startups.',
      category: 'Pricing',
    },
    {
      question: 'How can I start a project?',
      answer:
        'Starting is simple: either fill out the Project Inquiry form on this page with a few details, send me an email at raosaku961@gmail.com, or reach out directly on WhatsApp at +91 9219523899. I will review your requirements and get in touch with you promptly.',
      category: 'Getting Started',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-[#070a14] border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Answers & Clarifications
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Quick answers about my web development, AI call agents, workflow automation, and how we collaborate.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-[#0d1322] border border-slate-800 transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-blue-950 border-blue-600 text-blue-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-800/40 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Have a question not listed here?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            Feel free to message me directly. I am always happy to discuss technical feasibility and ideas.
          </p>
          <a
            href="https://wa.me/919219523899?text=Hello%20Saket%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
          >
            Ask Saket on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
