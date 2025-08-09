import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginAPI } from '../api/authAPIs/login';
import { checkAuthAPI } from '../api/authAPIs/checkAuth';
import { logoutAPI } from '../api/authAPIs/logout';
import { signupAPI } from '../api/authAPIs/signup';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const data = await checkAuthAPI();
    if(data && data.isAuthenticated) {
      setCurrentUser(data.user);
      return false;
    } else {
      setCurrentUser(null);
      const path = window.location.pathname;
      if (
        path === "/admin"
      ) {
        navigate("/login");
      }
      return true;
    }
  }

  const login = async (email, password) => {
    const data = await loginAPI({email, password});
    console.log(data)
    if(data) {
      checkAuth();
      return true;
    }
    return false;
  }

  const signup = async (username, email, password) => {
    return await signupAPI({username, email, password});
  }

  const logout = async () => {
    const data = await logoutAPI();
    if(data) {
      setCurrentUser(null);
    }
  }

  const isAdmin = () => currentUser?.role === USER_ROLES.ADMIN;
  const isUser = () => currentUser?.role === USER_ROLES.USER;

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, login, signup, logout, isAdmin, isUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};