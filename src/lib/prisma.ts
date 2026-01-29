import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type User } from "@/prismaGenerated/client";
import bcrypt from "bcrypt";
import { SALT } from "@/constants/constants";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter }).$extends({
   query: {
      user: {
         async $allOperations({ operation, args, query }) {
            if (["create", "update", "upsert"].includes(operation) && "data" in args) {
               const data = args.data as User;

               if (data && typeof data.password === "string") {
                  data.password = bcrypt.hashSync(data.password, SALT);
               }
            }
            return query(args);
         },
      },
   },
});

export { prisma };
