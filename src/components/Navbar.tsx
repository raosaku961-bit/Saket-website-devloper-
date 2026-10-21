import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenSetupGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSetupGuide }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Why Choose Me', href: '#why-me' },
    { label: 'How I Work', href: '#how-i-work' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060911]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base tracking-wider shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <span>SWD</span>
              <div className="absolute inset-0 rounded-xl border border-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg tracking-tight font-display flex items-center gap-1.5">
                Saket <span className="text-blue-400 font-medium">Web Developer</span>
              </span>
              <span className="text-[11px] text-slate-400 tracking-wide">
                Websites & AI Solutions
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenSetupGuide && (
              <button
                type="button"
                onClick={onOpenSetupGuide}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-800/40 border border-slate-800 transition-colors"
                title="Hindi setup instructions for Saket"
              >
                Setup Guide (हिंदी)
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenSetupGuide && (
              <button
                type="button"
                onClick={onOpenSetupGuide}
                className="px-2 py-1 rounded-md text-[11px] font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/60"
              >
                हिंदी Guide
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090e1a] border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-1 py-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full py-3 rounded-xl font-semibold text-sm text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href="https://wa.me/919219523899?text=Hello%20Saket%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto:raosaku961@gmail.com"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/60"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
