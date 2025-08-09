const Blog = require('../../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, content, coverImage, category, tags, messageByWriter, authorId } = req.body;
    
    const blog = new Blog({
      title,
      content,
      coverImage,
      category,
      tags,
      messageByWriter,
      author: authorId, 
      status: 'pending'
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create blog', error });
  }
};