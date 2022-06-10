import db from "../../config/db.js";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        const verifyUser = await db.query(`
        SELECT *
        FROM users
        WHERE email=$1;
        `, [email]);

        if (verifyUser.rows.length !== 0) return res.status(409).send("Already registered user.");

        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `, [name, email, passwordHash]);

        res.status(201).send("New user created successfully.");

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const user = req.body;

    try {
        const verifyUser = await db.query(`
        SELECT *
        FROM users
        WHERE email=$1;
        `, [user.email]);

        if (verifyUser.rows.length !== 0 && bcrypt.compareSync(user.password, verifyUser.rows[0].password)) {
            const token = uuid();
            await db.query(`
                INSERT INTO sessions ("userId", token)
                VALUES ($1, $2);
            `, [verifyUser.rows[0].id, token]);
            return res.status(200).send(token);
        }
        res.status(404).send("User not found.");
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}