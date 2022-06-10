import db from "../../config/db.js";

export default async function tokenMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    if (!token) return res.status(401).send("Token not received.");

    try {
        const resultSession = await db.query(`
        SELECT *
        FROM sessions
        WHERE token=$1;
        `, [token]);

        if (resultSession.rowCount === 0) return res.status(401).send("This session does not exist.");
        
        const resultUser = await db.query(`
        SELECT *
        FROM users
        WHERE id=$1;
        `, [resultSession.rows[0].userId]);

        if (resultUser.rowCount === 0) return res.status(401).send("This user does not exist.");
        
        res.locals.user = resultUser.rows[0];
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
    next();
}