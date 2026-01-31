import z from "zod";

const addUserSchema = z.object({
   username: z.string("Username is required").min(3, "Username must be at least 3 characters long"),
   password: z.string("Password is required").min(6, "Password must be at least 6 characters long"),
   email: z.string("Email is required").email("Invalid email address").optional(),
   image: z.string("Image URL is required").url("Image URL must be a valid URL").optional(),
   gender: z.enum(["male", "female"]).optional(),
});

export type AddUserSchemaType = z.infer<typeof addUserSchema>;

export default addUserSchema;
