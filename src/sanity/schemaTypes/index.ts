import { type SchemaTypeDefinition } from "sanity";
import { categorySchema } from "@/src/sanity/schemaTypes/categorySchema";
import { addressSchema } from "@/src/sanity/schemaTypes/addressSchema";
import { authorSchema } from "@/src/sanity/schemaTypes/authorSchema";
import { blockContentSchema } from "@/src/sanity/schemaTypes/blockContentSchema";
import { blogCategorySchema } from "@/src/sanity/schemaTypes/blogCategorySchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categorySchema,
    addressSchema,
    authorSchema,
    blockContentSchema,
    blogCategorySchema,
  ],
};
