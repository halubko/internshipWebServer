import AuthServices from "@/services/AuthServices";
import ApiError from "@/utils/ApiError";
import { generateAccessToken } from "@/utils/jwt";
import loginValidation from "@/validation/loginValidation";
import bcryprt from "bcrypt";
import type { NextFunction, Request, Response } from "express";

class AuthController {
   static async login(req: Request, res: Response, next: NextFunction) {
      const { username, password, expiresInMins } = req.body;
      const validation = loginValidation.safeParse(req.body);

      if (validation.error) {
         return next(
            new ApiError(
               400,
               "Missing required login fields",
               validation.error.flatten().fieldErrors
            )
         );
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

      res.cookie("accessToken", accessToken, {
         maxAge: 60 * 60 * 1000,
         httpOnly: true,
         secure: false,
         sameSite: "strict",
      });

      res.cookie("refreshToken", refreshToken, {
         maxAge: 7 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: false,
         sameSite: "strict",
      });

      return res.status(200).json({ ...userData, accessToken, refreshToken });
   }
}

export default AuthController;
