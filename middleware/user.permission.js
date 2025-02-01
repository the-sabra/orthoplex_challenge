import { ApiResponse } from '../utils/apiResponse.js';

export const checkUserPermission = (req, res, next) => {
    const requestedUserId = req.params.userId;
    const authenticatedUser = req.user;

    if (!authenticatedUser) {
        return next(new ApiResponse(401,'Not authenticated'));
    }

    if (authenticatedUser.is_admin || authenticatedUser.id === requestedUserId) {
        return next();
    }

    return next(new ApiResponse(403,'You are not authorized to perform this action'));
};
 