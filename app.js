const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
var path = require('path');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

module.exports = app;
