import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    'https://wa.me/919219523899?text=Hello%20Saket%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20your%20services.';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2.5 max-w-[210px] p-2.5 rounded-xl bg-[#0f172a] border border-emerald-500/40 text-white text-xs shadow-xl shadow-black/60 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 p-0.5 text-slate-400 hover:text-white"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Chat with Saket
          </div>
          <p className="text-[11px] text-slate-300">
            Have a question? Tap here to start a direct WhatsApp chat!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Saket on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7" />
        {/* Subtle glow ring without pulsating @keyframes */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-300/40" />
      </a>
    </div>
  );
};
