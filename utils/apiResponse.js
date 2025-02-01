  /**
   * Creates an API response
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Response message
   * @param {*} [data=null] - Optional response data
   */

export class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.status = statusCode < 400 ? 'success' : 'fail';
    this.message = message;
    this.statusCode = statusCode;
    if (data) this.data = data;
  }

    /**
   * Creates a success response
   * @param {number} [statusCode=200] - HTTP success status code
   * @param {*} data - Response data
   * @param {string} [message='Success'] - Success message
   * @returns {ApiResponse} Success response instance
   */
  static success(statusCode =200 , data, message = 'Success') {
    return new ApiResponse(statusCode, message, data);
  }

   /**
   * Creates an error response
   * @param {number} statusCode - HTTP error status code
   * @param {string} message - Error message
   * @returns {ApiResponse} Error response instance
   */
  static error(statusCode, message) {
    return new ApiResponse(statusCode, message);
  }
} 

