const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true },

  email: { 
    type: email, 
    required: true },

  id:{
     type: String,
    },

  password: {
     type: String,
      required: true },

     
  
});

module.exports = mongoose.model('user', userSchema);