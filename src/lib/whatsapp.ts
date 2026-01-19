import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

export const generateWhatsAppLink = (items: CartItem[]) => {
  const phoneNumber = "56967673863"; // Número de Nicole
  
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // 1. Encabezado más marca
  let message = "Hola Nicole! 👋 Vengo de la web y quiero pedir lo siguiente:\n\n";

  // 2. Detalle del pedido
  items.forEach((item) => {
    const subtotal = item.price * item.quantity;
    // Usamos un guion largo (—) y negritas estratégicas para mejor lectura
    message += `▪️ *${item.quantity} un.* ${item.name} — $${subtotal.toLocaleString("es-CL")}\n`;
  });

  // 3. Total destacado
  message += `\n💰 *TOTAL: $${total.toLocaleString("es-CL")}*`;

  // 4. Sección para completar (MEJORA CLAVE)
  // Esto incita al usuario a poner sus datos de una vez
  message += `\n\n-----------------------------`;
  message += `\n✍️ *Mis Datos:*`;
  message += `\nNombre: `;
  message += `\nDirección o Retiro: `;
  message += `\n-----------------------------`;

  message += `\n\nQuedo atento a los datos para transferir. ¡Gracias!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};