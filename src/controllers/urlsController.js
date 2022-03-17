import { connection } from '../database.js';
import { v4 as uuid } from 'uuid';

export async function postURL(req, res) {
    const url = req.body.url;
    const user = res.locals.user;
    const shortURL = uuid();

    try {
        await connection.query(`
            INSERT INTO urls ("shortUrl", url, "userId") 
                VALUES ($1)
        `, [shortURL, url, user.id]);
        res.status(201).send({shortURL});
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export async function getURL(req, res) {
    const { url } = req.params;

    try {   
        const shortURL = await connection.query(`
            SELECT * FROM urls
                WHERE urls."shortUrl"=$1
        `, [url]);

        if (shortURL.rowCount === 0) return res.sendStatus(404);

        res.status(200).send(shortURL.rows[0])
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export async function deleteURL(req, res) {
    const { id } = req.params;

    try {
        const shortURL = await connection.query(`
            SELECT * FROM urls
                WHERE urls."userId"=$1
        `, [id])

        if (shortURL.rowCount === 0) return res.sendStatus(401)

        await connection.query(`
            DELETE FROM urls
                WHERE urls."userId"=$1
        `, [id])
        res.sendStatus(204)
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
};