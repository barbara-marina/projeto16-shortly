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
        const result = await db.query (`
            SELECT urls.id, urls."shortUrl", urls.url
            FROM urls
            WHERE urls.id=$1;
        `, [id]);

        if (result.rowCount === 0) return res.status(404).send("Url id does not found.");

        res.status(200).send(result.rows[0]);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const result = await db.query (`
            SELECT *
            FROM urls
            WHERE urls."shortUrl"=$1;
        `, [shortUrl]);
        
        if (result.rowCount === 0) return res.status(404).send("Url id does not found.");

        let newViews = result.rows[0].views + 1;

        await db.query (`
            UPDATE urls
            SET views=$1
            WHERE "shortUrl"=$2;
        `, [newViews, shortUrl]);

        res.redirect(result.rows[0].url);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export async function deleteUrlsById(req, res) {
    const { user } = res.locals;
    const { id } = req.params;

    try {
        const result = await db.query (`
            SELECT *
            FROM urls
            WHERE urls.id=$1;
        `, [id]);

        if (result.rowCount === 0) return res.status(404).send("Url not found.");

        if (result.rows[0].userId !== user.id) return res.status(401).send("Unauthorized user.");

        await db.query (`
            DELETE FROM urls
            WHERE id=$1;
        `, [id]);

        res.status(204).send("Url successfully deleted.");

    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}