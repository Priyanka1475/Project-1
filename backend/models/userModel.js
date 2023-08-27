const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
 
  password: {
    type: String,
    required: true
  },

  blogs:[
    {
      type: mongoose.Types.ObjectId,
      ref: "blog"
      
  }
],

tokens: [
  {
    token:{
      type: String,
      required: true
    }
  }
]

});


userSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
    console.log(process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
  }
  catch(error){
    console.log(error);
  }
}

  
module.exports = mongoose.model('user', userSchema);
