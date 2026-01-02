
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: "Bonjour ! Je suis l'assistant AgriConnect. Comment puis-je vous aider aujourd'hui ?"}
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
    if (!input.trim()) return;
    
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
          systemInstruction: `Tu es l'assistant d'AgriConnect, une startup au Bénin.
          Ton rôle est d'expliquer le projet aux investisseurs, agriculteurs et acheteurs.
          Détails clés : 
          - Mission : Réduire les pertes post-récolte.
          - Modèle : Hybride (téléphone pour les fermiers, web pour les acheteurs).
          - Cibles : Producteurs Songhai, grossistes, bonnes dames.
          - Couleurs : Vert et Jaune.
          Sois amical, professionnel et concis. Réponds en français.`,
        }
      });

      const botText = response.text || "Désolé, j'ai rencontré une petite erreur technique.";
      setMessages(prev => [...prev, {role: 'bot', text: botText}]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {role: 'bot', text: "Erreur de connexion. Veuillez réessayer plus tard."}]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-yellow-400 text-emerald-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-emerald-900 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Besoin d'aide ?
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-emerald-800 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center border border-emerald-600">
                <Sparkles size={20} className="text-yellow-400" />
              </div>
              <div>
                <h4 className="font-bold leading-tight">AgriConnect AI</h4>
                <p className="text-xs text-emerald-300">En ligne</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100"><X size={20}/></button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FDFBF7]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-800 text-white rounded-tr-none' 
                    : 'bg-white text-emerald-900 shadow-sm border border-emerald-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 rounded-tl-none">
                  <Loader2 size={18} className="animate-spin text-emerald-600" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-emerald-50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="w-full pl-4 pr-12 py-3 bg-emerald-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 text-emerald-900"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-800 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
