export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean; // Coincide con el esquema de Sanity
}