import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config(); 
    

var db =  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 
 
export async function connect() {
    console.log("Connected to the database"); 
    return db; 
} 

export default db; 