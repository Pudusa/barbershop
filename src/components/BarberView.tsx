import React, { useState } from 'react';
import { UserCheck, Calendar, Clock } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';

export const BarberView: React.FC = () => {
  const { barbers, appointments, updateAppointmentStatus } = useBarbershop();
  const [selectedBarberId, setSelectedBarberId] = useState<string>(barbers[0]?.id || 'barber-1');

  const selectedBarber = barbers.find(b => b.id === selectedBarberId) || barbers[0];
  const barberAppointments = appointments.filter(apt => apt.barberId === selectedBarberId);

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-lg mx-auto">
      <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-3xl p-4">
        <img 
          src={selectedBarber.avatar} 
          alt={selectedBarber.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold uppercase">
            <UserCheck className="w-4 h-4" />
            <span>Portal de Barbero</span>
          </div>
          <h2 className="text-base font-bold text-white truncate">{selectedBarber.name}</h2>
          <p className="text-xs text-slate-400">{barberAppointments.length} turnos asignados</p>
        </div>
      </div>

      {/* Barber Selector */}
      <div className="space-y-2">
        <label className="text-xs text-slate-400 block font-semibold">Seleccionar Barbero:</label>
        <div className="grid grid-cols-2 gap-2">
          {barbers.map(barber => (
            <button
              key={barber.id}
              onClick={() => setSelectedBarberId(barber.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border text-left flex items-center space-x-2 ${
                selectedBarberId === barber.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <img src={barber.avatar} alt={barber.name} className="w-7 h-7 rounded-full object-cover" />
              <span className="truncate">{barber.nickname}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Tus Turnos Asignados</h3>

        {barberAppointments.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-3xl text-slate-500 text-xs">
            No tienes turnos agendados actualmente.
          </div>
        ) : (
          barberAppointments.map(apt => (
            <div key={apt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{apt.serviceName}</span>
                  <h4 className="text-sm font-bold text-white">{apt.clientName}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{apt.clientPhone}</p>
                </div>
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                  apt.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  apt.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  apt.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {apt.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-400">{apt.time}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-1">
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                  className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold py-2 rounded-xl border border-emerald-500/30 transition text-center"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                  className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-bold py-2 rounded-xl border border-blue-500/30 transition text-center"
                >
                  Completar
                </button>
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                  className="flex-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-bold py-2 rounded-xl border border-rose-500/30 transition text-center"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
