import express from 'express';
import validate from  '../middleware/validation.js'
import { userQuerySchema,userIdSchema ,verifySchema,updateUserSchema} from '../utils/validators/user.schema.js';
import  userController from '../controllers/user.controller.js';
import { authenticate ,isAdmin } from '../middleware/auth.js';
const router  = express.Router();  

 
router.get('/',authenticate,isAdmin,userQuerySchema,validate,userController.getAllUsers);
router.post('/verify',verifySchema,validate,userController.verifyUser);
router.get('/inactive',authenticate,isAdmin,userController.getInActiveUsers);
router.get('/:userId',userIdSchema ,validate ,userController.getUser);
router.patch('/:userId',updateUserSchema ,validate ,userController.updateUser);
router.delete('/:userId',userIdSchema ,validate ,userController.deleteUser);

export default router;