import express from "express";
import { PORT } from "@/constants/constants";
import ProductsRouter from "./routers/ProductsRouter";

const app = express();

app.use(express.json());

app.use("/products", ProductsRouter);

app.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT", PORT);
});
