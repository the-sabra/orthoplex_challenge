import { ApiResponse } from "../utils/apiResponse.js";

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json(
        ApiResponse.error(
            statusCode,
            err.message || 'Internal server error'
        )
    );
};
