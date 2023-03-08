import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getUser = async () => {
    const { data } = await axios.get('/api/user');
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post('/login', data);
      await getUser();
      navigate('/');
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post('/register', data);
      await getUser();
      navigate('/');
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    axios.post('/logout').then(() => {
      setUser(null);
      navigate('/login');
    });
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, errors, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
