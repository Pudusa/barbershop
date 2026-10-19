import React, { useState, useEffect } from 'react';
import { Calendar, User, Scissors, CheckCircle, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';
import { availableTimeSlots } from '../data/mockData';
import type { Service, Barber } from '../types';

export const BookingWizard: React.FC = () => {
  const { services, barbers, selectedServiceForBooking, createAppointment, setActiveTab } = useBarbershop();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(selectedServiceForBooking || services[0] || null);
  const [selectedBarber, setSelectedBarber] = useState<Barber>(barbers[0]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>(availableTimeSlots[0]);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [successApt, setSuccessApt] = useState<any | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (selectedServiceForBooking) {
      setSelectedService(selectedServiceForBooking);
    }
  }, [selectedServiceForBooking]);

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !clientName.trim() || !clientPhone.trim()) return;

    setBookingError(null);
    setIsSubmitting(true);

    const aptData = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      barberId: selectedBarber.id,
      barberName: selectedBarber.name,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      date: selectedDate,
      time: selectedTime,
      price: selectedService.price
    };

    try {
      await createAppointment(aptData);
      setSuccessApt(aptData);
      setStep(5); // Success step
    } catch (err: any) {
      setBookingError(err.message || 'Error al procesar la reserva. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    if (!successApt) return;
    const msg = `¡Hola! He reservado una cita en la Barbería:\n\n*Servicio:* ${successApt.serviceName}\n*Barbero:* ${successApt.barberName}\n*Fecha:* ${successApt.date} a las ${successApt.time}\n*Cliente:* ${successApt.clientName} (${successApt.clientPhone})\n*Precio:* $${successApt.price}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-lg mx-auto">
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-extrabold text-white">Reserva tu Turno</h2>
        <p className="text-xs text-slate-400">Paso {step} de 4 - Rápido y sin esperas.</p>
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Scissors className="w-4 h-4 text-amber-400" />
            <span>1. Selecciona el Servicio</span>
          </h3>

          <div className="grid gap-3">
            {services.map(service => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <img src={service.image} alt={service.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{service.name}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{service.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-amber-400">${service.price}</span>
                      <span className="text-[10px] text-slate-400">{service.durationMinutes} min</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!selectedService}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition mt-4"
          >
            <span>Siguiente: Elegir Barbero</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Select Barber */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-amber-400" />
            <span>2. Selecciona tu Barbero</span>
          </h3>

          <div className="grid gap-3">
            {barbers.map(barber => {
              const isSelected = selectedBarber?.id === barber.id;
              return (
                <div
                  key={barber.id}
                  onClick={() => setSelectedBarber(barber)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center space-x-4 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <img src={barber.avatar} alt={barber.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-500" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{barber.name}</h4>
                    <p className="text-xs text-amber-400">{barber.specialty}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Siguiente: Fecha y Hora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Date & Time */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>3. Fecha y Hora del Turno</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Fecha de la cita:</label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-2">Horarios Disponibles:</label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map(time => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="w-2/3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Siguiente: Tus Datos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Client Info */}
      {step === 4 && (
        <form onSubmit={handleCompleteBooking} className="space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-amber-400" />
            <span>4. Tus Datos de Contacto</span>
          </h3>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Servicio:</span> <span className="font-bold text-white">{selectedService?.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Barbero:</span> <span className="font-bold text-white">{selectedBarber?.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Fecha y Hora:</span> <span className="font-bold text-amber-400">{selectedDate} a las {selectedTime}</span></div>
            <div className="flex justify-between border-t border-slate-800 pt-2"><span className="text-slate-500">Total:</span> <span className="font-bold text-amber-400">${selectedService?.price}</span></div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                placeholder="Ej. Juan Pérez"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Teléfono / WhatsApp *</label>
              <input
                type="tel"
                required
                placeholder="Ej. +34 600 000 000"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              type="submit"
              className="w-2/3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirmar Turno</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Success Confirmation */}
      {step === 5 && successApt && (
        <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-xl">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">¡Turno Agendado con Éxito!</h3>
            <p className="text-xs text-slate-400">Te esperamos en la barbería. Puedes notificar tu cita por WhatsApp directamente al barbero.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Servicio:</span> <span className="font-bold text-white">{successApt.serviceName}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Barbero:</span> <span className="font-bold text-white">{successApt.barberName}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Fecha y Hora:</span> <span className="font-bold text-amber-400">{successApt.date} - {successApt.time}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Cliente:</span> <span className="font-bold text-white">{successApt.clientName}</span></div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleWhatsAppSend}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Confirmación por WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('home')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-3 rounded-xl transition"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
