import { useEffect, useRef } from 'react';
import SlideshowManager from '../../../utils/SlideshowManager';
import './BlogPreview.css';

const BlogPreview = ({ content }) => {
  const previewRef = useRef(null);
  const slideshowManagerRef = useRef(new SlideshowManager());

  useEffect(() => {
    if (previewRef.current && content) {
      previewRef.current.innerHTML = content;
      
      setTimeout(() => {
        slideshowManagerRef.current.initializeAllSlideshows(previewRef.current);
      }, 100);
    }

    // Cleanup function
    return () => {
      slideshowManagerRef.current.cleanupAllSlideshows();
    };
  }, [content]);

  return (
    <div className="blog-preview">
      <div 
        ref={previewRef}
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogPreview;