const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.sendStatus(400);
});

module.exports = router;