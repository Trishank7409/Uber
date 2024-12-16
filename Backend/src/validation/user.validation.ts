import { check } from "express-validator";


export const userRegistration = [
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
    check("firstName")
      .exists({ values: "falsy" })
      .notEmpty()
      .bail()
      .withMessage("Enter first Name"),
    check("lastName")
      .exists({ values: "falsy" })
      .notEmpty()
      .bail()
      .withMessage("last Name is required"),
  ];

export const userLogin=[
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