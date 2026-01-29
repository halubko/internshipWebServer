import { prisma } from "@/lib/prisma";

class AuthServices {
   static async login(username: string) {
      const user = await prisma.user.findUnique({
         where: {
            username,
         },
      });

      return user;
   }
}

export default AuthServices;
