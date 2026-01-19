import {defineField, defineType} from 'sanity'
import {Tag} from 'lucide-react'

export const productType = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text', 
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Precio (CLP)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true, // Esto permite recortar la foto si sale mal centrada
      },
    }),
    defineField({
      name: 'isAvailable',
      title: '¿Está disponible?',
      type: 'boolean',
      initialValue: true,
      description: 'Desactívalo para mostrar "Próximamente" (Ideal para el Pan de Masa Madre).',
    }),
  ],
})