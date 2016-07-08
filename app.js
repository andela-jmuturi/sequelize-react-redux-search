const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send({
  message: 'Welcome',
}));

module.exports = app;
