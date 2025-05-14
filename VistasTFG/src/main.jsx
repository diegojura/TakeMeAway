// src/main.jsx
// ──────────────────────────────────────────────────────────────────────────────
// 1) Importa los CSS de Leaflet y del Routing Machine
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import L from 'leaflet';

// 2) Importa estáticamente los iconos de Leaflet y configura las URLs
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// 3) Tus componentes de layout y rutas
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Viajes from './pages/Viajes';
import Conductor from './pages/Conductor';
import Iniciosesion from './pages/Iniciosesion';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import Iniciado from './pages/Iniciado';

function EstructuraPrincipal() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function ErrorPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen text-7xl text-white text-center">
        ¡Ups! Parece que algo ha salido mal.
      </div>
      <Footer />
    </>
  );
}

const rutas = createBrowserRouter([
  {
    element: <EstructuraPrincipal />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Viajes', element: <Viajes /> },
      { path: '/Conductor', element: <Conductor /> },
      { path: '/Iniciosesion', element: <Iniciosesion /> },
      { path: '/Registro', element: <Registro /> },
      { path: '/Perfil', element: <Perfil /> },
      { path: '/Iniciado', element: <Iniciado /> },
    ],
  },
]);

// 4) Monta la app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rutas} />
  </React.StrictMode>
);
