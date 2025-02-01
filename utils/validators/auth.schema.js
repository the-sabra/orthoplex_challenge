import { body } from "express-validator";
  
/**
 * Validation schema for user registration
 * @constant {Array<ValidationChain>} registerSchema
 * @description Express-validator middleware array that validates:
 * - name: must exist and be a string
 * - email: must exist and be a valid email format
 * - password: must exist and be a string
 */
export const registerSchema = [
    body('name').exists().isString().isLength({ min: 3, max: 50 }),
    body('email').exists().isEmail(),
    body('password').exists().isString(),
];



/**
 * Schema validation for login requests using express-validator.
 * @constant {Array} loginSchema
 * @property {Function} email - Validates that email field exists and is a valid email format
 * @property {Function} password - Validates that password field exists and is a string
 */
export const loginSchema = [
    body('email').exists().isEmail(),
    body('password').exists().isString(),
]; 
