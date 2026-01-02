
import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-yellow-400 text-emerald-950 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white"
        aria-label="Ouvrir le support"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-72 md:w-80 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(6,78,59,0.25)] flex flex-col z-50 overflow-hidden border border-emerald-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-emerald-950 p-6 text-white text-center">
            <h4 className="font-bold text-lg tracking-tight serif">Support AgriConnect</h4>
            <p className="text-emerald-300 text-xs font-bold uppercase mt-1">Équipe disponible 24/7</p>
          </div>

          <div className="p-4 space-y-3 bg-emerald-50/20">
            <a 
              href="tel:+22901000000"
              className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-emerald-50 transition-colors border border-emerald-100 group"
            >
              <div className="w-10 h-10 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-all">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-emerald-900/50 font-bold uppercase">Appelez-nous</p>
                <p className="text-sm font-bold text-emerald-950">+229 01 00 00 00</p>
              </div>
            </a>

            <a 
              href="https://wa.me/22901000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-emerald-50 transition-colors border border-emerald-100 group"
            >
              <div className="w-10 h-10 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
                <MessageCircle size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-emerald-900/50 font-bold uppercase">WhatsApp</p>
                <p className="text-sm font-bold text-emerald-950">Discuter en ligne</p>
              </div>
              <ExternalLink size={14} className="text-emerald-300" />
            </a>

            <a 
              href="mailto:contact@agriconnect.bj"
              className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-emerald-50 transition-colors border border-emerald-100 group"
            >
              <div className="w-10 h-10 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-emerald-900/50 font-bold uppercase">Email</p>
                <p className="text-sm font-bold text-emerald-950">contact@agriconnect.bj</p>
              </div>
            </a>
          </div>

          <div className="p-4 bg-emerald-950/5 text-center">
            <p className="text-[10px] text-emerald-900/40 font-bold uppercase tracking-widest">Réponse sous 15 minutes</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
