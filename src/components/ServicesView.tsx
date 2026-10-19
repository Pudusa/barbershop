import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';
import type { Service } from '../types';

export const ServicesView: React.FC = () => {
  const { services, setActiveTab, setSelectedServiceForBooking } = useBarbershop();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Cortes', 'Barba', 'Combos', 'Tratamientos'];

  const filteredServices = selectedCategory === 'Todos'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const handleBook = (service: Service) => {
    setSelectedServiceForBooking(service);
    setActiveTab('booking');
  };

  return (
    <div className="space-y-6 pb-24 px-4 pt-4">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-white">Nuestros Servicios</h2>
        <p className="text-xs text-slate-400">Elige el servicio ideal para tu estilo y agenda tu cita.</p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-none">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="grid gap-4 w-full min-w-0">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No hay servicios en esta categoría.
          </div>
        ) : (
          filteredServices.map(service => (
            <div 
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg transition hover:border-amber-500/40 w-full min-w-0"
            >
              <div className="relative h-40 w-full">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-amber-400 border border-slate-800 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 font-extrabold text-sm px-3 py-1 rounded-xl shadow">
                  ${service.price}
                </span>
              </div>

              <div className="p-4 space-y-3 min-w-0">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-bold text-white truncate">{service.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{service.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{service.durationMinutes} minutos</span>
                  </div>

                  <button
                    onClick={() => handleBook(service)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow transition active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservar Turno</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
