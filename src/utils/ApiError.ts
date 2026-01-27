class ApiError extends Error {
   constructor(
      public status: number,
      message: string,
      public error?: unknown
   ) {
      super(message);
      this.status = status;
      this.error = error;
   }
}

export default ApiError;
