import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Viajes from './pages/Viajes.jsx';
import IniciarSesion from './pages/Iniciosesion.jsx';
import Registro from './pages/Registro.jsx';
import Perfil from './pages/Perfil.jsx';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas */}
        <Route
          path="/viajes"
          element={ user ? <Viajes /> : <Navigate to="/login" replace /> }
        />
        <Route
          path="/perfil"
          element={ user ? <Perfil /> : <Navigate to="/login" replace /> }
        />

        {/* Cualquier otra: */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
