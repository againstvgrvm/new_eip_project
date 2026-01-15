import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (token) {
      setIsAuthenticated(true);
      setUserName(name || email?.split('@')[0] || 'Utilisateur');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fefcf8]/95 backdrop-blur-md border-b border-emerald-900/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-emerald-950 serif">AgriConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#problème" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors">Problème</a>
            <a href="#solution" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors">Solution</a>
            <a href="#marketplace" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors">Marché</a>
            <a href="#valeur" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors">Impact</a>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl">
                  <User size={18} className="text-emerald-700" />
                  <span className="font-bold text-emerald-900">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold transition-all"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-emerald-950 hover:bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
              >
                Se Connecter
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-emerald-900/5">
            <div className="flex flex-col gap-4">
              <a href="#problème" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors py-2">Problème</a>
              <a href="#solution" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors py-2">Solution</a>
              <a href="#marketplace" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors py-2">Marché</a>
              <a href="#valeur" className="text-emerald-900 hover:text-emerald-700 font-medium transition-colors py-2">Impact</a>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 rounded-xl mt-2">
                    <User size={18} className="text-emerald-700" />
                    <span className="font-bold text-emerald-900">{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold transition-all"
                  >
                    <LogOut size={18} />
                    Déconnexion
                  </button>
                </>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="bg-emerald-950 hover:bg-emerald-900 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 mt-2"
                >
                  Se Connecter
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;