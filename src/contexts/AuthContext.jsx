import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Gọi API để lấy thông tin user
      setUser({
        id: 1,
        username: 'admin',
        role: 'admin',
        name: 'Admin',
      });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // TODO: Gọi API đăng nhập
      // Tạm thời hardcode
      if (username === 'admin' && password === 'admin') {
        const userData = {
          id: 1,
          username: 'admin',
          role: 'admin',
          name: 'Admin',
        };
        setUser(userData);
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
