import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for authentication state
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  
  // Check for saved auth state on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sunri_user');
    const savedToken = localStorage.getItem('sunri_token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setAuthToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);
  
  // Login function
  const login = (username, token = 'mock-auth-token') => {
    const userObj = { username };
    setUser(userObj);
    setAuthToken(token);
    setIsLoggedIn(true);
    
    // Save to localStorage
    localStorage.setItem('sunri_user', JSON.stringify(userObj));
    localStorage.setItem('sunri_token', token);
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    setIsLoggedIn(false);
    
    // Remove from localStorage
    localStorage.removeItem('sunri_user');
    localStorage.removeItem('sunri_token');
  };
  
  // Create value object for the context
  const value = {
    user,
    isLoggedIn,
    authToken,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;