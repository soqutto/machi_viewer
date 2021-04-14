const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const prefecturesRouter = require('./routes/prefectures');
const searchRouter = require('./routes/search');
const getRouter = require('./routes/getjson');

const createRecord = require('./database/CreateRecord');

const app = express();

;(async () => {
    await createRecord('./topojson');
})();

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/prefectures', prefecturesRouter);
app.use('/search', searchRouter);
app.use('/getjson', getRouter);

module.exports = app;
