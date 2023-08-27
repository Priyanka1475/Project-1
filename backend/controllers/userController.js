const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//to get all users
exports.getAllUsers =  async(req, res) =>{
    try{
        const users = await userModel.find({})
        return res.status(200).send({
            success: true,
            message: 'all users data',
            users
        })
    }

    catch(error){
        console.log(error)
        return res.status(500).send({
            sccess: false,
            message: 'Some error occured please try again'

        })
    }
}

exports.registerController = async(req , res ) =>{


    try{

        const{name , email , password} = req.body;

        if(!name || !email|| !password){
            return res.status(400).sent({
                message : "please fill all the sections mentioned in above form",
                success : false
            })
        }

        const existinguser = await userModel.findOne({email})

        if(existinguser){
            return res.status(401).send({
                message : "This user already exists",
                success : false
            }
                )
        }
        const hpassword = await bcrypt.hash(password, 10);
        
        const user = new userModel({name , email , password: hpassword })
               await user.save();
            res.status(201).send({
                message : "successfully registered",
                success : true,
                user
            })
    }

    catch(error){
     console.log(error)
 return res.status(500).send({
    message: "there is some error in the callback ",
    success: false

 })
    }
}

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Email not found'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid password'
      });
    }

    const userId = user._id; 

    const token = await user.generateAuthToken();
    console.log(token);
    
    res.cookie("jwtoken", token,{
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
      path: '/api/v1', 
    });
    

    return res.status(200).send({
      success: true,
      message: 'Successfully logged in',
      userId: userId ,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in login',
      error: error.message 
    });
  }
};