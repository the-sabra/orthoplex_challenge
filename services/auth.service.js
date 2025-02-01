import userService from "./user.service.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcrypt';


class AuthService {
    async register({ email, password, name }) {
        try {
            const existingUser = await userService.getUserByEmail(email);
            if (existingUser) {
                throw new ApiResponse(404, 'Email already exists');
            }
            const user = new User({ name, email, password });
            return { user: await user.save() };
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const user = await userService.getUserByEmail(email);
            if (!user) {
                throw new ApiResponse(401,'Invalid email or password');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.error("Invalid password");
                throw new ApiResponse(401,'Invalid email or password');
            }

            const updated = await userService.updateLogin(user.id);
            updated.password = undefined;
            return updated;
        } catch (error) {
            throw error;
        }
    }
}

// Create a singleton instance
const authService = new AuthService();
export default authService;