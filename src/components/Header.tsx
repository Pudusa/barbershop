import React from 'react';
import { Scissors, ShoppingBag, Lock, LogOut, User } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { setActiveTab, cart, staffUser, setIsStaffLoginOpen, logoutStaff } = useBarbershop();
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
        {staffUser ? (
          <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl">
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-slate-200 font-medium max-w-[100px] truncate">
              {staffUser.name} ({staffUser.role === 'admin' ? 'Admin' : 'Barbero'})
            </span>
            <button
              onClick={logoutStaff}
              className="text-slate-400 hover:text-red-400 p-1 transition"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsStaffLoginOpen(true)}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition text-xs font-medium flex items-center space-x-1 border border-slate-800"
            title="Acceso Personal"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Staff</span>
          </button>
        )}

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
