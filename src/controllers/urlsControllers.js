import db from "../../config/db.js";
import { nanoid } from "nanoid";

export async function shortenUrls(req, res) {
    const { user } = res.locals;
    const { url } = req.body;

    try {
        const shortUrl = nanoid(8);

        await db.query (`
            INSERT INTO urls ("userId", url, "shortUrl")
            VALUES ($1, $2, $3);
        `, [user.id, url, shortUrl]);
        
        res.status(201).send({shortUrl});

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}