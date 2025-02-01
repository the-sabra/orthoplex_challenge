import  authService from '../services/auth.service.js';
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from '../utils/jwt.js';

class AuthController {
    async register(req, res, next) {
        try {
            const { user } = await authService.register(req.body);
            const token = jwt.sign({ userId: user.id });
            
            res.status(201).json(
                ApiResponse.success(
                    201,
                    { 
                        user, 
                        token 
                    },
                    "User Registered"
                )
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles user authentication through login.
     * @async
     * @param {Object} req - Express request object
     * @param {Object} req.body - Request body
     * @param {string} req.body.email - User's email
     * @param {string} req.body.password - User's password
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     * @throws {Error} - If login fails
     * @returns {Promise<void>} - JSON response with user data and authentication token
     */
    async login(req, res, next) {
        try {
            const user = await authService.login(req.body);
            const token = jwt.sign({ userId: user.id });

            res.json(
                ApiResponse.success(
                    200,
                    { 
                        user, 
                        token 
                    },
                    'Login successful'
                )
            );
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            await authService.logout();
            res.json(ApiResponse.success(null, 'Logout successful'));
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
export default authController;