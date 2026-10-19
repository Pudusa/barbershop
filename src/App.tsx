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

const AppContent: React.FC = () => {
  const { activeTab } = useBarbershop();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl relative shadow-2xl border-x border-slate-900 overflow-x-hidden">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'store' && <StoreView />}
        {activeTab === 'booking' && <BookingWizard />}
        {activeTab === 'admin' && <AdminView />}
        {activeTab === 'barber' && <BarberView />}
      </main>

      <Navbar />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
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
