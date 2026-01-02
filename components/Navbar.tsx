import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#' },
    { name: 'Solution', href: '#solution' },
    { name: 'Marché', href: '#marketplace' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm h-20' : 'bg-transparent h-24'
    }`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <Leaf className="text-yellow-400" size={24} />
          </div>
          <span className="text-2xl font-bold text-emerald-950 tracking-tight serif">AgriConnect</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-emerald-950 font-semibold hover:text-emerald-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={onOpenAuth}
            className="bg-yellow-400 text-emerald-950 px-7 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-md active:scale-95"
          >
            Se Connecter
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-emerald-950 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-emerald-100 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300 shadow-xl">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-xl font-bold text-emerald-950 p-2" 
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsOpen(false);
              onOpenAuth();
            }}
            className="bg-emerald-950 text-white px-6 py-5 rounded-2xl font-bold shadow-lg text-center"
          >
            Se Connecter
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;