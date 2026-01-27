import ProductsControllers from "@/controllers/ProductsControllers";
import { Router } from "express";

const ProductsRouter = Router();

ProductsRouter.get("/", ProductsControllers.getAllProducts);

ProductsRouter.get("/search", ProductsControllers.searchProductsByTitle);

ProductsRouter.get("/categories", ProductsControllers.getProductsCategories);

ProductsRouter.get("/category-list", ProductsControllers.getProductsCategoryList);

ProductsRouter.post("/add", ProductsControllers.createProduct);

ProductsRouter.get("/:id", ProductsControllers.getProductById);

ProductsRouter.delete("/:id", ProductsControllers.deleteProduct);

export default ProductsRouter;
