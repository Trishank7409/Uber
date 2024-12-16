import { check } from "express-validator";


export const captainRegistration = [
    check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 3 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Last Name must be at least 3 characters long"),
  check("color")
    .exists({ checkFalsy: true })
    .withMessage("Vehicle color is required"),
  check("capacity")
    .exists({ checkFalsy: true })
    .withMessage("Vehicle capacity is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Vehicle capacity should be more than 1"),
  check("plate")
    .exists({ checkFalsy: true })
    .withMessage("Vehicle plate is required")
    .bail()
    .isString()
    .withMessage("Vehicle plate must be a valid string"),
  check("vehicleType")
    .exists({ checkFalsy: true })
    .withMessage("Vehicle type is required")
    .bail()
    .isIn(["car", "bike", "auto"])
    .withMessage("Vehicle type must be one of 'car', 'bike', or 'auto'"),
  check("location.lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90"),
  check("location.lng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180"),
  ];

export const captainLogin=[
  check("email")
  .exists({ values: "falsy" })
  .notEmpty()
  .bail()
  .withMessage("Email is required")
  .isEmail()
  .bail()
  .withMessage("Enter valid email"),
  check("password")
  .exists({ values: "falsy" })
  .notEmpty()
  .bail()
  .withMessage("Password is required"),
]
