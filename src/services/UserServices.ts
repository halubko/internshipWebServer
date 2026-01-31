import { prisma } from "@/lib/prisma";
import type { User } from "@/prismaGenerated/client";

class UserServices {
   static async addUser(user: User) {
      const newUser = await prisma.user.create({
         data: user,
      });

      return newUser;
   }
}

export default UserServices;
