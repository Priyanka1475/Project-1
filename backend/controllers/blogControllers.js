const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const authenticate = require("../middleware/authenticate");

const mongoose = require('mongoose');

exports. AllBlog = async(req , res)=>{

    try{
        const blogs = await blogModel.find({})
  if(!blogs){
    return res.status(200).send({
        success: false,
        message: "No blogs found"
    })
  }
  return res.status(200).send({
    success: true,
    message: "all blogs found",
    blogs
  })
        

    }
    catch(error){
        console.log(error)
        return res.status(402).send({
            success: false,
            message: 'error occurred'
        })
    }
}

exports.createBlog = async (req, res) => {
    try {
        const { title, content, imageUrl, author, user } = req.body;
        console.log("Request Body:", req.body);

        if (!title || !content || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide title, content, and user ID"
            });
        }

        const existingUser = await userModel.findById(user);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "User not found or not registered"
            });
        }

        const newBlog = new blogModel({ title, content, imageUrl, author, user });
        existingUser.blogs.push(newBlog);

        await existingUser.save();
        await newBlog.save();

        return res.status(200).send({
            success: true,
            message: "Blog created",
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred",
            error
        });
    }
};



exports.updateBlog= async(req , res)=>{
    try{
        const{id} = req.params
        const {title , content , imageUrl , author} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new: true})
         return res.status(200).send({
            success: true,
            message:"Blog Updated",
            blog
         })
   
    }
    catch(error){
        console.log(error);
        return res.status(200).send({
            success: false,
            message: "some error occurred"
    
        })
    }

}

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find and delete the blog
        const deletedBlog = await blogModel.findOneAndDelete({ _id: blogId }).populate('user');

        if (!deletedBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        // Remove the blog from the user's blogs array
        const user = await userModel.findById(deletedBlog.user);
        if (user) {
            user.blogs.pull(blogId);
            await user.save();
        } else {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Blog deleted",
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({
            success: false,
            message: "An error occurred while deleting the blog",
            error
        });
    }
};


exports.UserBlog =  async (req, res) => {
    try {
        const userId = req.params.id;
        const userBlog = await userModel.findById({_id : userId}).populate("blogs")
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "User was not found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "User blogs",
            userBlog
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred",
            error
        });
    }
};


