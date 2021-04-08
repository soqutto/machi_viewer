const express = require('express');
const router = express.Router();
const {getSQLClient} = require('../database/SQLClient');

const queryString =
    `SELECT pref_code, pref_name
     FROM prefectures
    `;

router.get('/', async function(req, res, next){
    // Connect to the database
    const client = await getSQLClient().catch((e) => {
        console.error("Failed to connect to the database.");
        console.error(e);
        res.sendStatus(400);
        return;
    });

    // Parameter check
    let sendQuery = queryString;

    // Send query to the database
    const prefList = await client.execute(sendQuery).catch((e) => {
        console.error("Failed to send query to the database.")
        console.error(e);
        res.sendStatus(500);
        return;
    });

    await client.release().catch((e) => {
        console.error("Failed to release connection handle.")
        console.error(e);
    })
    res.json(prefList);
});

module.exports = router;