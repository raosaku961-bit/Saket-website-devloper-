import React, { useState } from 'react';
import { ExternalLink, Layers, Eye, X, PhoneCall, Utensils, Sparkles, Building2, Workflow, Bot, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Website' | 'AI Call Agent' | 'Automation'>('All');
  const [selectedDemo, setSelectedDemo] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'proj-1',
      title: 'Modern Business Website',
      category: 'Website Development',
      categoryLabel: 'Website Development',
      description: 'Sleek corporate web architecture built with modern typography, dark UI gradients, and high-conversion service showcases.',
      tag: 'B2B & Startup Web',
      features: ['Lightning fast performance', 'Responsive mobile-first layout', 'Lead capture CTAs', 'Interactive hero visual'],
      demoType: 'live_interactive',
      accentColor: 'from-blue-600 to-indigo-600',
      techStack: ['React', 'Tailwind CSS', 'TypeScript', 'SEO Optimized'],
    },
    {
      id: 'proj-2',
      title: 'Restaurant Website',
      category: 'Website Development',
      categoryLabel: 'Website Development',
      description: 'Atmospheric digital dining experience with interactive digital menu, reservation booking inquiries, and appetizing imagery.',
      tag: 'Hospitality & Dining',
      features: ['Categorized food menu', 'Direct table reservation', 'Location & hours display', 'Mobile ordering UI'],
      demoType: 'live_interactive',
      accentColor: 'from-amber-600 to-orange-600',
      techStack: ['Responsive Layout', 'Menu Filtering', 'Booking Form', 'Fast Loading'],
    },
    {
      id: 'proj-3',
      title: 'Premium Salon Website',
      category: 'Website Development',
      categoryLabel: 'Website Development',
      description: 'Sophisticated aesthetics for luxury salons and spas featuring service tiers, stylist showcases, and appointment request workflows.',
      tag: 'Beauty & Wellness',
      features: ['Treatment price catalog', 'Staff profile gallery', 'Appointment inquiry form', 'Instagram aesthetic design'],
      demoType: 'live_interactive',
      accentColor: 'from-rose-500 to-pink-600',
      techStack: ['Elegant Glass UI', 'Service Grid', 'Mobile Optimized', 'Quick WhatsApp Booking'],
    },
    {
      id: 'proj-4',
      title: 'AI Voice Receptionist',
      category: 'AI Call Agent',
      categoryLabel: 'AI Call Agent Development',
      description: 'Intelligent configured voice assistant that greets callers, answers operating hours and FAQs, and logs incoming client messages.',
      tag: 'Voice AI & Telephony',
      features: ['Natural conversational flow', 'Configured FAQ answering', 'Caller message logging', '24/7 After-hours availability'],
      demoType: 'call_simulator',
      accentColor: 'from-purple-600 to-violet-600',
      techStack: ['Voice AI Architecture', 'Telephony Webhooks', 'Structured Responses', 'Call Logging'],
    },
    {
      id: 'proj-5',
      title: 'AI Lead Qualification Agent',
      category: 'AI Call Agent',
      categoryLabel: 'AI Call Agent Development',
      description: 'Automated inbound screening agent that asks targeted discovery questions, determines budget readiness, and routes hot leads.',
      tag: 'Sales & Inbound AI',
      features: ['Qualification question script', 'Budget & timeline validation', 'Priority tagging', 'Instant email summary'],
      demoType: 'call_simulator',
      accentColor: 'from-indigo-600 to-blue-600',
      techStack: ['Intelligent Scoring', 'Lead Verification', 'Custom Business Rules', 'Instant Notifications'],
    },
    {
      id: 'proj-6',
      title: 'Automated Lead Management Workflow',
      category: 'AI Automation',
      categoryLabel: 'AI Automation',
      description: 'End-to-end business pipeline that ingests new inquiries, formats lead data, sends team alerts, and synchronizes records without manual copy-paste.',
      tag: 'Workflow Automation',
      features: ['Multi-app webhook triggers', 'Data validation & cleaning', 'Team alert notifications', 'Error retry mechanics'],
      demoType: 'workflow_visualizer',
      accentColor: 'from-cyan-600 to-teal-600',
      techStack: ['n8n Engine', 'API Webhooks', 'Automated Routing', 'Error Monitoring'],
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Website') return p.category === 'Website Development';
    if (activeFilter === 'AI Call Agent') return p.category === 'AI Call Agent';
    if (activeFilter === 'Automation') return p.category === 'AI Automation';
    return true;
  });

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Showcase & Concepts
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            My Portfolio
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
            Explore functional demo solutions showcasing modern website builds, AI call systems,
            and automated workflow integrations.
          </p>
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <span className="text-amber-400 font-medium">Transparency Note:</span> All items below are labeled as <strong className="text-white">Demo Projects</strong> to demonstrate capabilities before live client work is commissioned.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'Website', 'AI Call Agent', 'Automation'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {filter === 'All' ? 'All Demo Projects' : `${filter}s`}
            </button>
          ))}
        </div>

        {/* 6 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 overflow-hidden group"
            >
              {/* Card Graphic Mockup */}
              <div className="relative h-48 bg-gradient-to-br from-[#11192e] to-[#0a0f1d] border-b border-slate-800 flex items-center justify-center p-6 overflow-hidden">
                {/* Visual Representation Graphic */}
                <div className="w-full h-full rounded-xl bg-[#090d18] border border-slate-700/50 flex flex-col overflow-hidden shadow-inner p-3 relative">
                  {/* Mock browser header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {project.id}.demo.saketdev
                    </span>
                  </div>

                  {/* Mock UI Content */}
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    {project.category === 'Website Development' && (
                      <div className="space-y-1.5 w-full">
                        <div className="h-3 w-3/4 mx-auto rounded bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" />
                        <div className="h-2 w-1/2 mx-auto rounded bg-slate-700 opacity-60" />
                        <div className="grid grid-cols-3 gap-1 pt-2">
                          <div className="h-6 rounded bg-slate-800 border border-slate-700/50" />
                          <div className="h-6 rounded bg-slate-800 border border-slate-700/50" />
                          <div className="h-6 rounded bg-slate-800 border border-slate-700/50" />
                        </div>
                      </div>
                    )}

                    {project.category === 'AI Call Agent' && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                        <div className="h-2 w-28 rounded-full bg-purple-500/40" />
                        <div className="text-[10px] text-purple-300 font-mono">Inbound Voice Stream Ready</div>
                      </div>
                    )}

                    {project.category === 'AI Automation' && (
                      <div className="flex items-center justify-center gap-2 w-full">
                        <div className="p-1.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[10px]">
                          Webhook
                        </div>
                        <span className="text-slate-400 text-xs">→</span>
                        <div className="p-1.5 rounded bg-blue-950 border border-blue-500/40 text-blue-400 text-[10px]">
                          Parser
                        </div>
                        <span className="text-slate-400 text-xs">→</span>
                        <div className="p-1.5 rounded bg-teal-950 border border-teal-500/40 text-teal-400 text-[10px]">
                          CRM Alert
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Clear "Demo Project" badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-600/50 text-amber-300 text-[11px] font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Demo Project
                </div>

                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-slate-400 text-[10px] font-medium border border-slate-800">
                  {project.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                    {project.categoryLabel}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack chips & Demo button */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-800/80 text-[11px] text-slate-300 border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedDemo(project)}
                      className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-blue-500"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Demo Preview</span>
                    </button>

                    <a
                      href="#contact"
                      className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                      title="Request similar project"
                    >
                      <Layers className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Demo Preview Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0d1424] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d18]">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-semibold">
                  Demo Project
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedDemo.title}</h3>
                  <p className="text-xs text-slate-400">{selectedDemo.categoryLabel}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDemo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Interactive Walkthrough Preview */}
            <div className="p-6 overflow-y-auto space-y-5 text-left">
              <div className="rounded-xl bg-[#070a14] border border-slate-800 p-4">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  Interactive Prototype Showcase
                </div>

                {selectedDemo.id === 'proj-1' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-white">SaaS Corporate Theme Demo</span>
                        <span className="text-[11px] text-emerald-400 font-mono">Status: Ready to Deploy</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-3">
                        Configured with smooth sticky headers, interactive pricing plans, high-contrast dark mode, and mobile navigation drawer.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-slate-800/80 text-slate-300">⚡ 99/100 Mobile Speed</div>
                        <div className="p-2 rounded bg-slate-800/80 text-slate-300">🛡️ Clean TypeScript Code</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDemo.id === 'proj-2' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold">
                        <Utensils className="w-4 h-4" />
                        <span>Gourmet Bistro Sample Menu & Table Booking</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span>Artisan Truffle Risotto</span>
                          <span className="text-amber-300 font-semibold">$24.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span>Pan-Seared Sea Bass</span>
                          <span className="text-amber-300 font-semibold">$32.00</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Smoked Burrata Salad</span>
                          <span className="text-amber-300 font-semibold">$18.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDemo.id === 'proj-3' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2 text-pink-400 text-xs font-bold">
                        <Sparkles className="w-4 h-4" />
                        <span>Luxury Spa & Salon Service Tier Demo</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-2">
                        Designed with warm pastel accents, stylist booking slots, and WhatsApp appointment confirmations.
                      </p>
                      <div className="p-2.5 rounded bg-pink-950/30 border border-pink-800/40 text-pink-300 text-xs">
                        Includes online service catalog and direct mobile chat booking integration.
                      </div>
                    </div>
                  </div>
                )}

                {selectedDemo.id === 'proj-4' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-300">AI Voice Receptionist Simulated Call</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/80 text-purple-200">24/7 Agent</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded bg-slate-800 text-slate-300">
                          <strong className="text-purple-400">Caller:</strong> "Hi, do you have any appointments available this Thursday?"
                        </div>
                        <div className="p-2 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200">
                          <strong className="text-cyan-300">AI Receptionist:</strong> "Hello! Yes, Thursday has openings at 2:00 PM and 4:30 PM. Would you like me to reserve the 2:00 PM slot for you?"
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDemo.id === 'proj-5' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-300">Lead Qualification Flow</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/80 text-blue-200">Automated Screening</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="p-2 rounded bg-slate-800">1. Identifies project type: Web Dev / AI Voice / Automation</div>
                        <div className="p-2 rounded bg-slate-800">2. Validates budget readiness: Under $200 / $500–$1,000 / $1,000+</div>
                        <div className="p-2 rounded bg-slate-800">3. Transcribes inquiry and routes high-priority alert directly to Saket</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDemo.id === 'proj-6' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-xs font-bold text-cyan-300 mb-2">n8n Pipeline Architecture</div>
                      <div className="space-y-1.5 text-xs font-mono text-slate-300">
                        <div className="p-2 rounded bg-cyan-950/40 border border-cyan-800/40">
                          [Trigger] Form Webhook / Inbound Call Event
                        </div>
                        <div className="p-2 rounded bg-blue-950/40 border border-blue-800/40">
                          [Action] Validate Email & Format Payload
                        </div>
                        <div className="p-2 rounded bg-indigo-950/40 border border-indigo-800/40">
                          [Action] Instant WhatsApp / Email Notification to Owner
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Capabilities in this Build:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedDemo.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200">
                Want a custom solution built specifically for your brand? Tell me about your requirements and we can start immediately.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#090d18]">
              <span className="text-xs text-slate-400">
                Demo links & live staging URLs can be replaced anytime.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDemo(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedDemo(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Discuss This Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
