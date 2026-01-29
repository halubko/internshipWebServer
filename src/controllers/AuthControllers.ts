import AuthServices from "@/services/AuthServices";
import ApiError from "@/utils/ApiError";
import { generateAccessToken } from "@/utils/jwt";
import type { Request, Response, NextFunction } from "express";
import bcryprt from "bcrypt";

class AuthController {
   static async login(req: Request, res: Response, next: NextFunction) {
      const { username, password, expiresInMins } = req.body;

      if (!username || !password) {
         return next(new ApiError(400, "Request missing email or password"));
      }

      const user = await AuthServices.login(username);

      if (!user) {
         return next(new ApiError(400, "User not found"));
      }

      if (bcryprt.compareSync(password, user.password) === false) {
         return next(new ApiError(400, "Invalid password"));
      }

      const { password: _, ...userData } = user;

      const accessToken = generateAccessToken(userData, expiresInMins && `${expiresInMins}m`);
      const refreshToken = generateAccessToken(userData, "7d");

      return res.status(200).json({ ...userData, accessToken, refreshToken });
   }
}

export default AuthController;
