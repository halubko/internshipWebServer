import UserServices from "@/services/UserServices";
import ApiError from "@/utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import type { Request, Response, NextFunction } from "express";

class UserControllers {
   static async addUser(req: Request, res: Response, next: NextFunction) {
      const { username, password, email, expiresIn } = req.body;

      if (!username || !password || !email) {
         return next(new ApiError(400, "Missing required user fields"));
      }

      const newUser = await UserServices.addUser(req.body);

      const accessToken = generateAccessToken(newUser, expiresIn && `${expiresIn}m`);
      const refreshToken = generateRefreshToken(newUser, "7d");

      return res.status(201).json({ ...newUser, accessToken, refreshToken });
   }
}

export default UserControllers;
