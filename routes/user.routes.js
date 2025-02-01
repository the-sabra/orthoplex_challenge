import express from 'express';
import validate from '../middleware/validation.js';
import { userQuerySchema, userIdSchema, verifySchema, updateUserSchema } from '../utils/validators/user.schema.js';
import userController from '../controllers/user.controller.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { checkUserPermission } from '../middleware/user.permission.js';

const router = express.Router();

router.get('/', authenticate, isAdmin, userQuerySchema, validate, userController.getAllUsers);
router.post('/verify', verifySchema, validate, userController.verifyUser);
router.get('/inactive', authenticate, isAdmin, userController.getInActiveUsers);
router.get('/top-logins', authenticate, isAdmin, userController.getTopLoginUsers);
router.get('/:userId', userIdSchema, validate, userController.getUser);
router.patch('/:userId', authenticate, checkUserPermission, updateUserSchema, validate, userController.updateUser);
router.delete('/:userId', authenticate, checkUserPermission, userIdSchema, validate, userController.deleteUser);

export default router;