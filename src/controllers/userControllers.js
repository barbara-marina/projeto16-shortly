import db from "../../config/db.js";

export async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const resultShortenedUrls = await db.query (`
            SELECT urls.id, urls."shortUrl", urls.url, urls.views AS "visitCount"
            FROM urls
            JOIN users ON users.id=urls."userId"
            WHERE users.id=$1;
        `, [id]);

        let result = await db.query(`
            SELECT users.id, users.name, SUM(urls.views) AS "visitCount"
            FROM users
            JOIN urls ON users.id=urls."userId"
            WHERE users.id=$1
            GROUP BY users.id;
        `, [id]);

        if (result.rowCount === 0) return res.status(404).send("User not found.");

        result.rows[0].shortenedUrls = resultShortenedUrls.rows;

        res.status(200).send(result.rows[0]);
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export async function getRanking(req, res) {
    try {
        const result = await db.query (`
            SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls.views) AS "visitCount"
            FROM users
            JOIN urls ON urls."userId"=users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC LIMIT 10;
        `);

        if (result.rowCount === 0) return res.status(404).send("Ranking not found.");

        res.status(200).send(result.rows);
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}