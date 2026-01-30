import { client } from "@/sanity/lib/client";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CartFloat from "@/components/CartFloat";
import Image from "next/image";
import Link from "next/link"; // Importante para la navegación interna

// 1. Configuración de Revalidación (ISR)
export const revalidate = 60;

// 2. Función para traer datos REALES de Sanity (Con Categorías)
async function getProducts(): Promise<Product[]> {
  return await client.fetch(`
    *[_type == "product"] | order(category->name asc, name asc) {
      "id": _id,
      name,
      "slug": slug.current,
      description,
      price,
      "image": image.asset->url,
      status,
      "categoryName": category->name
    }
  `);
}

// Helper para agrupar productos por categoría
function groupProductsByCategory(products: Product[]) {
  const groups: Record<string, Product[]> = {};
  
  products.forEach(product => {
    const catName = product.categoryName || "Otros"; // Si no tiene categoría, va a "Otros"
    if (!groups[catName]) {
      groups[catName] = [];
    }
    groups[catName].push(product);
  });

  // Convertimos el objeto a un array ordenado (Ej: Panadería primero, luego Bollería...)
  
  return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
}

// 3. Componente Async (Server Component)
export default async function Home() {
  const products = await getProducts();
  const groupedProducts = groupProductsByCategory(products);
  const categories = groupedProducts.map(([name]) => name);

  return (
    <div className="min-h-screen pb-40 overflow-x-hidden bg-brand-cream selection:bg-brand-terracotta/30 scroll-smooth">
      
      {/* 1. Hero Section  */}
      <header className="relative pt-20 pb-12 px-6 text-center overflow-hidden">
        
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
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 transition-transform duration-700 hover:scale-105">
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
          <h1 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight leading-tight text-balance">
            Banetón
          </h1>
          <p className="text-brand-gray text-base md:text-lg font-medium leading-relaxed max-w-sm mx-auto text-balance tracking-tight">
            Panadería artesanal consciente. <br/>
            Especialistas en <span className="text-brand-dark underline decoration-brand-terracotta/50 underline-offset-4 decoration-2">Pan Pita</span> y Masa Madre.
          </p>

        </div>
      </header>

      {/* Barra de Navegación de Categorías (Sticky) */}
      {categories.length > 0 && (
        <nav className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-dark/5 py-4 px-4 mb-8 shadow-sm">
          <ul className="flex justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar snap-x">
            {categories.map((catName) => (
              <li key={catName} className="snap-start flex-shrink-0">
                <Link 
                  href={`#${catName}`} 
                  className="px-4 py-2 rounded-full text-sm font-bold text-brand-dark/70 hover:text-brand-dark hover:bg-white/50 transition-all uppercase tracking-wide border border-transparent hover:border-brand-dark/10"
                >
                  {catName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 2. Menú por Categorías*/}
      <main className="px-4 md:px-6 max-w-5xl mx-auto">
        
        {groupedProducts.length > 0 ? (
          groupedProducts.map(([categoryName, items]) => (
            <section key={categoryName} id={categoryName} className="mb-16 scroll-mt-24">
              
              {/* Título de Categoría */}
              <div className="flex items-center gap-4 mb-8 opacity-90">
                <h2 className="text-2xl font-bold text-brand-dark capitalize">{categoryName}</h2>
                <div className="h-px bg-brand-dark/10 flex-1"></div>
              </div>

              {/* Grilla de Productos de esa Categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                {items.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    priority={false} 
                  />
                ))}
              </div>

            </section>
          ))
        ) : (
          <div className="py-20 text-center opacity-50 flex flex-col items-center gap-2">
              <p>Cargando productos...</p>
              <p className="text-xs text-brand-gray">(Si no aparecen, asegúrate de haberles asignado una CATEGORÍA en el Panel)</p>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="mt-20 text-center pb-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
        <div className="flex justify-center items-center gap-2 mb-4">
           <div className="h-1 w-1 rounded-full bg-brand-dark"></div>
           <div className="h-1 w-1 rounded-full bg-brand-dark"></div>
           <div className="h-1 w-1 rounded-full bg-brand-dark"></div>
        </div>
        <p className="text-[10px] font-bold text-brand-dark/60 tracking-[0.2em] uppercase mb-2">
          Hecho a mano en Talca
        </p>
        <div className="text-[10px] text-brand-gray">
          &copy; 2026 Banetón
        </div>
      </footer>

      <CartFloat />
    </div>
  );
}