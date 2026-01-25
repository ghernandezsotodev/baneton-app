export interface Product {
  id: string;
  name: string;
  slug: string; // Nuevo: El enlace generado (vital para el futuro)
  description: string;
  price: number;
  image: string;
  // Nuevo: Definimos exactamente los 3 estados posibles
  status: 'available' | 'sold_out' | 'coming_soon'; 
}