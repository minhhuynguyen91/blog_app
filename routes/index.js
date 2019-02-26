const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var articleController = require('./articles');

routes.route('/')
  .get(homeController.index);


routes.route('/articles/new')
  .get(articleController.new);


routes.route('/articles/:id/edit')
  .get(articleController.edit);

routes.route('/articles')
  .get(articleController.index);

routes.route('/articles/:id') 
  .get(articleController.id)
  .put(articleController.put);

routes.route('/articles')
  .post(articleController.post);

module.exports = routes;