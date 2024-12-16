class ApiError extends Error {
    statusCode: number;
    message: string;
    data: any;
    success: boolean;
    errors: any[];
    stack?: string;
  
    constructor(
      statusCode: number,
      message: string = "Something went wrong",
      errors: any[] = [],
      stack: string = ""
    ) {
      super(message);
  
      this.message = message;
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }

  export {ApiError}
  