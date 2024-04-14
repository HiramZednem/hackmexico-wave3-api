import { conn } from "../database/db.js"
// Correo, nombre, contrasena
// Register
export const createUser = async (req, res) => {
    const { email, password } = req.body;
    const username = "user"; 

    const [existingUser] = await conn.query("SELECT * FROM user WHERE email = ?", [email]);

    if (existingUser.length > 0) {
        res.json(false);
    } else {
        const [rows] = await conn.query("INSERT INTO user (username, email, password) VALUES (?,?,?)", [username, email, password]);

        if (rows.insertId !== undefined) {
            res.json(true);
        } else {
            res.json(false);
        }
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body
    const [rows] = await conn.query("SELECT * FROM user WHERE email = ? AND password = ?",[email,password])
    
    if (rows.length > 0) {
        res.json(true)
    } else {
        res.json(false)
    }
}