const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.render('homes/index', {weather: null, error: null});

});

module.exports = routes;