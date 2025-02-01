import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config(); 
    

var db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'strong-password',
    database: 'challenge',
}); 
 
export async function connect() {
    db.connect(function(err) {
        if (err) throw err;
    });
    console.log("Connected to the database"); 
    return db; 
} 

export default db; 