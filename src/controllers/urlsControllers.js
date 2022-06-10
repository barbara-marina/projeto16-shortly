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

export async function getUrlsById(req, res) {
    const { id } = req.params;

    try {
        const verifyUrl = await db.query (`
            SELECT urls.id, urls."shortUrl", urls.url
            FROM urls
            WHERE urls.id=$1;
        `, [id]);

        if (verifyUrl.rowCount === 0) return res.status(404).send("Url id does not found.");

        res.status(200).send(verifyUrl.rows[0]);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}