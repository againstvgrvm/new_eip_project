
import React from 'react';
import { Phone, Database, ShoppingCart, CreditCard, Sparkles } from 'lucide-react';

const Solution: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "L'Appel Producteur",
      desc: "Un simple appel suffit. Nos agents collectent les stocks disponibles sans besoin d'internet.",
      icon: <Phone size={24} />
    },
    {
      id: "02",
      title: "Data Intelligence",
      desc: "La plateforme centralise et analyse l'offre pour la faire correspondre à la demande.",
      icon: <Database size={24} />
    },
    {
      id: "03",
      title: "Marché Digital",
      desc: "Les acheteurs commandent via une interface intuitive, sécurisée et transparente.",
      icon: <ShoppingCart size={24} />
    },
    {
      id: "04",
      title: "Paiement Direct",
      desc: "Transactions instantanées garantissant la sécurité pour l'acheteur et le vendeur.",
      icon: <CreditCard size={24} />
    }
  ];

  return (
    <section className="py-32 bg-emerald-950 text-white relative overflow-hidden" id="solution">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-400 font-bold mb-6">
              <Sparkles size={20} /> NOTRE SOLUTION HYBRIDE
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 serif leading-tight">
              La technologie au service <br/> <span className="text-yellow-400">du monde rural.</span>
            </h2>
            <p className="text-xl text-emerald-200/80 mb-12 leading-relaxed">
              Nous brisons la fracture numérique en utilisant le téléphone vocal comme interface pour les producteurs, et le web moderne pour les acheteurs urbains.
            </p>
            
            <div className="space-y-6">
              {[
                "Accessibilité universelle (GSM)",
                "Logistique mutualisée",
                "Transparence totale des prix",
                "Zéro perte post-récolte"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-lg font-medium">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-emerald-950">
                    <div className="w-2 h-2 bg-emerald-950 rounded-full"></div>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
             {steps.map((step, idx) => (
               <div key={idx} className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:border-yellow-400/50 transition-all group">
                  <div className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                  <div className="text-xs font-bold text-yellow-400/60 mb-2 tracking-widest">{step.id}</div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-emerald-200/60 text-sm leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
