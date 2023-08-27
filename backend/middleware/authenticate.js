const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(token);
    console.log(process.env.SECRET_KEY); 
    console.log('Received token from cookies:', token); 
    const verify = jwt.verify(token, process.env.SECRET_KEY);
   

    const user = await userModel.findOne({
      id: verify.id,
      "tokens.token": token
    });
    
    console.log('User found:', user); 

    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user; 
    next();
  } catch (error) {
    console.log('Authentication error:', error); 
    res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = Authenticate;
