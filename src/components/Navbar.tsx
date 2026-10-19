import React from 'react';
import { Home, Scissors, ShoppingBag, Calendar } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';
import type { ActiveTab } from '../types';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useBarbershop();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'services', label: 'Servicios', icon: Scissors },
    { id: 'store', label: 'Tienda', icon: ShoppingBag },
    { id: 'booking', label: 'Reservar', icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800 py-2 px-6 flex justify-around items-center max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? 'text-amber-400 bg-amber-500/10 scale-105 font-bold'
                : 'text-slate-400 hover:text-slate-200 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
