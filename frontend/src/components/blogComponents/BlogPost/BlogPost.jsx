import { useEffect, useRef } from 'react';
import SlideshowManager from '../../../utils/SlideshowManager';
import React from 'react';
import './BlogPost.css';

const BlogPost = ({ post, isPreview = false }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const contentRef = useRef(null);
  const slideshowManagerRef = useRef(new SlideshowManager());

  useEffect(() => {
    if (contentRef.current && post?.content) {
      contentRef.current.innerHTML = post.content;
      
      // Initialize slideshows after content is rendered
      setTimeout(() => {
        slideshowManagerRef.current.initializeAllSlideshows(contentRef.current);
      }, 100);
    }
    return () => {
      slideshowManagerRef.current.cleanupAllSlideshows();
    };
  }, [post?.content]);

  if (!post) {
    return <div className="blog-post">No blog content available</div>;
  }

  return (
    <div className={`blog-post ${isPreview ? 'preview' : ''}`}>
      <div className="blog-post-image">
        <img src={post.coverImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'} alt={post.title} />
      </div>
      
      <div className="blog-post-meta">
        <span className="blog-post-date">{formatDate(post.date || new Date())}</span>
        {post.category && <span className="blog-post-category">{post.category}</span>}
      </div>
      
      <h2 className="blog-post-title">{post.title}</h2>
      
      {!isPreview && post.author && (
        <div className="blog-post-author">
          <div className="author-avatar">
            <img src={post.author.avatar || 'https://i.pravatar.cc/150?img=3'} alt={post.author.name} />
          </div>
          <div className="author-info">
            <span className="author-name">{post.author.name}</span>
            <span className="author-role">{post.author.role}</span>
          </div>
        </div>
      )}

      {!isPreview && (
        <div 
          ref={contentRef}
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
      
      {isPreview && (
        <a href={`/blog/${post._id}`} className="read-more">
          Read More
        </a>
      )}
      
      {!isPreview && post.tags && post.tags.length > 0 && (
        <div className="blog-post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;