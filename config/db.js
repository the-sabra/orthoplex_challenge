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
    //try executing a query to test the connection
    try {
        const [rows] = await db.execute('SELECT 1');
        if (!rows) throw new Error('Database connection test failed');
    } catch (error) {
        console.error('Database connection error');
        process.exit(0); // Exit the process with error code 1
    }
    console.log("Connected to the database"); 
    return db; 
}  

export default db; 