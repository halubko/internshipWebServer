import { categories, categoryList } from "@/constants/constants";
import ProductsServices from "@/services/ProductsServices";
import type { Request, Response } from "express";

class ProductsControllers {
   static async getAllProducts(req: Request, res: Response) {
      const { skip, limit } = req.query;
      const products = await ProductsServices.getAllProducts(Number(skip), Number(limit));
      return res.status(200).json(products);
   }

   static async getProductById(req: Request, res: Response) {
      const { id } = req.params;
      const numberId = Number(id);

      if (!id || isNaN(numberId)) {
         return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await ProductsServices.getProductById(numberId);
      return res.status(200).json(product);
   }

   static async searchProductsByTitle(req: Request, res: Response) {
      const { skip, limit, q } = req.query;

      if (!q) {
         return res.status(400).json({ message: "Title query parameter is required" });
      }

      const products = await ProductsServices.searchProductsByTitle(
         Number(skip),
         Number(limit),
         String(q)
      );
      return res.status(200).json(products);
   }

   static async getProductsCategories(_req: Request, res: Response) {
      return res.status(200).json(categories);
   }

   static async getProductsCategoryList(_req: Request, res: Response) {
      return res.status(200).json(categoryList);
   }

   static async createProduct(req: Request, res: Response) {
      const { title, price } = req.body;
      //TODO update 400 error handling
      if (!title || !price) {
         return res.status(400).json({ message: "Title and price are required" });
      }

      const newProduct = await ProductsServices.createProduct(req.body);

      return res.status(201).json(newProduct);
   }

   static async deleteProduct(req: Request, res: Response) {
      const { id } = req.params;
      const numberId = Number(id);

      if (!id || isNaN(numberId)) {
         return res.status(400).json({ message: "Product ID is required" });
      }

      const deletedProduct = await ProductsServices.deleteProduct(numberId);
      return res.status(200).json(deletedProduct);
   }
}

export default ProductsControllers;
