import { prisma } from "@/lib/prisma";
import type { Product } from "@/prismaGenerated/client";
import { formatArrayResponse } from "@/utils/formatters";
import { orderByIsValid, sortByIsValid } from "@/utils/typeGuards";

class ProductsServices {
   static async getAllProducts(
      skip: number | undefined,
      limit: number | undefined,
      order: string,
      sortBy: string
   ) {
      console.log(order, sortBy);
      const products: Product[] = await prisma.product.findMany({
         skip: skip || undefined,
         take: limit || undefined,
         orderBy: {
            [sortByIsValid(sortBy) ? sortBy : "price"]: orderByIsValid(order) ? order : undefined,
         },
      });
      return formatArrayResponse<Product>("products", products, Number(skip), Number(limit));
   }

   static async getProductById(id: number) {
      const product: Product | null = await prisma.product.findUnique({
         where: { id },
      });
      return product;
   }

   static async searchProductsByTitle(
      skip: number | undefined,
      limit: number | undefined,
      title: string,
      order: string,
      sortBy: string
   ) {
      const products: Product[] = await prisma.product.findMany({
         skip,
         take: limit,
         where: {
            title: {
               contains: title,
               mode: "insensitive",
            },
         },
         orderBy: {
            [sortByIsValid(sortBy) ? sortBy : "price"]: orderByIsValid(order) ? order : undefined,
         },
      });
      return formatArrayResponse<Product>("products", products, Number(skip), Number(limit));
   }

   static async createProduct(data: Product) {
      const newProduct = await prisma.product.create({ data });
      return newProduct;
   }

   static async deleteProduct(id: number) {
      const deletedProduct = await prisma.product.delete({
         where: { id },
      });
      return deletedProduct;
   }
}

export default ProductsServices;
