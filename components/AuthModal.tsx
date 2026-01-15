import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:8001';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || 'Erreur de connexion');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userEmail', email);

        setSuccess('Connexion réussie !');
        setTimeout(() => {
          onClose();
          window.location.reload(); // Recharger pour mettre à jour la navbar
        }, 1000);
      } else {
        // Register
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || 'Erreur lors de l\'inscription');
        }

        const userData = await response.json();

        // Auto-login après inscription
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('token', loginData.access_token);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', name);
        }

        setSuccess('Compte créé avec succès !');
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-emerald-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-emerald-900/20 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="p-10 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-emerald-950 serif mb-3">
              {isLogin ? 'Bon retour parmi nous' : 'Rejoindre AgriConnect'}
            </h2>
            <p className="text-emerald-900/50 font-medium">
              {isLogin ? 'Accédez à votre tableau de bord agricole' : 'Commencez à vendre ou acheter dès aujourd\'hui'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700">
              <CheckCircle size={20} />
              <span className="font-medium">{success}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-900/30" size={20} />
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full pl-14 pr-5 py-4 bg-emerald-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 transition-all font-medium text-emerald-950"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-900/30" size={20} />
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-14 pr-5 py-4 bg-emerald-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 transition-all font-medium text-emerald-950"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-900/30" size={20} />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-14 pr-5 py-4 bg-emerald-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 transition-all font-medium text-emerald-950"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-950 hover:bg-emerald-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Chargement...' : (isLogin ? 'Se Connecter' : 'Créer un compte')}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-emerald-100"></div>
            <span className="text-xs font-bold text-emerald-900/20 uppercase tracking-widest">Ou continuer avec</span>
            <div className="h-px flex-1 bg-emerald-100"></div>
          </div>

          <div className="mt-8 flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 py-4 border border-emerald-100 rounded-2xl hover:bg-emerald-50 transition-all font-bold text-emerald-950">
              <Github size={20} /> GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 py-4 border border-emerald-100 rounded-2xl hover:bg-emerald-50 transition-all font-bold text-emerald-950">
              Google
            </button>
          </div>

          <p className="mt-10 text-center text-emerald-900/50 font-medium">
            {isLogin ? "Vous n'avez pas de compte ?" : "Déjà membre ?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="ml-2 text-emerald-700 font-bold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;