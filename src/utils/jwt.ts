import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "@/constants/constants";
import type { User } from "@/prismaGenerated/client";
import type { ExpiresInType } from "@/types/expiresInType";
import jwt from "jsonwebtoken";

export function generateAccessToken(user: Omit<User, "password">, expiresIn: ExpiresInType) {
   if (!JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET is not defined");
   }

   return jwt.sign({ ...user }, JWT_ACCESS_SECRET, {
      expiresIn: expiresIn || "60m",
   });
}

export function decodeAccessToken(token: string) {
   if (!JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET is not defined");
   }

   try {
      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
      return decoded;
   } catch (_error) {
      return "Invalid access token";
   }
}

export function generateRefreshToken(user: Omit<User, "password">) {
   if (!JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET is not defined");
   }

   return jwt.sign({ ...user }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
   });
}

export function decodeRefreshToken(token: string) {
   if (!JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET is not defined");
   }

   try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      return decoded;
   } catch (_error) {
      return "Invalid refresh token";
   }
}
