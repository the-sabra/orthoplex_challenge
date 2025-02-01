import userService from '../services/user.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res,next) {
        try {
            const user = await userService.getUserById(req.params.userId);
            res.json(ApiResponse.success(200,user));
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.params.userId, req.body);
            res.json(ApiResponse.success(200,user)); 
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers(req.query.page, req.query.limit,
                {name:req.query.name, email:req.query.email , is_verified:req.query.is_verified}
            ); 
            res.json(ApiResponse.success(200,users));
        } catch (error) {
            next(error); 
        }
    }

    async verifyUser(req, res, next) {
        try {
           await userService.verifyUser(req.body.email);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getInActiveUsers(req, res, next) {
        try {
            const users = await userService.inActiveUsers();
            res.json(ApiResponse.success(200,users));
        } catch (error) {
            next(error);
        }
    }

    async getTopLoginUsers(req, res, next) {
        try {
            const users = await userService.topLoginUsers();
            res.json(ApiResponse.success(200,users));
        } catch (error) {
            next(error);
        }
    }
}

// Create a singleton instance
const userController = new UserController();

export default userController;