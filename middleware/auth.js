import jwt from '../utils/jwt.js';
import userService from '../services/user.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import * as dotenv from 'dotenv';
dotenv.config(); 

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
  if (!token) throw new ApiResponse(401,"Authentication required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.getUserById(decoded.userId);
    if (!user) throw new ApiResponse(401, "Invalid token");
    req.user = user; 
    next();
  } catch (err) {
    next(err);
  }
};

// Admin-only middleware
export const isAdmin = (req, res, next) => {
  if (!req.user?.is_admin) throw new ApiResponse(403, "Admin access required");
  next(); 
};

