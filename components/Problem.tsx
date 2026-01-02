import React from 'react';
import { Truck, Layers, EyeOff, MinusCircle } from 'lucide-react';

const Problem: React.FC = () => {
  const problems = [
    {
      title: "Logistique Fragile",
      desc: "Le manque d'infrastructures de froid cause la perte de 40% des récoltes périssables chaque année.",
      icon: <Truck size={28} />
    },
    {
      title: "Intermédiaires Multiples",
      desc: "Une chaîne trop longue où le producteur ne reçoit qu'une fraction du prix final payé par le client.",
      icon: <Layers size={28} />
    },
    {
      title: "Désert Informationnel",
      desc: "Les agriculteurs isolés ignorent la demande réelle, produisant souvent à perte ou sans débouchés.",
      icon: <EyeOff size={28} />
    }
  ];

  return (
    <section className="py-32 bg-white" id="problème">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-emerald-900 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
              <MinusCircle size={16} className="text-yellow-500" /> Le Constat Actuel
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-emerald-950 serif">
              Pourquoi le système actuel <br/> <span className="text-emerald-700 italic">doit changer ?</span>
            </h3>
          </div>
          <p className="text-xl text-emerald-900/60 max-w-sm font-medium leading-relaxed">
            Chaque année, des tonnes de nourriture sont gaspillées pendant que les revenus ruraux stagnent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {problems.map((p, i) => (
            <div key={i} className="group p-12 rounded-[2.5rem] bg-emerald-50/30 border border-emerald-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 relative overflow-hidden">
              <div className="w-16 h-16 bg-white text-emerald-700 rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:bg-emerald-950 group-hover:text-yellow-400 transition-all duration-500">
                {p.icon}
              </div>
              <h4 className="text-2xl font-bold text-emerald-950 mb-6">{p.title}</h4>
              <p className="text-lg text-emerald-900/70 leading-relaxed font-medium">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;