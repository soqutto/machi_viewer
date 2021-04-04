const express = require('express');
const fs = require('fs');
const path = require('path');
const {getSQLClient} = require('../database/SQLClient');

const router = express.Router();

const queryString =
    `SELECT json_filename
     FROM cities
     WHERE
      cities.city_id = $1
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
    const params = [];

    if('id' in req.query && req.query.id.length == 5){
        params.push(req.query.id);
    } else {
        res.sendStatus(400);
        return;
    }

    // Send query to the database
    const fileRecord = await client.execute(queryString, params).catch((e) => {
        console.error("Failed to send query to the database.")
        console.error(e);
        res.sendStatus(500);
        return;
    });

    if(fileRecord.length == 0){
        console.error("No matching record.");
        res.sendStatus(404);
        return;
    }

    const filename = fileRecord[0].json_filename;

    await client.release().catch((e) => {
        console.error("Failed to release connection handle.")
        console.error(e);
    })

    const filepath = path.join('./topojson', filename);
    if(!fs.existsSync(filepath)){
        console.error("Unable to find specified file.")
        res.sendStatus(404);
        return;
    }

    const topoJson = JSON.parse(await fs.promises.readFile(filepath));
    res.json(topoJson);
});

module.exports = router;