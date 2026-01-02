import React from 'react';
import { PhoneCall, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToMarket = () => {
    document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl translate-x-1/2"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-flex items-center gap-3 bg-emerald-900/5 border border-emerald-900/10 px-5 py-2 rounded-full text-sm font-bold mb-8 text-emerald-900">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Innovation Agricole au Bénin
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-emerald-950 leading-[1.1] mb-8 serif">
              Cultivons l'avenir, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600 underline decoration-yellow-400 decoration-4 underline-offset-8">sans pertes.</span>
            </h1>
            
            <p className="text-xl text-emerald-900/80 leading-relaxed mb-12 max-w-2xl font-medium">
              AgriConnect transforme la chaîne de valeur agricole en connectant directement les producteurs locaux aux marchés, garantissant des revenus justes et des produits frais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={scrollToMarket}
                className="group bg-emerald-950 hover:bg-emerald-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-3 active:scale-95"
              >
                Explorer le marché <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={22} />
              </button>
              <button className="bg-white hover:bg-yellow-50 text-emerald-950 border-2 border-emerald-950/10 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
                <PhoneCall size={20} className="text-emerald-700" /> Parler à un conseiller
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 grayscale opacity-60">
               <div className="flex items-center gap-2 font-bold text-sm">
                 <CheckCircle2 size={18} className="text-emerald-700"/> +5000 Agriculteurs
               </div>
               <div className="flex items-center gap-2 font-bold text-sm">
                 <CheckCircle2 size={18} className="text-emerald-700"/> 100% Local
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1595062584113-479699742468?auto=format&fit=crop&q=80&w=1000" 
                alt="Producteur béninois" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
            </div>
            
            {/* Stats Card Overlay */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-emerald-50 max-w-[240px] animate-bounce-slow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-yellow-400 text-emerald-950 rounded-2xl flex items-center justify-center font-bold text-xl">
                  35%
                </div>
                <p className="text-sm font-bold text-emerald-950 leading-tight">Augmentation moyenne des revenus</p>
              </div>
              <div className="w-full bg-emerald-50 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[35%]"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full z-0 animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 border-[16px] border-emerald-100 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;