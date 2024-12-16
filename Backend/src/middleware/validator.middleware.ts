import * as userValidation from "../validation/user.validation";
import * as captainValidation from "../validation/captain.validation";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Main validation middleware
export const validate = (validationName: string): any[] => {
  const validations: Record<string, any[]> = {
    "users:register": userValidation.userRegistration,
    "user:login": userValidation.userLogin,
    "captain:register": captainValidation.captainRegistration,
    "captain:login": captainValidation.captainLogin,
  };

  // Check if the validation exists, else return an empty array
  const validationRules = validations[validationName] || [];
  
  // Return the validation rules along with error handling
  return [...validationRules, handleValidationErrors];
};
