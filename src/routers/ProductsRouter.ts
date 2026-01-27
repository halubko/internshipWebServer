import ProductsControllers from "@/controllers/ProductsControllers";
import asyncWrapper from "@/utils/asyncWrapper";
import { Router } from "express";

const ProductsRouter = Router();

ProductsRouter.get("/", asyncWrapper(ProductsControllers.getAllProducts));

ProductsRouter.get("/search", asyncWrapper(ProductsControllers.searchProductsByTitle));

ProductsRouter.get("/category/:category", asyncWrapper(ProductsControllers.getProductsByCategory));

ProductsRouter.get("/categories", asyncWrapper(ProductsControllers.getProductsCategories));

ProductsRouter.get("/category-list", asyncWrapper(ProductsControllers.getProductsCategoryList));

ProductsRouter.post("/add", asyncWrapper(ProductsControllers.createProduct));

ProductsRouter.get("/:id", asyncWrapper(ProductsControllers.getProductById));

ProductsRouter.delete("/:id", asyncWrapper(ProductsControllers.deleteProduct));

export default ProductsRouter;
