import React from 'react';
import { Scissors, Calendar, Star, Clock, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';
import type { Service } from '../types';

export const HomeView: React.FC = () => {
  const { setActiveTab, setSelectedServiceForBooking, services, barbers } = useBarbershop();

  const handleBookService = (service: Service) => {
    setSelectedServiceForBooking(service);
    setActiveTab('booking');
  };

  return (
    <div className="space-y-6 pb-24 px-4 pt-4">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>La mejor barbería de la ciudad</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Estilo, Precisión y <span className="text-amber-400">Tradición</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Reserva tu turno en segundos, explora nuestros servicios exclusivos y lleva los mejores productos de cuidado personal a casa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('booking')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Turno Ahora</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 border border-slate-700 transition"
            >
              <Scissors className="w-4 h-4 text-amber-400" />
              <span>Ver Servicios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Pills */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex items-center space-x-3">
          <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Horario</h4>
            <p className="text-[11px] text-slate-400">Lun - Sáb: 9am - 8pm</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex items-center space-x-3">
          <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Ubicación</h4>
            <p className="text-[11px] text-slate-400">Av. Principal #452</p>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Scissors className="w-4 h-4 text-amber-400" />
            <span>Servicios Destacados</span>
          </h3>
          <button 
            onClick={() => setActiveTab('services')}
            className="text-xs text-amber-400 hover:underline flex items-center space-x-1 font-semibold"
          >
            <span>Ver todos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid gap-3">
          {services.slice(0, 3).map(service => (
            <div 
              key={service.id}
              className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3.5 flex items-center space-x-4 shadow-sm"
            >
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-20 h-20 object-cover rounded-xl border border-slate-700/50 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">{service.category}</span>
                <h4 className="text-sm font-bold text-white truncate">{service.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{service.description}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-extrabold text-amber-400">${service.price}</span>
                  <button
                    onClick={() => handleBookService(service)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barbers section */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Nuestros Barberos</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {barbers.map(barber => (
            <div key={barber.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-center space-y-2">
              <img 
                src={barber.avatar} 
                alt={barber.name} 
                className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-amber-500/50 shadow-md"
              />
              <div>
                <h4 className="text-xs font-bold text-white truncate">{barber.name}</h4>
                <p className="text-[10px] text-amber-400 font-medium">{barber.specialty}</p>
              </div>
              <div className="inline-flex items-center space-x-1 bg-slate-800 px-2 py-0.5 rounded-full text-[10px] text-slate-300">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{barber.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store teaser */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Tienda Oficial</span>
          <h4 className="text-sm font-bold text-white">Productos de Belleza & Barba</h4>
          <p className="text-xs text-slate-400">Pomadas, aceites y lociones profesionales.</p>
        </div>
        <button
          onClick={() => setActiveTab('store')}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex-shrink-0"
        >
          Explorar
        </button>
      </div>

    </div>
  );
};
