import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useBarbershop();
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemsText = cart
      .map(item => `• ${item.quantity}x ${item.product.name} ($${item.product.price * item.quantity})`)
      .join('\n');

    const message = `¡Hola! Quiero hacer un pedido en la Barbería:\n\n${itemsText}\n\n*Total a pagar: $${totalAmount}*\n${clientName ? `Nombre: ${clientName}\n` : ''}${clientAddress ? `Dirección/Nota: ${clientAddress}` : ''}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="bg-slate-900 w-full max-w-md h-full flex flex-col border-l border-slate-800 shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Tu Carrito de Compras</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">Tu carrito está vacío.</p>
              <p className="text-xs text-slate-500">Agrega productos desde nuestra tienda.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="bg-slate-800/60 rounded-2xl p-3 flex items-center space-x-3 border border-slate-700/50">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-16 h-16 object-cover rounded-xl border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{item.product.name}</h4>
                  <p className="text-xs text-amber-400 font-bold mt-0.5">${item.product.price}</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-slate-200 hover:bg-slate-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-slate-200 hover:bg-slate-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Tu nombre (opcional)" 
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <input 
                type="text" 
                placeholder="Dirección o nota de entrega" 
                value={clientAddress}
                onChange={e => setClientAddress(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-400">Total a Pagar:</span>
              <span className="text-lg font-bold text-amber-400">${totalAmount}</span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pedir por WhatsApp</span>
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-medium py-2 rounded-xl transition"
            >
              Vaciar Carrito
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
