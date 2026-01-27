import z from "zod";

export const createProductValidation = z.object({
   title: z.string("Title is required").min(3, "Title must be at least 3 characters long"),
   price: z.number("Price is required").positive("Price must be a positive number"),
   brand: z.string("Brand is required").min(2, "Brand must be at least 2 characters long"),
   stock: z
      .number("Stock is required")
      .int("Stock must be an integer")
      .positive("Stock cannot be negative"),
   rating: z
      .number("Rating is required")
      .positive("Rating cannot be negative")
      .max(5, "Rating cannot be more than 5"),
   category: z.string("Category is required").min(1, "Category is required"),
   images: z
      .array(z.string("Image URL is required").url("Image URL must be a valid URL"))
      .min(1, "At least one image is required"),
   thumbnail: z.string("Thumbnail URL is required").url("Thumbnail URL must be a valid URL"),
});

export type CreateProductInput = z.infer<typeof createProductValidation>;
