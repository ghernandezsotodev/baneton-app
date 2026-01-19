export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean; // Nuevo campo para controlar disponibilidad
}

export const products: Product[] = [
  {
    id: 'pan-pita-integral',
    name: 'Pan de Pita Integral',
    description: 'Receta artesanal con semillas de linaza y maravilla. Sin materia grasa.',
    price: 3500,
    // CORREGIDO: Apunta a .webp y sin tilde
    image: '/images/pan-pita.webp',
    available: true,
  },
  {
    id: 'pan-masa-madre',
    name: 'Pan de Masa Madre',
    description: 'Receta artesanal con semillas de linaza y maravilla. Sin materia grasa.',
    price: 3500,
    // CORREGIDO: Apunta a .webp y sin tilde
    image: '/images/pan-masa-madre.webp',
    available: false, // Esto activará el modo "Próximamente"
  },
];