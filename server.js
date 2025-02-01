import express from 'express';
import { connect } from './config/db.js';
import * as dotenv from 'dotenv';
import AuthRouter from './routes/auth.routes.js';
import UserRouter from './routes/user.routes.js';
import { errorHandler } from './middleware/error.handler.js';
const app = express();
dotenv.config(); 

const port = process.env.PORT ||3000;
 
// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', AuthRouter); 
app.use('/users', UserRouter);

app.use(errorHandler); 

app.listen(port, () => {
     connect(); 
    console.log(`Server running at http://localhost:${port}`);
}); 