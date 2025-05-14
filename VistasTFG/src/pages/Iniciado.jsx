import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function Routing({ waypoints, profile }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
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
  // A y C fijos; B desde geolocalización o fallback
  const [locationA, setLocationA] = useState('37.878865,-4.779342');
  const [locationB, setLocationB] = useState('');
  const [locationC, setLocationC] = useState('37.892500,-4.752778');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocationB(`${pos.coords.latitude},${pos.coords.longitude}`),
        () => setLocationB('37.888200,-4.779400') // centro Córdoba como respaldo
      );
    } else {
      setLocationB('37.888200,-4.779400');
    }
  }, []);

  // Convierte "lat,lng" → [lat, lng]
  const toLatLng = str => {
    const [lat, lng] = str.split(',').map(Number);
    return L.latLng(lat, lng);
  };

  const A = toLatLng(locationA);
  const B = toLatLng(locationB);
  const C = toLatLng(locationC);

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
          <button className="bg-black text-white px-4 py-2 rounded-md w-fit">
            Ver precios
          </button>
        </div>

        {/* Aquí el mapa */}
        <div className="w-full lg:w-1/2 m-4 lg:m-8 rounded-lg shadow-md overflow-hidden" style={{ height: '400px' }}>
          <MapContainer
            center={[37.8882, -4.7794]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
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
        </div>
      </div>
    </div>
  );
}
