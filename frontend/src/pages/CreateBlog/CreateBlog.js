
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useUser } from '../../context/UserContext';
import CreateBlogForm from '../../components/blogComponents/CreateBlogForm/CreateBlogForm';
import './CreateBlog.css';

const CreateBlog = () => {
  const { id } = useParams();
  const { currentUser, isAdmin, isContributor } = useUser();
  const { addBlog, updateBlog, getBlogById } = useBlog();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  // Check if we're editing an existing post
  const isEditing = !!id;
  const existingPost = isEditing ? getBlogById(id) : null;
  
  // Redirect if not admin or contributor
  // if (!currentUser || (!isAdmin() && !isContributor())) {
  //   navigate('/login');
  //   return null;
  // }
  
  // If editing, check if post exists
  if (isEditing && !existingPost) {
    return (
      <div className="app">
        <div className="container">
          <div className="post-not-found">
            <h1>Post Not Found</h1>
            <p>The blog post you're trying to edit doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/blog')} className="back-button">
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleSubmit = (blogData) => {
    try {
      const blogWithAuthor = {
        ...blogData,
        author: {
          name: "currentUser.name",
          role: "currentUser.role",
          avatar: "currentUser.avatar"
        }
      };
      
      if (isEditing) {
        blogWithAuthor._id = existingPost._id;
        blogWithAuthor.date = existingPost.date;
        updateBlog(blogWithAuthor);
      } else {
        addBlog(blogWithAuthor);
      }
      
      navigate('/blog');
    } catch (err) {
      setError('An error occurred while saving the blog post. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="app">
      <main>
        <section className="create-blog-section">
          <div className="container">
            {error && <div className="error-message">{error}</div>}
            <CreateBlogForm onSubmit={handleSubmit} initialData={existingPost || {}} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateBlog;