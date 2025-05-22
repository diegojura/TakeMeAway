// src/pages/Iniciado.jsx
import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import api from '../services/api.js';

// Control de rutas A→B o B→C
function Routing({ waypoints, profile }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const ctrl = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1', profile }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);
    return () => map.removeControl(ctrl);
  }, [map, waypoints, profile]);
  return null;
}

// Captura clicks para fijar C
function ClickHandler({ setLocationC }) {
  useMapEvent('click', e => {
    const { lat, lng } = e.latlng;
    setLocationC(`${lat.toFixed(6)},${lng.toFixed(6)}`);
  });
  return null;
}

export default function Iniciado() {
  // Estados
  const [locationB, setLocationB]     = useState('');
  const [locationC, setLocationC]     = useState(null);
  const [conductores, setConductores] = useState([]);
  const [showList, setShowList]       = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // 1) Geolocalizar B
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocationB(`${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}`),
        ()   => setLocationB('37.888200,-4.779400')
      );
    } else {
      setLocationB('37.888200,-4.779400');
    }
  }, []);

  // Helper: "lat,lng" → LatLng
  const toLatLng = str => {
    const [lat, lng] = str.split(',').map(Number);
    return L.latLng(lat, lng);
  };

  // 2) Al pulsar “Mostrar precios”:
  const handleShowPrecios = async () => {
    if (!locationC) return;
    // a) fetch conductores
    const { data } = await api.get('/conductores');
    setConductores(data);

    // b) calcular precios
    const B_ll = toLatLng(locationB);
    const C_ll = toLatLng(locationC);
    const enriched = data.map(d => {
      const D = L.latLng(d.lat_inicio, d.lng_inicio);
      const d1 = D.distanceTo(B_ll); // metros
      const d2 = C_ll.distanceTo(D);
      const price = 5 + Math.ceil(d1 / 10) + Math.ceil(d2 / 10);
      return { ...d, price, D };
    });
    setConductores(enriched);
    setShowList(true);
  };

  // 3) Elegir conductor → fija A y muestra rutas
  const handleSelectDriver = drv => {
    setSelectedDriver(drv);
  };

  // Puntos en LatLng
  const B = locationB ? toLatLng(locationB) : null;
  const C = locationC ? toLatLng(locationC) : null;
  const A = selectedDriver ? selectedDriver.D : null;

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/3 p-6 border-r overflow-auto">
        {!showList && (
          <>
            <h2 className="text-2xl font-bold mb-4">Reservar viaje</h2>
            <p><strong>Tu ubicación (B):</strong><br/>{locationB || 'Cargando...'}</p>
            <p className="mt-4">
              <strong>Destino (C):</strong><br/>
              {locationC
                ? locationC
                : 'Haz click en el mapa para elegir tu destino'}
            </p>
            <button
              className="mt-6 w-full bg-black text-white py-2 rounded disabled:opacity-50"
              onClick={handleShowPrecios}
              disabled={!locationC}
            >
              Mostrar precios
            </button>
          </>
        )}

        {showList && (
          <>
            <h2 className="text-2xl font-bold mb-4">Elige conductor</h2>
            <ul className="space-y-2">
              {conductores.map(d => (
                <li key={d.id} className="p-3 border rounded hover:bg-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {d.nombre} {d.apellidos}
                      </p>
                      <p className="text-sm text-gray-600">
                        Precio: {d.price} €
                      </p>
                    </div>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleSelectDriver(d)}
                    >
                      Seleccionar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Mapa */}
      <div className="w-2/3 relative">
        {B && (
          <MapContainer
            center={B}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* 2) click para poner C */}
            {!showList && <ClickHandler setLocationC={setLocationC} />}

            {/* Marker B */}
            <Marker position={B}>
              <Popup>Tu ubicación</Popup>
            </Marker>

            {/* Marker C */}
            {C && (
              <Marker position={C} icon={new L.Icon.Default({ className: 'marker-red' })}>
                <Popup>Destino</Popup>
              </Marker>
            )}

            {/* Marker A y rutas sólo tras seleccionar conductor */}
            {A && (
              <>
                <Marker position={A} icon={new L.Icon.Default({ className: 'marker-green' })}>
                  <Popup>Conductor: {selectedDriver.nombre} {selectedDriver.apellidos}</Popup>
                </Marker>
                <Routing waypoints={[A, B]} profile="foot" />
                {C && <Routing waypoints={[B, C]} profile="car" />}
              </>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
