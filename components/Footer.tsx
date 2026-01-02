
import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center border border-emerald-700">
                <Leaf className="text-yellow-400" size={28} />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight serif">AgriConnect</span>
            </div>
            <p className="text-xl text-emerald-200/60 leading-relaxed mb-10 max-w-md">
              La passerelle intelligente vers une agriculture durable, rentable et sans gaspillage en Afrique.
            </p>
            <div className="flex gap-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-emerald-950 transition-all">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-bold text-lg mb-8">Solution</h4>
              <ul className="space-y-4 text-emerald-200/60 font-medium">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Marché Grossiste</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Portail Producteur</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Réseau Logistique</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">AgriPay</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-8">Société</h4>
              <ul className="space-y-4 text-emerald-200/60 font-medium">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Notre Mission</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Impact Social</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Actualités</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-lg mb-8">Contact</h4>
              <ul className="space-y-6 text-emerald-200/60 font-medium">
                <li className="flex items-start gap-4">
                  <Mail size={20} className="text-yellow-400 shrink-0" />
                  <span>contact@agriconnect.bj</span>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={20} className="text-yellow-400 shrink-0" />
                  <span>+229 01 00 00 00</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-yellow-400 shrink-0" />
                  <span>Zone Industrielle, Cotonou, Bénin</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:row justify-between items-center gap-8 text-sm font-bold text-emerald-500/80">
          <p>© 2025 AgriConnect. Propulsé par l'innovation locale.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Conditions Générales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
