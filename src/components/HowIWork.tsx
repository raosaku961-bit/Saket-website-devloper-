import React from 'react';
import { Search, Compass, Terminal, Rocket, ArrowRight } from 'lucide-react';

export const HowIWork: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'DISCOVERY',
      subtitle: 'Understand Requirements',
      description: "Understand the client's business, goals, and requirements.",
      icon: Search,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgGlow: 'bg-blue-500/10',
    },
    {
      step: '02',
      title: 'PLANNING',
      subtitle: 'Define Architecture',
      description: 'Define project scope, features, design, and delivery expectations.',
      icon: Compass,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      bgGlow: 'bg-indigo-500/10',
    },
    {
      step: '03',
      title: 'DEVELOPMENT',
      subtitle: 'Build & Test',
      description: 'Build the solution and test its functionality.',
      icon: Terminal,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgGlow: 'bg-purple-500/10',
    },
    {
      step: '04',
      title: 'DELIVERY',
      subtitle: 'Launch & Handover',
      description: 'Review the project, deploy it, and provide the agreed handover.',
      icon: Rocket,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgGlow: 'bg-cyan-500/10',
    },
  ];

  return (
    <section id="how-i-work" className="py-20 md:py-28 relative bg-[#060911] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Structured Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            How I Work
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A simple, transparent 4-step path from your initial idea to a fully tested, deployed digital solution.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between p-7 rounded-2xl bg-[#0d1322] border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 group"
              >
                {/* Step pill & icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-slate-400 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                      STEP {item.step}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl ${item.bgGlow} border ${item.borderColor} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Milestone {index + 1} of 4</span>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  ) : (
                    <span className="text-emerald-400 font-medium">Ready to scale</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
