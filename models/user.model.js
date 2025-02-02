import db from '../config/db.js';
import * as bcrypt from 'bcrypt';
import logger from '../config/logger.js';
class User {
    constructor({ id, name, email, password, is_verified = false, is_admin = false , login_count = 0 , last_login_at = null }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.is_verified = is_verified;
        this.is_admin = is_admin;
        this.login_count = login_count;
        this.last_login_at = last_login_at;
    }

    async save() {
        try {
            if (this.id) {
                return await this.update();
            }
            this.password = await this.hashPassword(this.password);
            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, is_verified, is_admin) VALUES (?, ?, ?, ?, ?)',
                [this.name, this.email, this.password, this.is_verified, this.is_admin]
            );
            this.id = result.insertId;
            this.password = undefined;
            return this; 
        } catch (error) {
            logger.error("Error saving user", error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Email already exists');
            }
            throw new Error('Error saving user');
        }
    }

    async update() {
        try {
            const validFields = ['name', 'email', 'password', 'is_verified', 'is_admin','login_count',
                'last_login_at'
            ]; 
            const updates = Object.fromEntries(
                Object.entries(this).filter(([key]) => validFields.includes(key))
            );
            const query = `UPDATE users SET ${Object.keys(updates).map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
            const values = [...Object.values(updates), this.id];
            
            const [result] = await db.execute(query, values);
            this.password = undefined;
            return result.affectedRows > 0 ? this : null;
        } catch (error) {
            logger.error("Error updating user", error);
            throw new Error('Error updating user');
        }
    }

    async delete() {
        try {
            const [result] = await db.execute('DELETE FROM users WHERE id = ?', [this.id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0] ? new User(rows[0]) : null;
        } catch (error) {
            logger.error("Error fetching user", error);
            throw new Error('Error fetching user');
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0] ? new User(rows[0]) : null;
        } catch (error) {
            logger.error("Error fetching user", error);
            throw new Error('Error fetching user');
        }
    }

    static async findAll(page, limit, filters) {
        try {
            const numLimit = parseInt(limit, 10);
            const numPage = parseInt(page, 10);
            const offset = (numPage - 1) * numLimit;
            
            let query = 'SELECT * FROM users';
            let countQuery = 'SELECT COUNT(*) as count FROM users';
            let queryParams = [];
            let whereConditions = [];

            if (filters.name || filters.email || filters.is_verified !== undefined) {
                if (filters.name) whereConditions.push('name LIKE ?');
                if (filters.email) whereConditions.push('email = ?');
                if (filters.is_verified !== undefined) whereConditions.push('is_verified = ?');

                queryParams = [
                    ...(filters.name ? [`%${filters.name}%`] : []),
                    ...(filters.email ? [filters.email] : []),
                    ...(filters.is_verified !== undefined ? [filters.is_verified === 'true'] : [])
                ];
            }

            if (filters.start_date && filters.end_date) {
                whereConditions.push('created_at BETWEEN ? AND ?');
                queryParams.push(new Date(filters.start_date), new Date(filters.end_date));
            }

            if (whereConditions.length > 0) {
                const whereClause = ' WHERE ' + whereConditions.join(' AND ');
                query += whereClause;
                countQuery += whereClause;
            }

            // Add pagination
            query += ' LIMIT ?, ?';
            queryParams.push(Number(offset), Number(numLimit));


            // Execute queries
            const [rows] = await db.query(query, queryParams);
            const [totalRows] = await db.query(countQuery, queryParams.slice(0, -2));
            const [totalVerified] = await db.execute('SELECT COUNT(*) as count FROM users WHERE is_verified = 1');

            const totalCountRegisteredUsers = totalRows[0].count;
            const totalVerifiedUsers = totalVerified[0].count;
            const totalPages = Math.ceil(totalCountRegisteredUsers / limit);

            return {
                users: rows.map(row => new User({ ...row, password: undefined })),
                pagination: {
                    currentPage: numPage,
                    totalPages,
                    totalCountRegisteredUsers,
                    totalVerifiedUsers,
                    hasMore: numPage < totalPages
                }
            };
        } catch (error) {
            logger.error("Error fetching users:", error);
            throw new Error('Error fetching users');
        }
    }

    static async findInactive(){
        try {
            const [rows] = await db.execute(
                `SELECT * 
                FROM users 
                WHERE last_login_at IS NULL OR 
                last_login_at <= DATE_SUB(NOW(), INTERVAL 1 HOUR) OR
                last_login_at <= DATE_SUB(NOW(), INTERVAL 1 MONTH)`
            );
            
            return rows.map(row => new User({ ...row, password: undefined }));
        } catch (error) {
            logger.error("Error fetching inactive users", error);
            throw new Error('Error fetching inactive users');
        }
    }

    static async findTopLoginUsers(){
        try {
            const [rows] = await db.execute(
                `SELECT * 
                FROM users 
                ORDER BY login_count DESC
                LIMIT 3`
            );
            return rows.map(row => new User({ ...row, password: undefined }));
        } catch (error) {
            logger.error("Error fetching inactive users", error);
            throw new Error('Error fetching inactive users');
        }
    }
 
     async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}
 
export default User;
