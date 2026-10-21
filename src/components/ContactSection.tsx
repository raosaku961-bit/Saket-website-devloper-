import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building,
  User,
  Globe2,
  DollarSign,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  selectedService: string;
  onOpenSetupGuide?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedService,
  onOpenSetupGuide,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    businessName: '',
    email: '',
    country: '',
    service: selectedService || 'Website Development',
    budget: '$500–$1,000',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverConfigStatus, setServerConfigStatus] = useState<{
    configured: boolean;
    recipient: string;
    instructions: string;
  } | null>(null);

  // Sync selected service if changed from Services section
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  // Check email backend status on load
  useEffect(() => {
    fetch('/api/inquiry/status')
      .then((res) => res.json())
      .then((data) => setServerConfigStatus(data))
      .catch(() => {
        // Fallback status if offline
        setServerConfigStatus({
          configured: false,
          recipient: 'raosaku961@gmail.com',
          instructions: 'Connecting to server...',
        });
      });
  }, []);

  const serviceOptions = [
    'Website Development',
    'AI Call Agent Development',
    'AI Automation',
    'Multiple Services',
    'Other',
  ];

  const budgetOptions = [
    'Under $200',
    '$200–$500',
    '$500–$1,000',
    '$1,000+',
    'Not decided yet',
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a required service.';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Please describe your project or requirements.';
    } else if (formData.details.trim().length < 10) {
      newErrors.details = 'Please provide at least 10 characters describing your project.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Backend confirms email delivery
        setSuccessMessage(result.message);
        setFormData({
          fullName: '',
          businessName: '',
          email: '',
          country: '',
          service: 'Website Development',
          budget: '$500–$1,000',
          details: '',
        });
      } else if (result.notConfigured) {
        // Server saved inquiry locally but SMTP app password is pending
        setErrorMessage(result.message);
      } else {
        setErrorMessage(
          result.message || 'Unable to submit your inquiry right now. Please try again or message me on WhatsApp.'
        );
      }
    } catch {
      setErrorMessage(
        'Connection error while submitting the form. Please click the WhatsApp or Email button below to reach me instantly!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Prefilled WhatsApp message generator
  const getWhatsAppPrefillUrl = () => {
    let msg = 'Hello Saket, I visited your website and would like to discuss your services.';
    if (formData.fullName || formData.details) {
      msg = `Hello Saket, I'm ${formData.fullName || 'a potential client'}.%0A%0AService: ${formData.service}%0ABudget: ${formData.budget}%0AEmail: ${formData.email}%0A%0AProject Details: ${formData.details}`;
    }
    return `https://wa.me/919219523899?text=${encodeURIComponent(msg)}`;
  };

  // Prefilled mailto link
  const getMailtoUrl = () => {
    const subject = encodeURIComponent('New Client Inquiry — Saket Web Developer');
    const body = encodeURIComponent(
      `Full Name: ${formData.fullName}\nBusiness Name: ${formData.businessName}\nEmail: ${formData.email}\nCountry: ${formData.country}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject Details:\n${formData.details}`
    );
    return `mailto:raosaku961@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Let's Build Something Great
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Have a website idea or need an AI solution for your business? Tell me about your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & Direct Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-8 rounded-2xl bg-[#0d1322] border border-slate-800 shadow-xl shadow-black/40">
              <h3 className="text-2xl font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-sm text-slate-300 mb-6">
                Connect directly with me to discuss timelines, pricing, or technical questions.
              </p>

              {/* Business Details */}
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Business Name
                  </div>
                  <div className="text-base font-bold text-white">Saket Web Developer</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Business Email
                  </div>
                  <a
                    href="mailto:raosaku961@gmail.com"
                    className="text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    raosaku961@gmail.com
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    WhatsApp Number
                  </div>
                  <a
                    href="https://wa.me/919219523899"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    +91 9219523899
                  </a>
                </div>
              </div>

              {/* 3 Required Action Buttons */}
              <div className="space-y-3">
                <a
                  href="https://wa.me/919219523899?text=Hello%20Saket%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Me</span>
                </a>

                <a
                  href="mailto:raosaku961@gmail.com"
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const formElement = document.getElementById('project-form');
                    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Project Inquiry (Form Below)</span>
                </button>
              </div>
            </div>

            {/* Email Backend Status & Setup helper for Saket */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-300">Email Delivery Engine</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    serverConfigStatus?.configured
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}
                >
                  {serverConfigStatus?.configured ? 'Active (Ready)' : 'Awaiting App Password'}
                </span>
              </div>
              <p className="text-slate-400 mb-3">
                Target Recipient: <strong className="text-white">raosaku961@gmail.com</strong>
              </p>
              {onOpenSetupGuide && (
                <button
                  type="button"
                  onClick={onOpenSetupGuide}
                  className="w-full py-2 px-3 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60 transition-colors text-center font-medium cursor-pointer"
                >
                  Saket: फोन से 2 मिनट में ईमेल सेटअप कैसे करें? (हिंदी Guide)
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div
              id="project-form"
              className="p-8 sm:p-10 rounded-2xl bg-[#0d1322] border border-slate-800 shadow-2xl shadow-black/50"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Project Inquiry Form</h3>
                <p className="text-sm text-slate-300">
                  Fill in the details below to receive a personalized scope and estimated quote.
                </p>
              </div>

              {/* Verified Success Message */}
              {successMessage && (
                <div className="mb-6 p-5 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-emerald-200 text-sm flex items-start gap-3 animate-in fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Inquiry Submitted!</h4>
                    <p className="leading-relaxed">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Message with Fallback Buttons */}
              {errorMessage && (
                <div className="mb-6 p-5 rounded-xl bg-amber-950/60 border border-amber-600/50 text-amber-200 text-sm flex flex-col gap-3 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Notice</h4>
                      <p className="text-xs leading-relaxed text-amber-100">{errorMessage}</p>
                    </div>
                  </div>

                  {/* Immediate Fallback Actions so no lead is lost */}
                  <div className="pt-2 border-t border-amber-800/40 flex flex-wrap gap-2">
                    <a
                      href={getWhatsAppPrefillUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send This Inquiry via WhatsApp</span>
                    </a>

                    <a
                      href={getMailtoUrl()}
                      className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email Client</span>
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-slate-800 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Business Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({ ...formData, businessName: e.target.value })
                        }
                        placeholder="Acme Corp or Studio"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="client@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-slate-800 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Country <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Globe2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        placeholder="United States, India, UK..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Required & Estimated Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Service Required <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: '' });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.service}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Estimated Budget <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Project Details <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Min 10 characters</span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.details}
                    onChange={(e) => {
                      setFormData({ ...formData, details: e.target.value });
                      if (errors.details) setErrors({ ...errors, details: '' });
                    }}
                    placeholder="Describe your website goals, features you need, or the AI workflow you would like to automate..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors resize-none ${
                      errors.details
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {errors.details && (
                    <p className="text-xs text-rose-400 mt-1.5">{errors.details}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Your Inquiry to Saket...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  I typically respond within 24 hours. For immediate inquiries, contact me on WhatsApp.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
