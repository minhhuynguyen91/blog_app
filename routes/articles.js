var mongo = require('mongodb');
const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const { body, validationResult } = require('express-validator/check');


exports.index = function(req, res) {
  Article.find()
    .then((articles) => {
      res.render('article/articles', {articles});
    })

    .catch(() => {
      res.send('something went wrong');
    }) 

};

exports.new = function(req, res) {
  const article = {title: '', content: ''};
  res.render('article/new', {title: 'Create Article', method: 'POST', action:'/articles' , article});

};

exports.edit = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Article.findOne( { '_id': objectId} )
    .then((article) => {
      res.render('article/edit', {title: 'Update Article', method: 'POST', action:'/articles/' +  objectId,article});
    })

    .catch(() => {
      res.send('something went wrong');
    })
};

exports.put = function (req, res) {
  const article = Article.findOneAndUpdate({'_id' : objectId}, { 'title' :req.title, 'content':req.content});
  article.save()
    .then(() => {res.send('The article is updated successfully'); })
    .catch(() => {res.send('Sorry! something went wrong'); });
    
};

exports.id = function (req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Article.findOne( { '_id': objectId} )
    .then((article) => {
      res.render('article/article', {article});
    })

    .catch(() => {
      res.send('something went wrong');
    });
};

exports.post = function (req, res) {
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
  }
};