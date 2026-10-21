import React from 'react';
import { Mail, MessageCircle, Globe2, ShieldCheck, Terminal, Sparkles, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative bg-[#070a14] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Professional Technology-Themed Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#131d36] to-[#0a1020] border border-blue-500/30 p-8 shadow-2xl shadow-blue-950/50 overflow-hidden group">
              {/* Decorative circuit lines & glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Developer Monogram Badge */}
              <div className="relative z-10 flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl shadow-blue-600/30 mb-4 border border-white/20">
                  <span>SWD</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Saket</h3>
                <p className="text-sm text-blue-400 font-medium">Independent Web Developer & AI Builder</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-xs text-slate-300 border border-slate-800 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Serving US & Global Clients</span>
                </div>
              </div>

              {/* Verified Direct Contact Chips */}
              <div className="relative z-10 space-y-2.5 pt-4 border-t border-slate-800">
                <a
                  href="https://wa.me/919219523899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors text-xs"
                >
                  <span className="text-slate-400 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
                  </span>
                  <span className="text-white font-mono font-medium">+91 9219523899</span>
                </a>

                <a
                  href="mailto:raosaku961@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors text-xs"
                >
                  <span className="text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" /> Direct Email
                  </span>
                  <span className="text-white font-mono font-medium truncate max-w-[180px]">
                    raosaku961@gmail.com
                  </span>
                </a>
              </div>

              {/* Tech Standards */}
              <div className="relative z-10 grid grid-cols-2 gap-2 mt-4 text-[11px] text-slate-400">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Modern Stack</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Ownership</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Exact specified introduction */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Independent Creator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              About Saket
            </h2>

            {/* Exact required copy from user specification */}
            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              <p>
                I'm Saket, an independent web developer focused on building modern websites and practical
                AI-powered business solutions.
              </p>
              <p>
                My services include website development, AI voice agent development, and workflow
                automation.
              </p>
              <p>
                I aim to help businesses establish a stronger online presence through thoughtful design
                and useful technology.
              </p>
            </div>

            {/* Quick Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="text-white font-bold text-sm mb-1">Modern Code</h4>
                <p className="text-xs text-slate-400">Built using current web standards and clean responsive layouts.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="text-white font-bold text-sm mb-1">Practical AI</h4>
                <p className="text-xs text-slate-400">Useful automation tools that solve everyday business bottlenecks.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="text-white font-bold text-sm mb-1">Transparent Value</h4>
                <p className="text-xs text-slate-400">Honest project scoping with clear direct communication.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
