
import React, { useState } from 'react';
import BlogEditor from '../blogEditor/BlogEditor';
import './CreateBlogForm.css';
import InputTagAndFileUpload from '../../ui/InputTagAndFileUpload/InputTagAndFileUpload';
import BlogPreview from '../BlogPreview/BlogPreview';

const CreateBlogForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [coverImage, setCoverImage] = useState(initialData.coverImage || '');
  const [tags, setTags] = useState(initialData.tags?.join(', ') || '');
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleEditorSave = (htmlContent) => {
    setContent(htmlContent);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process tags into an array
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    onSubmit({
      title,
      content,
      category,
      coverImage,
      tags: tagsArray,
      date: initialData.date || new Date().toISOString()
    });
  };
  
  return (
    <div className="create-blog-form">
      <h2>{initialData._id ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter a compelling title..."
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Art">Art</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image</label>
            {/* <input
              type="text"
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter an image URL..."
            /> */}
            <InputTagAndFileUpload name="image" label={"Enter image url or upload"} value={coverImage} onChange={(e) => setCoverImage(e)} />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas..."
          />
        </div>
        
        <div className="form-group editor-container">
          <div className="editor-header">
            <label>Content</label>
            <button 
              type="button" 
              onClick={(e) => {e.preventDefault(); setPreviewMode(!previewMode)}}
              className="preview-toggle"
            >
              {previewMode ? 'Edit' : 'Preview'}
            </button>
          </div>
          
          {previewMode ? (
            <div className="content-preview">
              {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
              <BlogPreview content={content} />
            </div>
          ) : (
            <BlogEditor onSave={handleEditorSave} initialContent={content} />
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {initialData.id ? 'Update Post' : 'Publish Post'}
          </button>
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;