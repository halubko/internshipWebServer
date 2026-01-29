import AuthController from "@/controllers/AuthControllers";
import asyncWrapper from "@/utils/asyncWrapper";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/login", asyncWrapper(AuthController.login));

AuthRouter.get("/me", asyncWrapper(AuthController.me));

AuthRouter.post("/refresh", asyncWrapper(AuthController.refresh));

export default AuthRouter;
