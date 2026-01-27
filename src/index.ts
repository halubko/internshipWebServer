import express from "express";
import { PORT } from "@/constants/constants";
import ProductsRouter from "./routers/ProductsRouter";
import cors from "cors";
import { paramsMiddleware } from "./middlewares/paramsMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(paramsMiddleware);

app.use("/products", ProductsRouter);

app.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT", PORT);
});
