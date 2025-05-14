// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

function Routing({ waypoints, profile }) {
  const map = useMap();
  useEffect(() => {
    const control = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile, // 'foot' o 'car'
      }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);
    return () => map.removeControl(control);
  }, [map, waypoints, profile]);
  return null;
}

export default function Home() {
  // Coordenadas iniciales: A = Mezquita, C = Barrio Fidiana
  const [locA, setLocA] = useState('37.878865,-4.779342');
  const [locB, setLocB] = useState('');
  const [locC, setLocC] = useState('37.892500,-4.752778');

  // Obtener geolocalización para B y fallback al centro de Córdoba
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setLocB(`${coords.latitude},${coords.longitude}`),
        () => setLocB('37.888200,-4.779400')
      );
    } else {
      setLocB('37.888200,-4.779400');
    }
  }, []);

  // Helper: convierte "lat,lng" → LatLng de Leaflet
  const toLatLng = (str) => {
    const [lat, lng] = str.split(',').map(Number);
    return L.latLng(lat, lng);
  };

  const A = toLatLng(locA);
  const B = locB && toLatLng(locB);
  const C = toLatLng(locC);

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/3 p-6">
        <h1 className="text-2xl font-bold mb-4">TAKEMEAWAY</h1>
        <label>Ubicación A (Mezquita):</label>
        <input
          className="w-full mb-2 p-2 border rounded"
          value={locA}
          onChange={(e) => setLocA(e.target.value)}
        />
        <label>Ubicación B (Tu ubicación):</label>
        <input
          className="w-full mb-2 p-2 border rounded"
          value={locB}
          onChange={(e) => setLocB(e.target.value)}
        />
        <label>Ubicación C (Fidiana):</label>
        <input
          className="w-full mb-4 p-2 border rounded"
          value={locC}
          onChange={(e) => setLocC(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Ver precios
        </button>
      </div>

      {/* Mapa a la derecha */}
      <div className="flex-1">
        {B && (
          <MapContainer
            center={B}
            zoom={13}
            style={{ width: '100%', height: '100vh' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {/* Tramo A→B andando */}
            <Routing waypoints={[A, B]} profile="foot" />
            {/* Tramo B→C en coche */}
            <Routing waypoints={[B, C]} profile="car" />
          </MapContainer>
        )}
      </div>
    </div>
  );
}
