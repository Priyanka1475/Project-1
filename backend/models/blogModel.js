const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

  title: { 
    type: String,
     required: true },

  content: { 
    type: String, 
    required: true },

  imageUrl: {
     type: String,
    },

  author: {
     type: String,
      },

      user:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        required: true
        
      }

     });

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;