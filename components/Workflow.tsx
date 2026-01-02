
import React from 'react';

const Workflow: React.FC = () => {
  const workflowSteps = [
    { num: 1, title: "Producteur contacté", desc: "Appel téléphonique pour collecter l'offre disponible en temps réel." },
    { num: 2, title: "AgriConnect centralise", desc: "Mise en ligne immédiate des produits sur la plateforme sécurisée." },
    { num: 3, title: "Acheteur commande", desc: "Via le site web ou par téléphone selon le profil de l'acheteur." },
    { num: 4, title: "Paiement sécurisé", desc: "Transaction en ligne garantissant la confiance entre les parties." },
    { num: 5, title: "Livraison organisée", desc: "Coordination logistique pour réduire drastiquement les pertes." }
  ];

  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-20 text-center serif">Flux de Commande</h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-1 bg-emerald-200 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 text-center md:text-left">
                  <div className={`p-8 bg-white rounded-3xl shadow-sm border border-emerald-50 transform transition-transform hover:scale-105 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">{step.title}</h3>
                    <p className="text-emerald-800/60">{step.desc}</p>
                  </div>
                </div>
                
                <div className="w-12 h-12 bg-emerald-800 text-yellow-400 rounded-full flex items-center justify-center font-bold text-xl z-10 border-4 border-emerald-50 relative shrink-0">
                  {step.num}
                </div>
                
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
