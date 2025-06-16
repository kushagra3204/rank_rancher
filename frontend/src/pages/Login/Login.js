
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Login.css';
import Footer from '../../components/Footer/Footer';

const Login = () => {
  const { login, currentUser } = useUser();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Redirect if already logged in
  if (currentUser) {
    navigate('/');
    return null;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    const success = login(email, password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className="app">
      <main>
        <section className="login-section">
          <div className="container">
            <div className="login-container">
              <div className="login-header">
                <h1>Welcome Back</h1>
                <p>Sign in to continue to Blogify</p>
              </div>
              
              <div className="login-demo-users">
                <p>For demo purposes, use one of these accounts:</p>
                <ul>
                  <li><strong>Admin:</strong> admin@example.com</li>
                  <li><strong>Contributor:</strong> contributor@example.com</li>
                  <li><strong>Reader:</strong> reader@example.com</li>
                  <li>(Password can be anything)</li>
                </ul>
              </div>
              
              {error && <div className="login-error">{error}</div>}
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                
                <button type="submit" className="login-button">
                  Sign In
                </button>
              </form>
              
              <div className="login-footer">
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;