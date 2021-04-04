const express = require('express');
const router = express.Router();
const {getSQLClient} = require('../database/SQLClient');

const queryString =
    `SELECT city_id, pref_name, sityo_name, gst_name, css_name
     FROM cities, prefectures
     WHERE
      cities.pref_code = prefectures.pref_code
     AND 
      (prefectures.pref_name ||
       COALESCE(sityo_name, '') ||
       COALESCE(gst_name, '') ||
       COALESCE(css_name, '')) LIKE $1
    `;

const queryStringSpecifiedPrefecture =
    `AND
      prefectures.pref_code = $2
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
    const params = [];

    if('name' in req.query){
        params.push('%' + req.query.name + '%');
    } else {
        params.push('%%');
    }

    if('pref' in req.query){
        sendQuery += queryStringSpecifiedPrefecture;
        params.push(Number(req.query.pref));
    }

    // Send query to the database
    const searchResult = await client.execute(sendQuery, params).catch((e) => {
        console.error("Failed to send query to the database.")
        console.error(e);
        res.sendStatus(500);
        return;
    });

    await client.release().catch((e) => {
        console.error("Failed to release connection handle.")
        console.error(e);
    })
    res.json(searchResult);
});

module.exports = router;