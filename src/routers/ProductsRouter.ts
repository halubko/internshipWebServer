import ProductsControllers from "@/controllers/ProductsControllers";
import { Router } from "express";

const ProductsRouter = Router();

ProductsRouter.get("/", ProductsControllers.getAllProducts);

ProductsRouter.get("/:id", ProductsControllers.getProductById);

ProductsRouter.post("/add", ProductsControllers.createProduct);

ProductsRouter.delete("/:id", ProductsControllers.deleteProduct);

export default ProductsRouter;
