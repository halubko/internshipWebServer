import express from "express";
import { PORT } from "@/constants/constants";
import ProductsRouter from "./routers/ProductsRouter";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware";
import AuthRouter from "./routers/AuthRouter";
import UserRouter from "./routers/UserRouter";
import cookieParser from "cookie-parser";

const app = express();

app.use(
   cors({
      origin: "*",
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());

app.use("/products", ProductsRouter);
app.use("/users", UserRouter);
app.use("/auth", AuthRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT", PORT);
});
