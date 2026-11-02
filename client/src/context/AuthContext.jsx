import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('codepath_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('codepath_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('codepath_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          localStorage.setItem('codepath_user', JSON.stringify(res.data));
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: jwtToken, ...userData } = res.data;
    localStorage.setItem('codepath_token', jwtToken);
    localStorage.setItem('codepath_user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
    return res.data;
  };

  const register = async (name, email, password, domain = 'software-development') => {
    const res = await api.post('/auth/register', { name, email, password, domain });
    const { token: jwtToken, ...userData } = res.data;
    localStorage.setItem('codepath_token', jwtToken);
    localStorage.setItem('codepath_user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
    return res.data;
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem('codepath_user', JSON.stringify(merged));
      return merged;
    });
  };

  const switchDomain = async (newDomain) => {
    try {
      const res = await api.put('/auth/profile', { domain: newDomain });
      updateUser({ domain: newDomain });
      return res.data;
    } catch (err) {
      console.error('Failed to switch domain:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('codepath_token');
    localStorage.removeItem('codepath_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUser,
        switchDomain,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
