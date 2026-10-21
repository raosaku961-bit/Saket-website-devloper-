import React from 'react';
import { MessageCircle, Mail, ArrowUp, Github, Linkedin, Twitter, Globe } from 'lucide-react';

interface FooterProps {
  onOpenSetupGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSetupGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070d] border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-md">
                SWD
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Saket <span className="text-blue-400 font-normal">Web Developer</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Modern websites, intelligent AI voice agents, and practical workflow automations designed to help businesses grow their online presence.
            </p>

            <div className="pt-2 text-xs text-slate-400">
              Founder & Developer:{' '}
              <span className="text-white font-medium">Saket</span>
            </div>

            {/* Editable Social Media Placeholders (explicitly marked without fake accounts) */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Connect & Profiles (Editable Links):
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="GitHub Profile (Replace with your link)"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="LinkedIn Profile (Replace with your link)"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="X / Twitter (Replace with your link)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-blue-400 transition-colors">
                  Portfolio (Demos)
                </a>
              </li>
              <li>
                <a href="#why-me" className="hover:text-blue-400 transition-colors">
                  Why Choose Me
                </a>
              </li>
              <li>
                <a href="#how-i-work" className="hover:text-blue-400 transition-colors">
                  How I Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Saket
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Website Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  AI Call Agents
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Workflow Automation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Landing Pages
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Restaurant Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Voice Receptionists
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Links & Saket Admin Setup */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:raosaku961@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>raosaku961@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919219523899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+91 9219523899</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-slate-400 block">Location:</span>
                <span className="text-xs text-slate-300">Remote • US & Global Clients</span>
              </li>

              {onOpenSetupGuide && (
                <li className="pt-3">
                  <button
                    type="button"
                    onClick={onOpenSetupGuide}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Owner Guide (हिंदी गाइड)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} Saket Web Developer. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Owner: Saket</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
