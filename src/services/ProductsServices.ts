import { prisma } from "@/lib/prisma";
import type { Product } from "@/prismaGenerated/client";
import { formatArrayResponse } from "@/utils/formatters";
import { orderByIsValid } from "@/utils/typeGuards";

class ProductsServices {
   static async getAllProducts(skip: number, limit: number, order: string) {
      const products: Product[] = await prisma.product.findMany({
         skip: skip || undefined,
         take: limit || undefined,
         orderBy: {
            price: orderByIsValid(order) ? order : undefined,
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

   static async searchProductsByTitle(skip: number, limit: number, title: string, orderBy: string) {
      const products: Product[] = await prisma.product.findMany({
         skip: skip || undefined,
         take: limit || undefined,
         where: {
            title: {
               contains: title,
               mode: "insensitive",
            },
         },
         orderBy: {
            price: orderByIsValid(orderBy) ? orderBy : undefined,
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
