import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, CheckCircle, Code2, Bot, Zap } from 'lucide-react';
import { ThreeHeroScene } from './ThreeHeroScene';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, and CTAs */}
          <div className="lg:col-span-6 flex flex-col text-left">
            {/* Small Heading Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-6 w-fit shadow-sm shadow-blue-950">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>WEB DEVELOPMENT & AI SOLUTIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-white leading-[1.12] tracking-tight mb-6">
              Websites & AI Solutions That{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Help Businesses Grow.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl font-normal">
              I build modern websites, intelligent AI voice agents, and business automation solutions
              that help companies strengthen their online presence and improve customer experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                type="button"
                onClick={() => scrollTo('services')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25 transition-all duration-200 cursor-pointer flex items-center gap-2 group"
              >
                <span>Explore My Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('portfolio')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 shadow-md transition-all duration-200 cursor-pointer"
              >
                View My Work
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/60 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Let's Talk</span>
              </button>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-xs sm:text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>Modern Web</span>
                </div>
                <span className="text-[11px] text-slate-400">Fast & responsive</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-xs sm:text-sm">
                  <Bot className="w-4 h-4" />
                  <span>AI Voice Agents</span>
                </div>
                <span className="text-[11px] text-slate-400">24/7 Smart calling</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs sm:text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Automation</span>
                </div>
                <span className="text-[11px] text-slate-400">Connected workflows</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 mt-6 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Available for US & Global Startups
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Direct WhatsApp & Email Support
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Tech Visual */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ThreeHeroScene />
          </div>
        </div>
      </div>
    </section>
  );
};
