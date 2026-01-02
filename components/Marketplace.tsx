import React, { useState, useEffect } from 'react';
import { Package, Plus, RefreshCw, AlertCircle, Check } from 'lucide-react';

interface Item {
  id: number;
  title: string;
  description: string | null;
}

const API_URL = 'http://localhost:8001'; // Ajustez si votre backend est hébergé ailleurs

const Marketplace: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/items/`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError("Impossible de se connecter au backend. Vérifiez que le serveur FastAPI tourne sur le port 8001.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
        fetchItems();
      }
    } catch (err) {
      alert("Erreur lors de l'ajout du produit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#fefcf8]" id="marketplace">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Formulaire d'Ajout */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-100 sticky top-24">
              <h3 className="text-2xl font-bold text-emerald-950 mb-6 serif">Lister un produit</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2 uppercase tracking-wider">Nom du produit</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Tomates fraîches"
                    className="w-full px-5 py-4 rounded-2xl bg-emerald-50 border-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium text-emerald-950"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2 uppercase tracking-wider">Description / Quantité</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: 50kg, récolté hier matin..."
                    className="w-full px-5 py-4 rounded-2xl bg-emerald-50 border-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium text-emerald-950 h-32"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <RefreshCw className="animate-spin" size={20} /> : <Plus size={20} />}
                  Ajouter au marché
                </button>
                {successMsg && (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 p-3 rounded-xl">
                    <Check size={16} /> Produit ajouté avec succès !
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Liste des Produits */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-emerald-950 serif">Produits en direct</h3>
              <button 
                onClick={fetchItems}
                className="p-3 text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors"
                title="Actualiser"
              >
                <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                <AlertCircle size={48} className="text-red-400 mb-4" />
                <p className="text-red-900 font-bold mb-2">Erreur de connexion</p>
                <p className="text-red-700/70">{error}</p>
              </div>
            ) : items.length === 0 && !loading ? (
              <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-200 p-20 rounded-[3rem] text-center">
                <Package size={64} className="mx-auto text-emerald-200 mb-6" />
                <p className="text-xl text-emerald-900/40 font-bold serif">Aucun produit listé pour le moment</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-bl-[4rem] pointer-events-none group-hover:bg-yellow-400/20 transition-colors"></div>
                    <div className="w-12 h-12 bg-emerald-900 text-yellow-400 rounded-xl flex items-center justify-center mb-6">
                      <Package size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-950 mb-3">{item.title}</h4>
                    <p className="text-emerald-900/60 font-medium leading-relaxed">
                      {item.description || "Aucune description fournie."}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                       <span className="text-xs font-bold uppercase tracking-widest text-emerald-900/40">ID: #{item.id}</span>
                       <button className="text-emerald-700 font-bold text-sm hover:underline">Voir détails</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Marketplace;