import express from "express";
import { PORT } from "@/constants/port";
import ProductsRouter from "./routers/ProductsRouter";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", ProductsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT", PORT);
});
