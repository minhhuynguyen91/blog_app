const express = require('express') 
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
var path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

module.exports = app;
