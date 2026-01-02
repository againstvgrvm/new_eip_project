
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Headset } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: "Bienvenue sur AgriConnect. Comment pouvons-nous vous accompagner dans votre projet agricole ?"}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Vous agissez en tant que conseiller expert pour AgriConnect. 
          Votre ton est professionnel, chaleureux et pragmatique.
          Répondez aux questions sur la logistique, les débouchés pour les agriculteurs béninois et le fonctionnement de la plateforme.
          Ne mentionnez pas que vous êtes un modèle de langage ou une IA, présentez-vous comme le Support AgriConnect.`,
        }
      });

      const botText = response.text || "Une erreur est survenue lors de la communication avec nos serveurs.";
      setMessages(prev => [...prev, {role: 'bot', text: botText}]);
    } catch (error) {
      setMessages(prev => [...prev, {role: 'bot', text: "Nos agents sont actuellement indisponibles. Veuillez réessayer ultérieurement."}]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-yellow-400 text-emerald-950 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
        aria-label="Ouvrir le support"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 md:w-96 h-[550px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(6,78,59,0.15)] flex flex-col z-50 overflow-hidden border border-emerald-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-emerald-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center border border-emerald-700">
                <Headset size={20} className="text-yellow-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">SUPPORT AGRICONNECT</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-bold text-emerald-300 uppercase">En ligne</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-emerald-50/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-900 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-emerald-950 shadow-sm border border-emerald-100 rounded-tl-none font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-emerald-50">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Décrivez votre besoin..."
                className="flex-1 pl-4 pr-4 py-3 bg-emerald-50/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 text-emerald-950 border border-emerald-100"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 bg-emerald-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-800 disabled:opacity-30 transition-all shadow-lg active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
