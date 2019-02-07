const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.render('homes/index', {title: 'Hello'});

});

module.exports = routes;