import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config(); 
    
export class Jwt {
    secret = process.env.JWT_SECRET;
    expiration = process.env.JWT_EXPIRATION;
      

    constructor(){
        if(!this.secret || !this.expiration){
            throw new Error("JWT secret and expiration must be provided");
        }
    }

    sign(payload){
        return jwt.sign(payload , this.secret , {expiresIn: `${this.expiration}m`});
    }

    verify(token){
        return jwt.verify(token , this.secret);
    }q

    decode(token){
        return jwt.decode(token);
    }
}

export default new Jwt();