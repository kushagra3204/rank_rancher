import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllBlogs } from '../api/blogAPIs/fetchAllblogApi';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [permissionRequests, setPermissionRequests] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchAllBlogs();
      setBlogs(data);
    };
    loadBlogs();
  }, []);

  const addBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    return newBlog;
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => 
      blog._id === updatedBlog._id ? updatedBlog : blog
    ));
    return updatedBlog;
  };

  const deleteBlog = (blogId) => {
    setBlogs(blogs.filter(blog => blog._id !== blogId));
  };

  const getBlogById = (blogId) => {
    return blogs.find(blog => blog._id === blogId);
  };

  const addPermissionRequest = (newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: permissionRequests.length ? Math.max(...permissionRequests.map(r => r.id)) + 1 : 1
    };
    setPermissionRequests([requestWithId, ...permissionRequests]);
    return requestWithId;
  };

  const updatePermissionStatus = (requestId, status) => {
    setPermissionRequests(permissionRequests.map(request => 
      request.id === requestId ? { ...request, status } : request
    ));
  };

  const hasPermissionRequest = (userId) => {
    return permissionRequests.some(request => 
      request.userId === userId && 
      (request.status === 'pending' || request.status === 'approved')
    );
  };

  const blogContext = {
    blogs,
    permissionRequests,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    addPermissionRequest,
    updatePermissionStatus,
    hasPermissionRequest
  };

  return (
    <BlogContext.Provider value={blogContext}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};