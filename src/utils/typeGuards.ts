export const orderByIsValid = (value: unknown): value is "asc" | "desc" | undefined => {
   return value === "asc" || value === "desc" || value === undefined;
};

export const sortByIsValid = (value: unknown): value is "title" | "price" | undefined => {
   return value === "title" || value === "price" || value === undefined;
};
