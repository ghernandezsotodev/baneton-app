import { defineQuery } from "next-sanity";

// Esta consulta trae TODOS los productos y "expande" la categoría para saber su nombre
export const PRODUCTS_QUERY = defineQuery(`*[_type == "product"] | order(category->name asc) {
  _id,
  name,
  slug,
  price,
  description,
  image,
  status,
  "categoryName": category->name
}`);

// Esta consulta es opcional, por si alguna vez necesitamos solo las categorías
export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug
}`);