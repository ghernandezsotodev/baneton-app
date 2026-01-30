export interface Product {
  id: string;
  name: string;
  slug: string; // El enlace generado (vital para el futuro)
  description: string;
  price: number;
  image: string;
  // Definimos exactamente los 3 estados posibles
  status: 'available' | 'sold_out' | 'coming_soon'; 
  
  // Agregamos el nombre de la categoría (Opcional con ?)
  categoryName?: string;
}