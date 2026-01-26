import { prisma } from "@/lib/prisma";
import type { Product } from "@/prismaGenerated/client";

class ProductsServices {
   static async getAllProducts() {
      const products: Product[] = await prisma.product.findMany();
      return products;
   }

   static async getProductById(id: number) {
      const product: Product | null = await prisma.product.findUnique({
         where: { id },
      });
      return product;
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
