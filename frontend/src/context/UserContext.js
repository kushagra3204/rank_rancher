
import React, { createContext, useState, useContext } from 'react';

// Create a context for user data and authentication
export const UserContext = createContext();

// Sample user roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CONTRIBUTOR: 'contributor',
  READER: 'reader'
};

// Provider component that wraps your app and provides the user context
export const UserProvider = ({ children }) => {
  // Default to a logged-out state - in a real app, this would check local storage/session
  const [currentUser, setCurrentUser] = useState(null);
  
  // For demo purposes, we'll add some mock users
  const mockUsers = [
    { id: 1, name: 'Admin User', email: 'admin@gmail.com', role: USER_ROLES.ADMIN, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Contributor', email: 'contributor@example.com', role: USER_ROLES.CONTRIBUTOR, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Reader', email: 'reader@example.com', role: USER_ROLES.READER, avatar: 'https://i.pravatar.cc/150?img=3' },
  ];
  
  const login = (email, password) => {
    // In a real app, you would verify credentials with an API
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
  };
  
  const isAdmin = () => {
    return currentUser?.role === USER_ROLES.ADMIN;
  };
  
  const isContributor = () => {
    return currentUser?.role === USER_ROLES.CONTRIBUTOR;
  };
  
  const isReader = () => {
    return currentUser?.role === USER_ROLES.READER;
  };
  
  const updateUserRole = (userId, newRole) => {
    if (!isAdmin()) return false;
    
    // In a real app, you would update the role via an API
    if (userId !== currentUser.id) {
      // Mock implementation: if this was the current user, update their state
      if (currentUser.id === userId) {
        setCurrentUser({ ...currentUser, role: newRole });
      }
      return true;
    }
    
    return false;
  };
  
  // Make the context object with all of our functions and state
  const userContext = {
    currentUser,
    login,
    logout,
    isAdmin,
    isContributor,
    isReader,
    updateUserRole,
    mockUsers
  };
  
  // Pass the context object to the Provider
  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};