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
    // Slug para enlaces
    defineField({
      name: 'slug',
      title: 'Slug (Enlace único)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    // Referencia a la Categoría
    defineField({
      name: 'category',
      title: 'Categoría',
      description: 'Selecciona a qué grupo pertenece este producto (Ej: Panadería)',
      type: 'reference',
      to: [{type: 'category'}],
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
    // Selector de Estado
    defineField({
      name: 'status',
      title: 'Estado del Producto',
      type: 'string',
      initialValue: 'available',
      options: {
        list: [
          { title: '🟢 Disponible', value: 'available' },
          { title: '🔴 Agotado (Sin Stock)', value: 'sold_out' },
          { title: '🔜 Próximamente', value: 'coming_soon' },
        ],
        layout: 'radio', 
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      const statusMap: Record<string, string> = {
        available: '🟢 Disponible',
        sold_out: '🔴 Agotado',
        coming_soon: '🔜 Próximamente'
      }
      return {
        title: title,
        subtitle: statusMap[subtitle] || subtitle,
        media: media,
      }
    },
  },
})