import ProductsServices from "@/services/ProductsServices";
import type { Request, Response } from "express";

class ProductsControllers {
   static async getAllProducts(req: Request, res: Response) {
      const products = await ProductsServices.getAllProducts();
      return res.status(200).json(products);
   }

   static async getProductById(req: Request, res: Response) {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await ProductsServices.getProductById(Number(id));
      return res.status(200).json(product);
   }

   static async createProduct(req: Request, res: Response) {
      const { title, description, price } = req.body;
      //TODO update 400 error handling
      if (!title || !description || !price) {
         return res.status(400).json({ message: "Title, description and price are required" });
      }

      const newProduct = await ProductsServices.createProduct(req.body);

      return res.status(201).json(newProduct);
   }

   static async deleteProduct(req: Request, res: Response) {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({ message: "Product ID is required" });
      }

      const deletedProduct = await ProductsServices.deleteProduct(Number(id));
      return res.status(200).json(deletedProduct);
   }
}

export default ProductsControllers;
