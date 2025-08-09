const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")

const blogController = require('../controllers/blogController/getAllBlogs');
const createBlogController = require("../controllers/blogController/createBlog")

router.get('/getAllBlogs', blogController.getAllBlogs);
router.post('/createBlog', auth, createBlogController.createBlog);

module.exports = router;