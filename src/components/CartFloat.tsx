"use client";

import { useCartStore } from "@/store/cart-store";
import { ArrowRight, X, MapPin, Store, User } from "lucide-react"; 
import { useEffect, useState } from "react";

export default function CartFloat() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Estado para controlar el Modal y los Datos
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = getTotal();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (!mounted || itemCount === 0) return null;

  // Función final que abre WhatsApp
  const handleFinalize = () => {
    const phoneNumber = "56967673863";
    
    let message = `Hola Nicole! 👋 Soy *${customerName}* y quiero pedir:\n\n`;

    items.forEach((item) => {
      const subtotal = item.price * item.quantity;
      message += `▪️ *${item.quantity} un.* ${item.name} — $${subtotal.toLocaleString("es-CL")}\n`;
    });

    message += `\n💰 *TOTAL: $${total.toLocaleString("es-CL")}*`;
    message += `\n-----------------------------`;
    message += `\n📝 *Datos del Pedido:*`;
    message += `\nModo: ${deliveryType === "pickup" ? "Retiro en Local 🏪" : "Despacho a Domicilio 🛵"}`;
    
    if (deliveryType === "delivery") {
        message += `\nDirección: ${address}`;
    }
    message += `\n-----------------------------`;
    message += `\n\nQuedo atento para transferir. ¡Gracias!`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    setIsOpen(false); // Cerramos el modal
  };

  return (
    <>
      {/* 1. LA ISLA FLOTANTE (Botón Principal) */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 z-40 pointer-events-none flex justify-center transition-all duration-500 ${isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="w-full max-w-sm pointer-events-auto animate-enter">
          <div className="group relative bg-brand-dark/95 backdrop-blur-xl text-brand-cream rounded-full p-2 pl-6 shadow-float border border-white/10 flex items-center justify-between transition-all duration-300 hover:scale-[1.02]">
            
            <div className="flex flex-col justify-center">
              <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest mb-0.5">
                Total Estimado
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-xl tracking-tight text-white">
                  ${total.toLocaleString("es-CL")}
                </span>
                <span className="text-sm text-brand-gray font-medium">
                  ({itemCount} u.)
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-brand-cream text-brand-dark px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors duration-300 shadow-lg shadow-black/20"
            >
              <span>Continuar</span>
              <ArrowRight size={16} strokeWidth={3} className="-mr-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. EL MODAL DE CHECKOUT (Glassmorphism) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          
          {/* Backdrop oscuro */}
          <div 
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Contenido del Modal */}
          <div className="relative w-full max-w-md bg-brand-cream rounded-t-[2rem] sm:rounded-[2.5rem] p-8 shadow-2xl animate-enter border border-white/50">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                    Finalizar Pedido
                </h2>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-white rounded-full text-brand-dark hover:bg-brand-terracotta/20 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Formulario */}
            <div className="space-y-6">
                
                {/* Selector Retiro vs Despacho */}
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-white rounded-2xl border border-brand-dark/5">
                    <button
                        onClick={() => setDeliveryType("delivery")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${deliveryType === "delivery" ? 'bg-brand-dark text-white shadow-md' : 'text-brand-gray hover:bg-brand-cream'}`}
                    >
                        <MapPin size={16} />
                        Despacho
                    </button>
                    <button
                        onClick={() => setDeliveryType("pickup")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${deliveryType === "pickup" ? 'bg-brand-dark text-white shadow-md' : 'text-brand-gray hover:bg-brand-cream'}`}
                    >
                        <Store size={16} />
                        Retiro
                    </button>
                </div>

                {/* Input Nombre */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-gray ml-2">Tu Nombre</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" size={18} />
                        <input 
                            type="text" 
                            placeholder="Ej: Nicole Tapia"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-white border border-brand-dark/5 rounded-2xl py-4 pl-12 pr-4 text-brand-dark placeholder:text-brand-gray/50 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 transition-all"
                        />
                    </div>
                </div>

                {/* Input Dirección (Solo si es despacho) */}
                {deliveryType === "delivery" && (
                    <div className="space-y-2 animate-enter">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gray ml-2">Dirección de envío</label>
                        <textarea 
                            placeholder="Calle, número y comuna..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={2}
                            className="w-full bg-white border border-brand-dark/5 rounded-2xl py-3 px-4 text-brand-dark placeholder:text-brand-gray/50 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 transition-all resize-none"
                        />
                    </div>
                )}

                {/* Resumen Total */}
                <div className="flex justify-between items-center py-4 border-t border-brand-dark/5 mt-4">
                    <span className="text-brand-gray font-medium">Total a pagar</span>
                    <span className="text-2xl font-bold text-brand-dark">${total.toLocaleString("es-CL")}</span>
                </div>

                {/* Botón Final WhatsApp */}
                <button
                    onClick={handleFinalize}
                    disabled={!customerName || (deliveryType === "delivery" && !address)}
                    className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#20bd5a] transition-all duration-300 active:scale-[0.98] shadow-xl shadow-green-900/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>Enviar Pedido a WhatsApp</span>
                    <ArrowRight size={20} />
                </button>
                
                <p className="text-center text-[10px] text-brand-gray/60 max-w-xs mx-auto">
                    Al enviar, se abrirá tu chat de WhatsApp con el detalle listo para transferir.
                </p>

            </div>
          </div>
        </div>
      )}
    </>
  );
}