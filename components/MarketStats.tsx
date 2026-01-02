import React from 'react';
import { Users, Store, Globe } from 'lucide-react';

const MarketStats: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden" id="impact">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-emerald-900 font-bold tracking-widest uppercase text-sm mb-4">Notre Impact</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-emerald-950 serif mb-6">Un écosystème en croissance</h3>
          <p className="text-xl text-emerald-900/60 font-medium">Nous construisons le plus grand réseau agricole d'Afrique de l'Ouest.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {[
            { icon: <Users size={40}/>, count: "1,200+", label: "Producteurs actifs", sub: "Bénin, Togo, Côte d'Ivoire" },
            { icon: <Store size={40}/>, count: "450+", label: "Grossistes certifiés", sub: "Acheteurs en gros volumes" },
            { icon: <Globe size={40}/>, count: "85%", label: "Réduction des pertes", sub: "Sur les produits périssables" }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 text-emerald-900 rounded-3xl mb-8 group-hover:bg-yellow-400 transition-all duration-500 transform group-hover:-translate-y-2">
                {stat.icon}
              </div>
              <div className="text-6xl md:text-7xl font-bold text-emerald-950 mb-4 serif tracking-tighter">{stat.count}</div>
              <h4 className="text-2xl font-bold text-emerald-900 mb-2">{stat.label}</h4>
              <p className="text-emerald-900/50 font-medium">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketStats;