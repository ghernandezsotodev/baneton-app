"use client";

import { Plus, Minus, ShoppingBag, Clock, Trash2 } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, removeItem, items } = useCartStore();
  
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  
  // CORRECCIÓN: Usamos 'isAvailable' que viene de Sanity
  const isAvailable = product.isAvailable; 

  const handleRemoveAll = () => {
    for (let i = 0; i < quantity; i++) {
        removeItem(product.id);
    }
  };

  return (
    <article className={`group relative bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 w-full mx-auto max-w-sm border border-white/60 
      ${isAvailable ? 'hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1' : 'opacity-90 grayscale-[0.2]'}`}>
      
      {/* 1. Imagen */}
      <div className="relative aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden mb-6 bg-[#F5F0EB] shadow-inner">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className={`object-cover transition-transform duration-700 ease-out ${isAvailable ? 'group-hover:scale-105' : ''}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
        
        {/* Precio (Badge flotante) */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/40 z-10">
          <span className="font-bold text-brand-dark text-sm tracking-tight">
            ${product.price.toLocaleString("es-CL")}
          </span>
        </div>

        {/* Overlay "Próximamente" */}
        {!isAvailable && (
            <div className="absolute inset-0 bg-brand-cream/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                <span className="bg-brand-dark text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transform -rotate-3 border border-white/20">
                    Próximamente
                </span>
            </div>
        )}
      </div>

      {/* 2. Información (CENTRADA) */}
      <div className="px-1 mb-6 text-center flex flex-col items-center">
        <h3 className="text-2xl font-bold text-brand-dark tracking-tight mb-2 leading-none">
          {product.name}
        </h3>
        
        <p className="text-brand-gray text-[15px] leading-relaxed line-clamp-2 font-medium max-w-[90%]">
          {product.description}
        </p>
      </div>

      {/* 3. Controles de Acción */}
      <div className="h-14 relative w-full"> 
        {/* CASO A: NO DISPONIBLE */}
        {!isAvailable ? (
           <button
            disabled
            className="w-full h-full rounded-full bg-gray-100 text-gray-400 font-semibold text-[15px] tracking-wide cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200"
          >
            <Clock size={18} strokeWidth={2.5} className="mb-0.5" />
            <span>Muy pronto</span>
          </button>
        ) : (
            /* CASO B: DISPONIBLE */
            quantity === 0 ? (
            <button
                onClick={() => addItem(product)}
                className="w-full h-full rounded-full bg-brand-dark text-white font-semibold text-[15px] tracking-wide hover:bg-brand-brown transition-colors duration-300 active:scale-[0.98] shadow-lg shadow-brand-dark/10 flex items-center justify-center gap-2 group-active:shadow-none"
            >
                <ShoppingBag size={18} strokeWidth={2.5} className="mb-0.5" />
                <span>Agregar</span>
            </button>
            ) : (
            /* CASO C: EN EL CARRITO (Papelera + Contador) */
            <div className="flex items-center gap-3 w-full h-full animate-in fade-in zoom-in duration-200">
                
                {/* Botón Eliminar Rápido */}
                <button 
                    onClick={handleRemoveAll}
                    className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-full bg-white border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm active:scale-90"
                    aria-label="Eliminar todo"
                >
                    <Trash2 size={18} strokeWidth={2.5} />
                </button>

                {/* Cápsula de Cantidad */}
                <div className="flex-1 h-full bg-[#F5F0EB] rounded-full p-1.5 flex items-center justify-between border border-brand-terracotta/10">
                    <button
                        onClick={() => removeItem(product.id)}
                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm hover:shadow-md active:scale-90 transition-all duration-200 border border-black/5"
                    >
                        <Minus size={18} strokeWidth={3} />
                    </button>
                    
                    <div className="flex flex-col items-center justify-center min-w-[1.5rem]">
                        <span className="font-bold text-lg text-brand-dark leading-none">
                            {quantity}
                        </span>
                    </div>

                    <button
                        onClick={() => addItem(product)}
                        className="w-11 h-11 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all duration-200 hover:bg-brand-brown"
                    >
                        <Plus size={18} strokeWidth={3} />
                    </button>
                </div>
            </div>
            )
        )}
      </div>
    </article>
  );
}