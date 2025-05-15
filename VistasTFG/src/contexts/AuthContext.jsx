import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    // Al cargar la app, intenta refrescar sesión
    api.get('/sanctum/csrf-cookie').then(() => {
      api.get('/usuarios') // un endpoint protegido que devuelve tu info
        .then(r => setUser(r.data))
        .catch(() => setUser(null));
    });
  }, []);

  const login = ({ email, password }) =>
    api.post('/login', { email, password })
      .then(() => api.get('/usuarios'))
      .then(r => {
        setUser(r.data);
        nav('/viajes');
      });

  const registro = ({ nombre, email, password }) =>
    api.post('/usuarios', { nombre, email, password })
      .then(() => login({ email, password }));

  const logout = () =>
    api.post('/logout')
      .then(() => {
        setUser(null);
        nav('/login');
      });

  return (
    <AuthContext.Provider value={{ user, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
