import express from 'express';
import { connect } from './config/db.js';
import * as dotenv from 'dotenv';
import AuthRouter from './routes/auth.routes.js';
import UserRouter from './routes/user.routes.js';
import { errorHandler } from './middleware/error.handler.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
dotenv.config(); 

const port = process.env.PORT || 3000;
 
// Middleware for logging HTTP requests
app.use(morgan('combined'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for enabling CORS
app.use(cors({
    origin:"*"
}));

// Middleware for adding Helmet security headers
app.use(helmet());
 
app.use('/auth', AuthRouter); 
app.use('/users', UserRouter);

app.use(errorHandler); 

app.listen(port, () => {
     connect(); 
    console.log(`Server running at http://localhost:${port}`);
});