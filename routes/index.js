const express = require('express');
const mongoose = require('mongoose');
var mongo = require('mongodb');


const routes = express.Router();
const { body, validationResult } = require('express-validator/check');

const Article = mongoose.model('Article');


routes.get('/', (req, res) => {
  res.render('homes/index', {title: 'Hello'});

});

routes.get('/article/new', (req, res) => {
  res.render('article/new', {title: 'Create Article'});

});

routes.get('/articles', (req, res) => {
  Article.find()
    .then((articles) => {
      res.render('article/articles', {articles});
    })

    .catch(() => {
      res.send('something went wrong');
    }) 
   
});


routes.get('/articles/:id', (req, res) => {
  const objectId = new mongo.ObjectId(req.params.id);
  Article.find( { '_id': objectId} )
    .then((article) => {
      res.render('article/article', {article});
    })

    .catch(() => {
      res.send('something went wrong');
    })
});

routes.post('/article', 
  [
    body('title')
      .isLength({min: 1})
      .withMessage('Please enter the title'),

    body('content')
      .isLength({min: 1})
      .withMessage('Please enter the content')
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const article = new Article(req.body);
      article.save()
        .then(() => { res.send('The article is updated successfully'); })
        .catch(() => { res.send('Sorry, something went wrong!'); });

    } else {
      res.render('article/new', {
        title: 'Create Article',
        errors: errors.array(),
        data: req.body
      });
    }
    
});

module.exports = routes;