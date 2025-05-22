// src/pages/Iniciado.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useNavigate } from 'react-router-dom';

export default function Iniciado() {
  const navigate = useNavigate();

  const [locationA, setLocationA] = useState('37.878865,-4.779342');
  const [locationB, setLocationB] = useState('');
  const [locationC, setLocationC] = useState('37.892500,-4.752778');

  // geolocalización para B
  useEffect(() => {
    const fallback = '37.888200,-4.779400';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setLocationB(`${coords.latitude},${coords.longitude}`),
        () => setLocationB(fallback)
      );
    } else {
      setLocationB(fallback);
    }
  }, []);

  // al hacer click, navegamos a /home pasando el estado
  const handleVerPrecios = () => {
    navigate('/home', {
      state: { locationA, locationB, locationC }
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="w-full lg:w-1/2 px-6 py-8 lg:p-12 flex flex-col gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Viaja a cualquier lugar con la app TAKEMEAWAY.
          </h1>
          <input
            type="text"
            placeholder="Ubicación A (Mezquita)"
            className="p-3 border rounded-md"
            value={locationA}
            onChange={e => setLocationA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ubicación B (Tu ubicación)"
            className="p-3 border rounded-md"
            value={locationB}
            onChange={e => setLocationB(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ubicación C (Fidiana)"
            className="p-3 border rounded-md"
            value={locationC}
            onChange={e => setLocationC(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <select className="p-2 border rounded-md w-full sm:w-1/2">
              <option>Hoy</option>
            </select>
            <select className="p-2 border rounded-md w-full sm:w-1/2">
              <option>Ahora</option>
            </select>
          </div>
          <button
            onClick={handleVerPrecios}
            className="bg-black text-white px-4 py-2 rounded-md w-fit"
          >
            Ver precios
          </button>
        </div>

        <div
          className="w-full lg:w-1/2 m-4 lg:m-8 rounded-lg shadow-md overflow-hidden"
          style={{ height: '400px' }}
        >
          <MapContainer
            center={[37.8882, -4.7794]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
