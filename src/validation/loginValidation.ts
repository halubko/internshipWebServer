import z from "zod";

const loginValidation = z.object({
   username: z.string("Username is required").min(3, "Username must be at least 3 characters long"),
   password: z.string("Password is required").min(6, "Password must be at least 6 characters long"),
   expiresIn: z.number("ExpiresIn must be a number").optional(),
});

export type LoginValidationType = z.infer<typeof loginValidation>;

export default loginValidation;
