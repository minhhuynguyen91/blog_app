const express = require('express') 
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
var path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/simplemde', express.static(__dirname + '/node_modules/simplemde/dist'));


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/article/new', routes);
app.use('/articles', routes);
app.use('/article/:id', routes);
app.use('/article/:id/edit', routes);

module.exports = app;
