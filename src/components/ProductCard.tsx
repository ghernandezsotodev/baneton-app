"use client";

import { Plus, Minus, ShoppingBag, Ban, Clock, Trash2, Image as ImageIcon } from "lucide-react";
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
  
  // Lógica de Estado
  const status = product.status || 'available'; 
  const isAvailable = status === 'available';
  const isSoldOut = status === 'sold_out';
  const isComingSoon = status === 'coming_soon';
  const canBuy = isAvailable; 

  // Validación de Imagen: Verifica si existe y no es texto vacío
  const hasImage = product.image && product.image !== "";

  const handleRemoveAll = () => {
    for (let i = 0; i < quantity; i++) {
        removeItem(product.id);
    }
  };

  return (
    <article className={`group relative bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-brand-dark/5 transition-all duration-300 hover:border-brand-dark/10 hover:shadow-md flex gap-4 items-stretch h-full
      ${!canBuy ? 'opacity-80 grayscale-[0.5]' : ''}`}>
      
      {/* 1. IMAGEN (Izquierda - Cuadrada y Compacta) */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-brand-cream self-center shadow-inner flex items-center justify-center">
        
        {/* Lógica Fallback: Si hay imagen, usa Next/Image. Si no, usa icono. */}
        {hasImage ? (
           <Image 
             src={product.image} 
             alt={product.name} 
             fill 
             // CAMBIO 1: Calidad al 90% para texturas de comida
             quality={90}
             className={`object-cover transition-transform duration-700 ease-out ${canBuy ? 'group-hover:scale-105' : ''}`}
             // CAMBIO 2: Tamaños más grandes para pantallas Retina (evita pixelado)
             sizes="(max-width: 768px) 300px, 400px"
             priority={priority}
           />
        ) : (
           <div className="flex flex-col items-center justify-center text-brand-dark/20 gap-1">
               <ImageIcon size={24} />
               <span className="text-[9px] font-bold uppercase tracking-wider">Sin Foto</span>
           </div>
        )}
        
        {/* Overlays de Estado (Compactos) */}
        {isComingSoon && (
           <div className="absolute inset-0 bg-brand-cream/60 backdrop-blur-[1px] flex items-center justify-center z-10">
               <span className="bg-brand-dark text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                   Pronto
               </span>
           </div>
        )}

        {isSoldOut && (
           <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
               <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                   Agotado
               </span>
           </div>
        )}
      </div>

      {/* 2. CONTENIDO (Derecha) */}
      <div className="flex flex-col flex-1 justify-between py-0.5">
        
        {/* Cabecera: Nombre y Descripción */}
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-lg md:text-xl font-bold text-brand-dark leading-tight text-balance">
              {product.name}
            </h3>
            {/* Precio destacado */}
            <span className="font-bold text-brand-terracotta text-lg whitespace-nowrap">
               ${product.price.toLocaleString("es-CL")}
            </span>
          </div>
          
          <p className="text-brand-gray text-xs md:text-sm leading-relaxed line-clamp-2 mb-3">
            {product.description || "Delicioso producto artesanal."}
          </p>
        </div>

        {/* Controles de Acción (Más compactos) */}
        <div className="h-10 relative w-full mt-auto"> 
          
          {!canBuy ? (
            /* Botón Deshabilitado */
             <button
             disabled
             className={`w-full h-full rounded-lg font-medium text-xs tracking-wide cursor-not-allowed flex items-center justify-center gap-2 border border-dashed
                 ${isSoldOut 
                     ? 'bg-red-50 text-red-400 border-red-200' 
                     : 'bg-gray-50 text-gray-400 border-gray-200' 
                 }`}
           >
             {isSoldOut ? (
                 <>
                     <Ban size={14} /> <span>Sin Stock</span>
                 </>
             ) : (
                 <>
                     <Clock size={14} /> <span>Pronto</span>
                 </>
             )}
           </button>
          ) : (
             /* Botón Agregar / Contador */
             quantity === 0 ? (
             <button
                 onClick={() => addItem(product)}
                 className="w-full h-full rounded-lg bg-white border border-brand-dark text-brand-dark font-bold text-sm hover:bg-brand-dark hover:text-white transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
             >
                 <ShoppingBag size={16} strokeWidth={2.5} className="mb-0.5" />
                 <span>Agregar</span>
             </button>
             ) : (
             <div className="flex items-center justify-between w-full h-full bg-[#F5F0EB] rounded-lg border border-brand-dark/10 px-1">
                 
                 {/* Botón Menos (o Eliminar si es 1) */}
                 <button
                     onClick={() => quantity === 1 ? removeItem(product.id) : removeItem(product.id)}
                     className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-brand-dark shadow-sm hover:text-red-500 active:scale-90 transition-all"
                 >
                     {quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} strokeWidth={3} />}
                 </button>
                 
                 <span className="font-bold text-brand-dark text-base">
                     {quantity}
                 </span>

                 <button
                     onClick={() => addItem(product)}
                     className="w-8 h-8 bg-brand-dark text-white rounded-md flex items-center justify-center shadow-sm active:scale-90 transition-all hover:bg-brand-brown"
                 >
                     <Plus size={14} strokeWidth={3} />
                 </button>
             </div>
             )
          )}
        </div>
      </div>
    </article>
  );
}