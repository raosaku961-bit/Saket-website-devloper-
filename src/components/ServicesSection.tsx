import React from 'react';
import { Globe, Bot, Workflow, Check, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const handleServiceClick = (serviceType: string, serviceOption: string) => {
    onSelectService(serviceOption);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 relative bg-[#070a14] border-t border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Specialized Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            My Services
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Tailored digital solutions built to give small businesses, startups, and entrepreneurs
            a clear competitive edge in speed, user experience, and automated efficiency.
          </p>
        </div>

        {/* 3 Detailed Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SERVICE 1: WEBSITE DEVELOPMENT */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0f172a]/70 border border-slate-800 hover:border-blue-500/40 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                <Globe className="w-7 h-7" />
              </div>

              <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-1">
                Service 01
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Website Development</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Professional websites designed to help businesses build credibility, showcase their
                services, and connect with customers.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Services Include:
                </div>
                {[
                  'Business Websites',
                  'Landing Pages',
                  'Restaurant Websites',
                  'Salon and Gym Websites',
                  'Portfolio Websites',
                  'E-commerce Websites',
                  'Website Redesign',
                  'Responsive Mobile-Friendly Websites',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleServiceClick('web', 'Website Development')}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-blue-500/40 cursor-pointer"
            >
              <span>Discuss Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* SERVICE 2: AI CALL AGENT DEVELOPMENT */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0f172a]/70 border border-slate-800 hover:border-purple-500/40 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/40 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform">
                <Bot className="w-7 h-7" />
              </div>

              <div className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider mb-1">
                Service 02
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Call Agent Development</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                AI-powered voice agents that help businesses handle configured phone conversations,
                answer common questions, qualify leads, and support appointment workflows.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Services Include:
                </div>
                {[
                  'AI Voice Receptionists',
                  'Inbound AI Call Agents',
                  'Appointment Booking Agents',
                  'Lead Qualification Agents',
                  'Customer Support Voice Agents',
                  'Business Calling Automation',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleServiceClick('voice', 'AI Call Agent Development')}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/25 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-purple-500/40 cursor-pointer"
            >
              <span>Explore AI Call Agents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* SERVICE 3: AI AUTOMATION */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0f172a]/70 border border-slate-800 hover:border-cyan-500/40 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/40 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
                <Workflow className="w-7 h-7" />
              </div>

              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                Service 03
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Automation</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Custom workflow automation that helps businesses reduce repetitive work and connect
                their digital tools.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Services Include:
                </div>
                {[
                  'n8n Workflow Automation',
                  'Lead Capture Automation',
                  'Google Sheets Integrations (as a possible client service)',
                  'CRM Integrations',
                  'AI-Powered Workflows',
                  'Business Process Automation',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleServiceClick('automation', 'AI Automation')}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/25 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-cyan-500/40 cursor-pointer"
            >
              <span>Discuss Automation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transparent Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 max-w-2xl mx-auto border border-slate-800/80 rounded-xl py-3 px-4 bg-slate-900/40">
            <span className="text-slate-300 font-medium">Service Note:</span> Integrations such as CRM, Google Sheets, or webhooks are offered as custom solutions discussed and configured individually for your client requirements.
          </p>
        </div>
      </div>
    </section>
  );
};
