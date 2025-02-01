import express from 'express';
import { loginSchema, registerSchema } from '../utils/validators/auth.schema.js';
import validate from  '../middleware/validation.js'
import authController from '../controllers/auth.controller.js';
const router  = express.Router();  

 
router.post('/register',registerSchema, validate ,authController.register);  
router.post('/login',loginSchema, validate , authController.login);
   
export default router;