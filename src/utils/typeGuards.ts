export const orderByIsValid = (value: unknown): value is "asc" | "desc" | undefined => {
   return value === "asc" || value === "desc" || value === undefined;
};
