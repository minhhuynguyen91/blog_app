const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  img_link: {
    type: String,
    trim: true,
  },

  
});

module.exports = mongoose.model('Article', articleSchema);