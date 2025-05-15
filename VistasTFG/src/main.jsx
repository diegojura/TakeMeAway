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

// 2) Importa los iconos de Leaflet y configura las URLs
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Viajes from './pages/Viajes.jsx';
import Conductor from './pages/Conductor.jsx';
import Iniciosesion from './pages/Iniciosesion.jsx';
import Registro from './pages/Registro.jsx';
import Perfil from './pages/Perfil.jsx';
import Iniciado from './pages/Iniciado.jsx';

// 3) Fija los iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl: iconShadow,
});

// 4) Layout con navbar y footer
function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// 5) Define las rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'viajes', element: <Viajes /> },
      { path: 'viaje', element: <Conductor /> },
      { path: 'Iniciosesion', element: <Iniciosesion /> },
      { path: 'Registro', element: <Registro /> },
      { path: 'Perfil', element: <Perfil /> },
      { path: 'Iniciado', element: <Iniciado /> },
    ],
  },
]);

// 6) Monta la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
