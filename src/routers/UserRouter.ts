import UserControllers from "@/controllers/UserControllers";
import asyncWrapper from "@/utils/asyncWrapper";
import { Router } from "express";

const UserRouter = Router();

UserRouter.post("/add", asyncWrapper(UserControllers.addUser));

export default UserRouter;
