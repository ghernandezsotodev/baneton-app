import { client } from "@/sanity/lib/client";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CartFloat from "@/components/CartFloat";
import Image from "next/image"; 

// 1. Configuración de Revalidación (ISR)
// Esto hace que la página se actualice sola cada 60 segundos si hay cambios en Sanity
export const revalidate = 60;

// 2. Función para traer datos REALES de Sanity
async function getProducts(): Promise<Product[]> {
  return await client.fetch(`
    *[_type == "product"] | order(isAvailable desc, name asc) {
      "id": _id,
      name,
      description,
      price,
      "image": image.asset->url,
      isAvailable
    }
  `);
}

// 3. Componente Async (Server Component)
export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen pb-40 overflow-x-hidden bg-brand-cream selection:bg-brand-terracotta/30">
      
      {/* 1. Hero Section (TU DISEÑO EXACTO) */}
      <header className="relative pt-20 pb-20 px-6 text-center overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-terracotta/20 rounded-full blur-[100px] -z-10 opacity-50 pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center animate-enter">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-sm border border-brand-green/20 shadow-sm mb-12 transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span className="text-brand-dark/80 text-[10px] font-bold tracking-widest uppercase">
              Pedidos Abiertos
            </span>
          </div>
          
          {/* LOGO REAL */}
          <div className="relative w-64 h-64 mb-8 transition-transform duration-700 hover:scale-105">
             <Image 
               src="/images/logo.png" 
               alt="Banetón Panadería" 
               fill 
               className="object-contain drop-shadow-xl"
               priority 
               sizes="(max-width: 768px) 250px, 400px"
             />
          </div>
          
          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-black text-brand-dark mb-4 tracking-tight leading-tight text-balance">
            Banetón
          </h1>
          <p className="text-brand-gray text-lg md:text-xl font-medium leading-relaxed max-w-sm mx-auto text-balance tracking-tight">
            Panadería artesanal consciente. <br/>
            Especialistas en <span className="text-brand-dark underline decoration-brand-terracotta/50 underline-offset-4 decoration-2">Pan Pita</span> y Masa Madre.
          </p>
        </div>
      </header>

      {/* 2. Grilla de Productos (DATA REAL) */}
      <main className="px-6 max-w-md md:max-w-2xl lg:max-w-5xl mx-auto">
        
        {/* Separador Visual */}
        <div className="flex items-center gap-4 mb-10 opacity-80">
            <div className="h-px bg-brand-dark/10 flex-1"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gray">Menú Fresco</span>
            <div className="h-px bg-brand-dark/10 flex-1"></div>
        </div>

        {/* Flexbox centrado */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                priority={index === 0} 
              />
            ))
          ) : (
            <div className="py-20 text-center opacity-50">
                <p>Cargando productos...</p>
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="mt-32 text-center pb-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
        <div className="flex justify-center items-center gap-2 mb-4">
           <div className="h-1 w-1 rounded-full bg-brand-dark"></div>
           <div className="h-1 w-1 rounded-full bg-brand-dark"></div>
           <div className="h-1 w-1 rounded-full bg-brand-dark"></div>
        </div>
        <p className="text-[10px] font-bold text-brand-dark/60 tracking-[0.2em] uppercase mb-2">
          Hecho a mano en Talca
        </p>
        <div className="text-[10px] text-brand-gray">
          &copy; 2025 Banetón
        </div>
      </footer>

      <CartFloat />
    </div>
  );
}