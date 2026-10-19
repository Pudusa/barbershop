import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Scissors, ShoppingBag, Calendar } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';
import type { Service, Product } from '../types';

export const AdminView: React.FC = () => {
  const { 
    services, addService, deleteService, 
    products, addProduct, deleteProduct, 
    appointments, updateAppointmentStatus
  } = useBarbershop();

  const [activeSubTab, setActiveSubTab] = useState<'services' | 'products' | 'appointments'>('services');

  // Service Modal / Form State
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('30');
  const [newServiceCategory, setNewServiceCategory] = useState<Service['category']>('Cortes');
  const [newServiceImage] = useState('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=600');

  // Product Modal / Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Cera & Pomada');
  const [newProdStock, setNewProdStock] = useState('10');
  const [newProdImage] = useState('https://images.unsplash.com/photo-1583209814637-b6f12c293774?auto=format&fit=crop&q=80&w=500');

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice) return;
    addService({
      name: newServiceName,
      description: newServiceDesc || 'Servicio profesional de barbería.',
      price: parseFloat(newServicePrice),
      durationMinutes: parseInt(newServiceDuration) || 30,
      category: newServiceCategory,
      image: newServiceImage
    });
    setNewServiceName('');
    setNewServiceDesc('');
    setNewServicePrice('');
    setShowServiceForm(false);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    addProduct({
      name: newProdName,
      description: newProdDesc || 'Producto de alta calidad para cuidado personal.',
      price: parseFloat(newProdPrice),
      category: newProdCategory,
      stock: parseInt(newProdStock) || 10,
      image: newProdImage,
      rating: 5.0
    });
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice('');
    setShowProductForm(false);
  };

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-amber-500 p-2 rounded-xl text-slate-950">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Panel de Administración</h2>
            <p className="text-xs text-slate-400">Control total de servicios, productos y turnos.</p>
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="grid grid-cols-3 bg-slate-900 p-1 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('services')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'services' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Servicios ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('products')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'products' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Productos ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('appointments')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'appointments' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Turnos ({appointments.length})</span>
        </button>
      </div>

      {/* SERVICES TAB */}
      {activeSubTab === 'services' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Gestión de Servicios</h3>
            <button
              onClick={() => setShowServiceForm(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Servicio</span>
            </button>
          </div>

          {showServiceForm && (
            <form onSubmit={handleCreateService} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">Crear Nuevo Servicio</h4>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" placeholder="Nombre del servicio" required
                  value={newServiceName} onChange={e => setNewServiceName(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                />
                <input 
                  type="number" placeholder="Precio ($)" required
                  value={newServicePrice} onChange={e => setNewServicePrice(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" placeholder="Duración (min)" 
                  value={newServiceDuration} onChange={e => setNewServiceDuration(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                />
                <select
                  value={newServiceCategory} onChange={e => setNewServiceCategory(e.target.value as any)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Cortes">Cortes</option>
                  <option value="Barba">Barba</option>
                  <option value="Combos">Combos</option>
                  <option value="Tratamientos">Tratamientos</option>
                </select>
              </div>
              <textarea 
                placeholder="Descripción breve" 
                value={newServiceDesc} onChange={e => setNewServiceDesc(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
              />
              <div className="flex space-x-2">
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">Guardar</button>
                <button type="button" onClick={() => setShowServiceForm(false)} className="bg-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs">Cancelar</button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {services.map(service => (
              <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{service.name}</h4>
                    <p className="text-[11px] text-amber-400 font-bold">${service.price} • {service.durationMinutes} min</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeSubTab === 'products' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Gestión de Productos (Tienda)</h3>
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Producto</span>
            </button>
          </div>

          {showProductForm && (
            <form onSubmit={handleCreateProduct} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">Publicar Nuevo Producto</h4>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" placeholder="Nombre del producto" required
                  value={newProdName} onChange={e => setNewProdName(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                />
                <input 
                  type="number" placeholder="Precio ($)" required
                  value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" placeholder="Stock disponible" 
                  value={newProdStock} onChange={e => setNewProdStock(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                />
                <select
                  value={newProdCategory} onChange={e => setNewProdCategory(e.target.value as any)}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Cera & Pomada">Cera & Pomada</option>
                  <option value="Cuidado de Barba">Cuidado de Barba</option>
                  <option value="Shampoos">Shampoos</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>
              <textarea 
                placeholder="Descripción del producto" 
                value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
              />
              <div className="flex space-x-2">
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">Publicar</button>
                <button type="button" onClick={() => setShowProductForm(false)} className="bg-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs">Cancelar</button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {products.map(product => (
              <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{product.name}</h4>
                    <p className="text-[11px] text-amber-400 font-bold">${product.price} • Stock: {product.stock}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPOINTMENTS TAB */}
      {activeSubTab === 'appointments' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-white">Control Global de Turnos</h3>

          <div className="grid gap-3">
            {appointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">No hay turnos registrados.</div>
            ) : (
              appointments.map(apt => (
                <div key={apt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{apt.serviceName}</span>
                      <h4 className="text-sm font-bold text-white">{apt.clientName} ({apt.clientPhone})</h4>
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

                  <div className="text-xs text-slate-400 flex justify-between pt-1 border-t border-slate-800">
                    <span>Barbero: <strong className="text-slate-200">{apt.barberName}</strong></span>
                    <span className="text-amber-400 font-bold">{apt.date} - {apt.time}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                      className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-blue-500/30"
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                      className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-rose-500/30"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
