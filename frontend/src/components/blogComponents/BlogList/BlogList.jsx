
import React from 'react';
import BlogPost from '../BlogPost/BlogPost';
import './BlogList.css';
import { Link } from 'react-router-dom';

const BlogList = ({ posts, loading }) => {
  if (loading) {
    return (
      <div className="blog-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="blog-list-empty">
        <h3>No blog posts found</h3>
        <p>Be the first to create a blog post!</p>
      </div>
    );
  }
  
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post._id} className="blog-list-item">
          <Link to={`/blog/${post._id}`} className="blog-card-link">
            <BlogPost post={post} isPreview={true} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;