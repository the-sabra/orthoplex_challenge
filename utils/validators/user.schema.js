import { body, param, query } from "express-validator";


/**
 * Validation schema for user id
 * @constant {Array<ValidationChain>} userIdSchema
 * @description Express-validator middleware array that validates:
 * - userId: must exist and be a string
 */

export const userIdSchema = [
    param('userId').exists().isNumeric(),
];


/**
 * Validation schema for user query parameters.
 * @constant {Array<ValidationChain>} userQuerySchema
 * @description Validates the query parameters for user-related endpoints:
 * - page (optional): Must be a numeric value
 * - limit (optional): Must be a numeric value
 * - name (optional): Must be a string
 * - email (optional): Must be a string
 * - is_verified (optional): Must be a boolean value
 */
export const userQuerySchema = [
    query('page').optional().isNumeric(),
    query('limit').optional().isNumeric().isInt({ max: 35 }),
    query('name').optional().isString(),
    query('email').optional().isString(),
    query('is_verified').optional().isBoolean(),
    query('start_date').optional().isDate(),
    query('end_date').optional().isDate(),
];


/**
 * Array of validation middleware for verifying user email.
 * Uses express-validator's body() method to validate email field.
 * 
 * @constant {Array<Function>}
 * @exports verifySchema
 */
export const verifySchema = [
    body('email').exists().isEmail(),
]; 


/**
 * Array of validation middleware for updating user information.
 * Uses express-validator to validate request body fields.
 * 
 * @constant
 * @type {import('express-validator').ValidationChain[]}
 * @property {ValidationChain} email - Optional email validation
 * @property {ValidationChain} name - Optional name string validation
 */
export const updateUserSchema = [
    param('userId').exists().isNumeric(),
    body('email').optional().isEmail(),
    body('name').optional().isString(),
];  