import React from 'react';
import { Scissors, ShoppingBag, ShieldCheck, UserCheck } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { activeTab, setActiveTab, cart } = useBarbershop();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <div className="bg-amber-500 p-2 rounded-xl text-slate-950 font-bold shadow-lg shadow-amber-500/20">
          <Scissors className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-wide leading-none">EL MAESTRO</h1>
          <span className="text-xs text-amber-400 font-medium tracking-widest">BARBER SHOP</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Role Switcher / Admin & Barber */}
        <button
          onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
          className={`p-2 rounded-xl text-xs font-medium transition flex items-center space-x-1 ${
            activeTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Panel Admin"
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">Admin</span>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'barber' ? 'home' : 'barber')}
          className={`p-2 rounded-xl text-xs font-medium transition flex items-center space-x-1 ${
            activeTab === 'barber' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Portal Barbero"
        >
          <UserCheck className="w-4 h-4" />
          <span className="hidden sm:inline">Barberos</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          className="relative p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
          aria-label="Carrito de compras"
        >
          <ShoppingBag className="w-5 h-5 text-amber-400" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
              {totalCartItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
