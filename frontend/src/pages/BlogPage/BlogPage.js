
import React, { useState, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import BlogList from '../../components/blogComponents/BlogList/BlogList';
import './BlogPage.css';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const { blogs } = useBlog();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];
  
  useEffect(() => {
    let filtered = [...blogs];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === activeCategory);
    }
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    setFilteredBlogs(filtered);
  }, [blogs, activeCategory, searchTerm]);
  
  return (
    <div className="app">
      <main>
        <section className="blog-header">
          <div className="container">
            <h1>Our Blog</h1>
            <p>Discover stories, insights, and expertise from our community of writers.</p>
          </div>
        </section>
        
        <section className="blog-filters">
          <div className="container">
            <div className="search-box">
              <input 
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <button className="create-blog-button" onClick={() => navigate("/create-blog")}>
          <FaEdit />
          Create Your Own Blog
        </button>

        <section className="blog-content">
          <div className="container">
            {filteredBlogs.length === 0 && searchTerm && (
              <div className="no-results">
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
            
            {filteredBlogs.length === 0 && !searchTerm && (
              <div className="no-results">
                <h3>No posts in this category yet</h3>
                <p>Check back soon or browse other categories.</p>
              </div>
            )}
            
            {filteredBlogs.length > 0 && (
              <BlogList posts={filteredBlogs} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;