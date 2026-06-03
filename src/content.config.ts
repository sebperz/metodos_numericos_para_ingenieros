import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const metodos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/metodos" }),
  schema: z.object({
    titulo: z.string(),
    area: z.string(),
    descripcion_breve: z.string(),
    tipo_grafico: z.enum(["convergencia", "area"]).nullable(),
    parametros: z.array(
      z.object({
        nombre: z.string(),
        tipo: z.enum(["string", "float", "int"]),
        default: z.union([z.string(), z.number()]),
      }),
    ),
  }),
});

export const collections = { metodos };
