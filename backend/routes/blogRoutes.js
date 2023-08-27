const express = require('express');
const { AllBlog, createBlog, updateBlog ,deleteBlog, UserBlog } = require('../controllers/blogControllers');
const Authenticate = require('../middleware/authenticate');
const router = express.Router();


router.get('/all-blogs', AllBlog);

router.post('/create',createBlog);

router.put('/update-blog/:id' ,updateBlog);

router.delete('/delete-blog/:id', deleteBlog);

router.get('/user-blog/:id', Authenticate, UserBlog);


module.exports = router;