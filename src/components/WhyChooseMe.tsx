import React from 'react';
import { Cpu, Smartphone, MessageCircleCode, Sliders } from 'lucide-react';

export const WhyChooseMe: React.FC = () => {
  const features = [
    {
      id: 'tech',
      title: 'Modern Technology',
      description: 'Solutions designed around modern web and AI technologies.',
      icon: Cpu,
      gradient: 'from-blue-600 to-cyan-600',
      badge: 'Current Stack',
    },
    {
      id: 'responsive',
      title: 'Responsive Design',
      description: 'Websites designed to work across mobile phones, tablets, and desktops.',
      icon: Smartphone,
      gradient: 'from-indigo-600 to-purple-600',
      badge: 'All Viewports',
    },
    {
      id: 'communication',
      title: 'Clear Communication',
      description: 'Straightforward project discussions and clear expectations.',
      icon: MessageCircleCode,
      gradient: 'from-purple-600 to-pink-600',
      badge: 'Direct Contact',
    },
    {
      id: 'custom',
      title: 'Customized Solutions',
      description: "Solutions tailored to each client's requirements.",
      icon: Sliders,
      gradient: 'from-cyan-600 to-emerald-600',
      badge: 'Bespoke Work',
    },
  ];

  return (
    <section id="why-me" className="py-20 md:py-28 relative bg-[#070a14] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Why Choose Saket?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            I prioritize clarity, modern engineering standards, and practical outcomes for every
            project without unnecessary complexity or bloated processes.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-7 rounded-2xl bg-[#0f172a]/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                  <span>Reliable delivery</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
