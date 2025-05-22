import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar       from './components/Navbar.jsx';
import Footer       from './components/Footer.jsx';
import RequireAuth  from './components/RequireAuth.jsx';

import LoginPage    from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Iniciado     from './pages/Iniciado.jsx';
import Home         from './pages/Home.jsx';
import Viajes       from './pages/Viajes.jsx';
import Conductor    from './pages/Conductor.jsx';
import Perfil       from './pages/Perfil.jsx';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* públicas */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* protegidas */}
        <Route element={<RequireAuth />}>
          <Route path="/"          element={<Iniciado />} />
          <Route path="/home"      element={<Home />} />
          <Route path="/viajes"    element={<Viajes />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/perfil"    element={<Perfil />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
