import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Signup.css';
import Footer from '../../components/Footer/Footer';

const Signup = () => {
  const { signup, currentUser } = useUser();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState('');

  if (currentUser) {
    navigate('/');
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !repassword || !username) {
      setError('Please fill in all fields.');
      return;
    }

    if(password.length < 6) {
      setError('Password should be of length greater than or equal to 6.');
      return;
    }

    if(password !== repassword) {
      setError('Password are different.');
      return;
    }
    
    const success = await signup(username, email, password);
        
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className="app">
      <main>
        <section className="signup-section">
          <div className="container">
            <div className="signup-container">
              <div className="signup-header">
                <h1>Welcome Back</h1>
                <p>Sign up to continue</p>
              </div>
              
              {error && <div className="signup-error">{error}</div>}
              
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-grid">
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
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                <div className="form-grid">
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

                  <div className="form-group">
                    <label htmlFor="repassword">Re-Enter Password</label>
                    <input
                      type="password"
                      id="repassword"
                      value={repassword}
                      onChange={(e) => setRepassword(e.target.value)}
                      placeholder="Re-enter your password"
                    />
                  </div>
                </div>

                <button type="submit" className="signup-button">
                  Sign Up
                </button>
              </form>

              <div className="signup-footer">
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;