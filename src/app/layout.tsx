import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// 1. Configuración de Fuente: Optimizada para legibilidad y carga
const fontBody = Outfit({
  subsets: ["latin"],
  display: "swap", // Importante para que el texto se vea inmediato aunque cargue la fuente
  variable: "--font-outfit",
});

// 2. Viewport: Esto controla cómo se comporta la interfaz en móviles (Barra de color)
export const viewport: Viewport = {
  themeColor: "#F9F5F1", // El color 'Cream' de tu marca. La barra del navegador se fusionará con tu web.
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Evita que haga zoom automático al tocar inputs en iPhone
};

// 3. Metadatos "Premium": Lo que ven Google y WhatsApp
export const metadata: Metadata = {
  metadataBase: new URL("https://baneton.vercel.app/"), 
  
  title: {
    default: "Banetón | Panadería Artesanal",
    template: "%s | Banetón",
  },
  description: "Pan pita integral, hogazas de masa madre y recetas artesanales en Talca. Ingredientes 100% naturales, sin materia grasa. Pide online.",
  
  keywords: ["Panadería Talca", "Pan Pita", "Masa Madre", "Pan Artesanal", "Integral", "Saludable"],
  
  authors: [{ name: "Banetón" }],
  creator: "Banetón",

  // Configuración para WhatsApp, Facebook, LinkedIn (Open Graph)
  openGraph: {
    title: "Banetón | Panadería Artesanal",
    description: "Pan pita fresco y masa madre en Talca. Haz tu pedido online hoy.",
    url: "/",
    siteName: "Banetón",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // Next.js buscará esto en la carpeta public
        width: 1200,
        height: 630,
        alt: "Banetón Panadería Artesanal",
      },
    ],
  },

  // Configuración para iPhone (Webclip / Add to Home Screen)
  appleWebApp: {
    title: "Banetón",
    statusBarStyle: "black-translucent",
    startupImage: ["/apple-icon.png"],
  },

  // Iconos del navegador
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png", // Icono para iPhone
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className="scroll-smooth">
      {/* scroll-smooth: para que al navegar sea suave */}
      <body
        className={`${fontBody.variable} antialiased font-sans bg-brand-cream text-brand-dark min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}