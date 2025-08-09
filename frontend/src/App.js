
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { BlogProvider } from './context/BlogContext';
import ThemeContext from './context/ThemeContext';

import HomePage from './pages/HomePage/HomePage';
import BlogPage from './pages/BlogPage/BlogPage';
import GigPage from './pages/GigPage/GigPage';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import RequestPermission from './pages/RequestPermission/RequestPermission';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import BlogPost from './pages/BlogPost/BlogPost';

import './App.css';
import './components/ui/SeoBusinessSvg/SeoBusinessSvg.css';
import Footer from "./components/Footer/Footer"
import Navbar from './components/Navbar/Navbar';
import Signup from './pages/Signup/Signup';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <UserProvider>
          <BlogProvider>
            <div className={`app ${theme}`}>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/gig/:gigSlug" element={<GigPage />} />

                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/create-blog" element={<CreateBlog />} />
                  <Route path="/edit/:id" element={<CreateBlog />} />
                  <Route path="/request-permission" element={<RequestPermission />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BlogProvider>
        </UserProvider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;