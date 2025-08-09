const Blog = require('../../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'approved' }).populate('author', 'name role avatar');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
};