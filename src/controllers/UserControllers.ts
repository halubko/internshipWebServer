import UserServices from "@/services/UserServices";
import ApiError from "@/utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import addUserValidation from "@/validation/addUserValidation";
import type { Request, Response, NextFunction } from "express";

class UserControllers {
   static async addUser(req: Request, res: Response, next: NextFunction) {
      const { expiresIn } = req.body;
      const validation = addUserValidation.safeParse(req.body);

      if (validation.error) {
         return next(
            new ApiError(
               400,
               "Missing required user fields",
               validation.error.flatten().fieldErrors
            )
         );
      }

      const newUser = await UserServices.addUser(req.body);

      const accessToken = generateAccessToken(newUser, expiresIn && `${expiresIn}m`);
      const refreshToken = generateRefreshToken(newUser, "7d");

      return res.status(201).json({ ...newUser, accessToken, refreshToken });
   }
}

export default UserControllers;
