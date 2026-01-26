import express from "express";
import { PORT } from "@/constants/constants";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
   console.log("SERVER IS RUNNING ON PORT", PORT);
});
