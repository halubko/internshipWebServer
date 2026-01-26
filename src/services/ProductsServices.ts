import { prisma } from "@/lib/prisma";
import type { Product } from "@/prismaGenerated/client";
import { formatArrayResponse } from "@/utils/formatters";

class ProductsServices {
   static async getAllProducts(skip: number, limit: number) {
      const products: Product[] = await prisma.product.findMany({
         skip: skip || undefined,
         take: limit || undefined,
      });
      return formatArrayResponse<Product>("products", products, Number(skip), Number(limit));
   }

   static async getProductById(id: number) {
      const product: Product | null = await prisma.product.findUnique({
         where: { id },
      });
      return product;
   }

   static async searchProductsByTitle(skip: number, limit: number, title: string) {
      const products: Product[] = await prisma.product.findMany({
         skip: skip || undefined,
         take: limit || undefined,
         where: {
            title: {
               contains: title,
               mode: "insensitive",
            },
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
