import express from "express";
import { PORT } from "@/constants/constants";
import ProductsRouter from "./routers/ProductsRouter";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware";
import AuthRouter from "./routers/AuthRouter";
import UserRouter from "./routers/UserRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", ProductsRouter);
app.use("/users", UserRouter);
app.use("/auth", AuthRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT", PORT);
});
