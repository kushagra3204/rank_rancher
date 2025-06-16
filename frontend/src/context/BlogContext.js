
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for blog data
export const BlogContext = createContext();

// Sample blog data
const initialBlogs = [
  {
    id: 1,
    title: 'Getting Started with Markdown Editing',
    content: `<h2>What is Markdown?</h2>
    <p>Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world's most popular markup languages.</p>
    
    <h2>Why Use Markdown?</h2>
    <p>Using Markdown is different than using a WYSIWYG editor. In an application like Microsoft Word, you click buttons to format words and phrases, and the changes are visible immediately. Markdown isn't like that. When you create a Markdown-formatted file, you add Markdown syntax to the text to indicate which words and phrases should look different.</p>
    
    <h3>For example, to denote a heading, you add a number sign before it (e.g., # Heading One). Or to make a phrase bold, you add two asterisks before and after it (e.g., **this text is bold**).</h3>
    
    <p>You can add Markdown formatting elements to a plaintext file using a text editor application. Or you can use one of the many Markdown applications for macOS, Windows, Linux, iOS, and Android operating systems. There are also several web-based applications specifically designed for writing in Markdown.</p>
    
    <h2>Markdown Syntax Examples</h2>
    
    <h3>Headers</h3>
    <pre><code># This is an H1
## This is an H2
### This is an H3</code></pre>
    
    <h3>Emphasis</h3>
    <pre><code>*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_</code></pre>
    
    <h3>Lists</h3>
    <pre><code>Unordered:
* Item 1
* Item 2
  * Item 2a
  * Item 2b

Ordered:
1. Item 1
2. Item 2
3. Item 3</code></pre>
    
    <h3>Links</h3>
    <pre><code>[Link text](URL "Title")</code></pre>
    
    <h3>Images</h3>
    <pre><code>![Alt text](URL "Title")</code></pre>
    
    <p>With our rich text editor, you can simply use the toolbar buttons to apply formatting without needing to remember Markdown syntax!</p>`,
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    category: 'Technology',
    author: {
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    date: '2025-04-25T12:00:00Z',
    tags: ['markdown', 'tutorial', 'writing']
  },
  {
    id: 2,
    title: 'The Art of Writing Engaging Blog Content',
    content: `<h2>Understanding Your Audience</h2>
    <p>Before you start writing, it's crucial to understand who you're writing for. What are their interests, pain points, and questions? What kind of language do they respond to? Knowing your audience will guide your content strategy and help you create more engaging posts.</p>
    
    <h2>Crafting Compelling Headlines</h2>
    <p>Your headline is the first thing readers see, and it often determines whether they'll click through to read your post. A good headline should:</p>
    <ul>
      <li>Be clear and specific</li>
      <li>Create a sense of urgency or curiosity</li>
      <li>Include relevant keywords for SEO</li>
      <li>Deliver on its promise in the content</li>
    </ul>
    
    <h2>Structuring Your Post for Readability</h2>
    <p>Online readers tend to scan content rather than read every word. Make your post easy to scan by:</p>
    <ul>
      <li>Using subheadings to break up text</li>
      <li>Keeping paragraphs short (3-4 sentences max)</li>
      <li>Including bullet points and numbered lists</li>
      <li>Using bold text to highlight important points</li>
      <li>Adding relevant images or graphics</li>
    </ul>
    
    <h2>Writing with Authenticity</h2>
    <p>Readers connect with content that feels genuine and personal. Don't be afraid to let your personality shine through in your writing. Share personal anecdotes, express honest opinions, and write in a conversational tone that makes readers feel like they're having a discussion with you.</p>
    
    <h2>Providing Actionable Value</h2>
    <p>The best blog posts leave readers with clear takeaways they can apply to their lives or work. Whether it's a step-by-step tutorial, a list of helpful resources, or thought-provoking questions that encourage reflection, make sure your content provides tangible value.</p>
    
    <h2>Encouraging Engagement</h2>
    <p>End your posts with a call to action that invites readers to engage further. This could be asking a question, encouraging comments, suggesting related posts to read next, or prompting readers to share the post with their network.</p>
    
    <p>Remember, great blog content isn't just about driving traffic—it's about building relationships with your readers and establishing yourself as a trusted voice in your niche.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    category: 'Writing',
    author: {
      name: 'Contributor',
      role: 'contributor',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    date: '2025-04-20T12:00:00Z',
    tags: ['writing', 'content marketing', 'blogging tips']
  },
  {
    id: 3,
    title: 'Creating Visual Content for Your Blog',
    content: `<h2>Why Visual Content Matters</h2>
    <p>Humans are visual creatures. We process images 60,000 times faster than text, and 90% of the information transmitted to our brains is visual. In the context of blogging, incorporating compelling visual elements can significantly increase engagement, sharing, and retention of your content.</p>
    
    <h2>Types of Visual Content for Blogs</h2>
    
    <h3>Featured Images</h3>
    <p>Your featured image is often the first visual element readers see, especially when your content is shared on social media. It should capture the essence of your post and entice readers to click through. Choose images that are relevant, high-quality, and aligned with your brand aesthetic.</p>
    
    <h3>Infographics</h3>
    <p>Infographics combine text and imagery to present information or data in a visually appealing and easy-to-understand format. They're particularly effective for explaining complex concepts, presenting statistics, or summarizing key points from your post.</p>
    
    <h3>Screenshots and Product Images</h3>
    <p>If you're writing tutorials or product reviews, screenshots and product images are essential for guiding readers through processes or showing them exactly what you're discussing.</p>
    
    <h3>Charts and Graphs</h3>
    <p>When presenting data or statistics, charts and graphs make the information more digestible and impactful than plain text.</p>
    
    <h3>Videos and GIFs</h3>
    <p>Video content and GIFs add movement and interactivity to your blog. They can demonstrate processes, showcase products in use, or simply add personality to your content.</p>
    
    <h2>Creating Visual Content: Tools and Resources</h2>
    
    <h3>Stock Photo Sites</h3>
    <p>Sites like Unsplash, Pexels, and Pixabay offer high-quality, royalty-free images you can use in your blog posts.</p>
    
    <h3>Graphic Design Tools</h3>
    <p>Tools like Canva, Adobe Express, or Visme make it easy to create custom graphics, infographics, and social media images without advanced design skills.</p>
    
    <h3>Screenshot and Screen Recording Tools</h3>
    <p>Tools like Snagit, Loom, or even your computer's built-in screenshot function can be used to capture and annotate screenshots or record your screen.</p>
    
    <h2>Best Practices for Visual Content</h2>
    
    <ul>
      <li>Maintain consistent branding across all visual elements</li>
      <li>Optimize images for web to ensure fast loading times</li>
      <li>Include alt text for accessibility and SEO</li>
      <li>Respect copyright and licensing requirements</li>
      <li>Position images thoughtfully to break up text and enhance your narrative</li>
    </ul>
    
    <p>By thoughtfully incorporating visual elements into your blog posts, you can create a more engaging, memorable, and shareable reading experience for your audience.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
    category: 'Design',
    author: {
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    date: '2025-04-15T12:00:00Z',
    tags: ['design', 'visual content', 'graphics']
  }
];

// Permission request data
const initialPermissionRequests = [
  {
    id: 1,
    userId: 3,
    userName: 'Reader',
    reason: 'I have extensive experience writing about technology and would love to contribute articles about emerging tech trends and their impact on society.',
    status: 'pending',
    date: '2025-04-28T10:30:00Z'
  }
];

// Provider component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [permissionRequests, setPermissionRequests] = useState([]);
  
  // Initialize with sample data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    setBlogs(initialBlogs);
    setPermissionRequests(initialPermissionRequests);
  }, []);
  
  // Add a new blog post
  const addBlog = (newBlog) => {
    const blogWithId = {
      ...newBlog,
      id: blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
      date: new Date().toISOString()
    };
    
    setBlogs([blogWithId, ...blogs]);
    return blogWithId;
  };
  
  // Update an existing blog post
  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    ));
    return updatedBlog;
  };
  
  // Delete a blog post
  const deleteBlog = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };
  
  // Get a single blog post by ID
  const getBlogById = (blogId) => {
    return blogs.find(blog => blog.id === blogId);
  };
  
  // Add a new permission request
  const addPermissionRequest = (newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: permissionRequests.length ? Math.max(...permissionRequests.map(r => r.id)) + 1 : 1
    };
    
    setPermissionRequests([requestWithId, ...permissionRequests]);
    return requestWithId;
  };
  
  // Update permission request status
  const updatePermissionStatus = (requestId, status) => {
    setPermissionRequests(permissionRequests.map(request => 
      request.id === requestId ? { ...request, status } : request
    ));
  };
  
  // Check if a user has a pending permission request
  const hasPermissionRequest = (userId) => {
    return permissionRequests.some(request => 
      request.userId === userId && 
      (request.status === 'pending' || request.status === 'approved')
    );
  };
  
  // Make the context object
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

// Custom hook for using the blog context
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};