import React, { useState } from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { useBarbershop } from '../context/BarbershopContext';
import type { Product } from '../types';

export const StoreView: React.FC = () => {
  const { products, addToCart } = useBarbershop();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['Todos', 'Cera & Pomada', 'Cuidado de Barba', 'Shampoos', 'Accesorios'];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="space-y-6 pb-24 px-4 pt-4">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-white">Tienda de Productos</h2>
        <p className="text-xs text-slate-400">Lleva el cuidado profesional de la barbería a tu casa.</p>
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 w-full min-w-0">
        {filteredProducts.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
            No hay productos disponibles en esta categoría.
          </div>
        ) : (
          filteredProducts.map(product => {
            const isAdded = addedId === product.id;
            return (
              <div 
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md min-w-0 w-full"
              >
                <div className="relative h-36 bg-slate-950 w-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded-full flex items-center space-x-1 border border-slate-800">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold text-white">{product.rating}</span>
                  </div>
                </div>

                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">{product.category}</span>
                    <h3 className="text-xs font-bold text-white line-clamp-1 mt-0.5">{product.name}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{product.description}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <span className="text-sm font-extrabold text-amber-400">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`p-2 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="text-[10px]">¡Añadido!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Añadir</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
