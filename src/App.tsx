import React, { useState } from 'react';
import { BarbershopProvider, useBarbershop } from './context/BarbershopContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { StoreView } from './components/StoreView';
import { BookingWizard } from './components/BookingWizard';
import { AdminView } from './components/AdminView';
import { BarberView } from './components/BarberView';
import { CartDrawer } from './components/CartDrawer';
import { StaffLoginModal } from './components/StaffLoginModal';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, staffUser } = useBarbershop();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl relative shadow-2xl border-x border-slate-900 overflow-x-hidden">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 pb-20">
        {staffUser ? (
          <>
            {activeTab === 'admin' && <AdminView />}
            {activeTab === 'barber' && <BarberView />}
            {activeTab !== 'admin' && activeTab !== 'barber' && (
              <div className="p-8 text-center space-y-4">
                <h2 className="text-xl font-bold text-white">Panel de Personal</h2>
                <p className="text-sm text-slate-400">Hola, {staffUser.name}. Selecciona tu panel de gestión:</p>
                <div className="flex justify-center space-x-3">
                  {staffUser.role === 'admin' && (
                    <button 
                      onClick={() => setActiveTab('admin')} 
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
                    >
                      Panel Admin
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveTab('barber')} 
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
                  >
                    Portal Barberos
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'services' && <ServicesView />}
            {activeTab === 'store' && <StoreView />}
            {activeTab === 'booking' && <BookingWizard />}
            {(activeTab === 'admin' || activeTab === 'barber') && (
              <div className="p-8 text-center space-y-6">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl inline-block text-amber-400">
                  ⚠️
                </div>
                <h2 className="text-xl font-bold text-white">Área Restringida</h2>
                <p className="text-sm text-slate-400">
                  Esta sección es exclusiva para la administración y barberos del local. Por favor inicia sesión con tus credenciales.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {!staffUser && <Navbar />}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StaffLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <BarbershopProvider>
      <AppContent />
    </BarbershopProvider>
  );
}
