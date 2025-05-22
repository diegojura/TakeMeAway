// src/pages/Booking.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import api from '../services/api.js';   // axios con baseURL y token en headers
import { useAuth } from '../contexts/AuthContext.jsx';

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

export default function Booking() {
  const { user } = useAuth();

  const [locB, setLocB] = useState(null);
  const [locC, setLocC] = useState(null);

  const [drivers, setDrivers]             = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [bookingDone, setBookingDone]     = useState(false);
  const [error, setError]                 = useState('');

  // 1) geolocalización B
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setLocB([coords.latitude, coords.longitude]),
        () => setLocB([37.8882, -4.7794])
      );
    } else {
      setLocB([37.8882, -4.7794]);
    }
  }, []);

  // 2) click en mapa para fijar C
  function ClickHandler() {
    useMap().on('click', e => {
      setLocC([e.latlng.lat, e.latlng.lng]);
    });
    return null;
  }

  // 3) calcular precios
  const handleMostrarPrecios = async () => {
    if (!locB || !locC) return;
    try {
      const { data } = await api.post('/calcular-precios', {
        latB: locB[0],
        lngB: locB[1],
        latC: locC[0],
        lngC: locC[1],
      });
      setDrivers(data);
      setSelectedDriver(null);
      setBookingDone(false);
      setError('');
    } catch (e) {
      console.error(e);
      setError('No se pudieron calcular precios');
    }
  };

  // 4) realizar viaje: POST /api/viajes + disparar mail en servidor
  const handleRealizarViaje = async () => {
    if (!selectedDriver) {
      setError('Selecciona primero un conductor');
      return;
    }
    try {
      await api.post('/viajes', {
        conductor_id: selectedDriver.id,
        lat_inicio:   locB[0],
        lng_inicio:   locB[1],
        lat_fin:      locC[0],
        lng_fin:      locC[1],
        precio:       selectedDriver.precio,
      });
      setBookingDone(true);
      setError('');
      // tras esto, el backend habrá enviado el correo reales
      alert('¡Viaje registrado y correo enviado!');
    } catch (e) {
      console.error(e);
      setError('Error al registrar viaje');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 p-6">
        <h2 className="text-xl font-bold mb-4">Reservar viaje</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <p className="mb-2">
          <strong>Tu ubicación (B):</strong>{' '}
          {locB ? `${locB[0].toFixed(6)}, ${locB[1].toFixed(6)}` : 'Cargando…'}
        </p>

        <p className="mb-2">
          <strong>Destino (C):</strong>{' '}
          {locC ? `${locC[0].toFixed(6)}, ${locC[1].toFixed(6)}` : 'Haz click en el mapa'}
        </p>

        <button
          onClick={handleMostrarPrecios}
          className="w-full bg-black text-white py-2 rounded mb-4"
        >
          Mostrar precios
        </button>

        {/* Lista de conductores */}
        {!bookingDone && drivers.map(d => (
          <div
            key={d.id}
            className={`border rounded p-3 mb-3 flex justify-between items-center ${
              selectedDriver?.id === d.id ? 'bg-gray-100' : ''
            }`}
          >
            <div>
              <p className="font-medium">
                {d.nombre} {d.apellidos}
              </p>
              <p>Precio: {d.precio} €</p>
            </div>
            <button
              onClick={() => setSelectedDriver(d)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Seleccionar
            </button>
          </div>
        ))}

        {/* Botón realizar viaje */}
        {!bookingDone && selectedDriver && (
          <button
            onClick={handleRealizarViaje}
            className="w-full bg-black text-white py-2 rounded mt-4"
          >
            Realizar viaje
          </button>
        )}
      </div>

      {/* Mapa */}
      <div className="flex-1">
        {locB && (
          <MapContainer
            center={locB}
            zoom={13}
            style={{ width: '100%', height: '100vh' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* Marcador cliente */}
            <Marker
              position={locB}
              icon={L.icon({ iconUrl: '/marker-icon.png' })}
            />

            {/* Marcador destino */}
            {locC && (
              <Marker
                position={locC}
                icon={L.icon({ iconUrl: '/marker-icon-red.png' })}
              />
            )}

            {/* Solo el conductor seleccionado */}
            {bookingDone && selectedDriver && (
              <Marker
                position={[selectedDriver.lat_inicio, selectedDriver.lng_inicio]}
                icon={L.icon({ iconUrl: '/marker-icon-black.png' })}
              />
            )}

            {/* Rutas: cliente→conductor→destino */}
            {bookingDone && selectedDriver && (
              <>
                <Routing
                  waypoints={[
                    [selectedDriver.lat_inicio, selectedDriver.lng_inicio],
                    locB,
                  ]}
                  profile="foot"
                />
                <Routing
                  waypoints={[
                    locB,
                    locC,
                  ]}
                  profile="car"
                />
              </>
            )}

            {/* Click para fijar destino */}
            <ClickHandler />
          </MapContainer>
        )}
      </div>
    </div>
  );
}
