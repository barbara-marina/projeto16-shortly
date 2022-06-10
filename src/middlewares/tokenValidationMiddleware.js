import db from "../../config/db.js";

export default async function tokenMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    if (!token) return res.status(401).send("Token not received.");

    try {
        const verifySession = await db.query(`
        SELECT *
        FROM sessions
        WHERE token=$1;
        `, [token]);

        if (verifySession.rowCount === 0) return res.status(401).send("This session does not exist.");
        
        const verifyUser = await db.query(`
        SELECT *
        FROM users
        WHERE id=$1;
        `, [verifySession.rows[0].userId]);

        if (verifyUser.rowCount === 0) return res.status(401).send("This user does not exist.");
        
        res.locals.user = verifyUser.rows[0];
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
    next();
}