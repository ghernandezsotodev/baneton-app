import {defineField, defineType} from 'sanity'
import {LayoutList} from 'lucide-react'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  icon: LayoutList,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Categoría',
      description: 'Ej: Panadería, Pastelería, Bollería',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
})