import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyChooseMe } from './components/WhyChooseMe';
import { HowIWork } from './components/HowIWork';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminSetupModal } from './components/AdminSetupModal';

export default function App() {
  const [selectedService, setSelectedService] = useState('Website Development');
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenSetupGuide={() => setIsSetupGuideOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <ServicesSection onSelectService={handleSelectService} />
        <PortfolioSection />
        <WhyChooseMe />
        <HowIWork />
        <AboutSection />
        <FAQSection />
        <ContactSection
          selectedService={selectedService}
          onOpenSetupGuide={() => setIsSetupGuideOpen(true)}
        />
      </main>

      {/* Global Footer */}
      <Footer onOpenSetupGuide={() => setIsSetupGuideOpen(true)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Hindi Guide & Admin Setup Modal for Saket */}
      <AdminSetupModal
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
      />
    </div>
  );
}
