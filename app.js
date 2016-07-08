const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const publicPath = path.resolve(__dirname, 'client/dist/');

const app = express();
app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
app.get('/', (req, res) => res.sendFile(
  path.resolve(__dirname, 'client/dist/index.html')
));

module.exports = app;
