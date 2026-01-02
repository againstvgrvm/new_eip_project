import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Problem from './components/Problem.tsx';
import Solution from './components/Solution.tsx';
import Marketplace from './components/Marketplace.tsx';
import MarketStats from './components/MarketStats.tsx';
import Workflow from './components/Workflow.tsx';
import Footer from './components/Footer.tsx';
import ChatBot from './components/ChatBot.tsx';
import AuthModal from './components/AuthModal.tsx';
import { Users, BarChart3, Leaf, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuth = () => setIsAuthModalOpen(true);

  return (
    <div className="min-h-screen bg-[#fefcf8]">
      <Navbar onOpenAuth={openAuth} />
      
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Marketplace />
        <MarketStats />
        <Workflow />
        
        {/* Value Proposition Section */}
        <section className="py-32 bg-white overflow-hidden relative" id="valeur">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-4xl md:text-6xl font-bold text-emerald-950 serif mb-6">Valeur Ajoutée</h2>
               <p className="text-xl text-emerald-900/60 font-medium">Une solution pensée pour chaque acteur du monde agricole.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Pour les Agriculteurs",
                  desc: "Accès immédiat au marché national sans intermédiaire, via une simple ligne GSM.",
                  icon: <Users size={32} />,
                  color: "bg-emerald-50"
                },
                {
                  title: "Pour les Acheteurs",
                  desc: "Source unique de produits frais avec prix fixés et logistique garantie jusqu'au point de vente.",
                  icon: <BarChart3 size={32} />,
                  color: "bg-yellow-50"
                },
                {
                  title: "Pour l'Économie",
                  desc: "Soutien à la souveraineté alimentaire et réduction drastique de l'empreinte carbone liée aux pertes.",
                  icon: <Leaf size={32} />,
                  color: "bg-emerald-900 text-white"
                }
              ].map((card, i) => (
                <div key={i} className={`${card.color} p-12 rounded-[3rem] transition-transform hover:-translate-y-2 duration-500`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${i === 2 ? 'bg-yellow-400 text-emerald-950' : 'bg-white text-emerald-900 shadow-sm'}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{card.title}</h3>
                  <p className={`text-lg leading-relaxed font-medium ${i === 2 ? 'text-emerald-100' : 'text-emerald-900/70'}`}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto bg-emerald-950 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
             <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-[100px]"></div>
             
             <div className="relative z-10">
               <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 serif leading-tight">
                 Prêt à révolutionner <br/> <span className="text-yellow-400 italic">votre business ?</span>
               </h2>
               <p className="text-emerald-100 text-xl md:text-2xl mb-14 max-w-3xl mx-auto font-medium opacity-80 leading-relaxed">
                 Rejoignez la plateforme qui transforme l'agriculture ouest-africaine. Que vous soyez producteur ou acheteur, AgriConnect est votre allié.
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button 
                  onClick={openAuth}
                  className="bg-yellow-400 hover:bg-yellow-300 text-emerald-950 px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                 >
                   Nous Rejoindre <ArrowRight size={24} />
                 </button>
                 <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-12 py-6 rounded-2xl font-bold text-xl transition-all backdrop-blur-md">
                   Demander une Démo
                 </button>
               </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default App;