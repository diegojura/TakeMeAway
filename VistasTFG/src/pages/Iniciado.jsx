// src/pages/Iniciado.jsx
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../services/api'    // Axios baseURL + token
import { useAuth } from '../contexts/AuthContext'

export default function Iniciado() {
  const { user } = useAuth()

  // A) Estados principales
  const [locB, setLocB]           = useState(null)   // Ubicación usuario
  const [locC, setLocC]           = useState(null)   // Destino clickado
  const [drivers, setDrivers]     = useState([])     // Conductores puros
  const [selDriver, setSelDriver] = useState(null)   // Conductor seleccionado
  const [error, setError]         = useState('')     // Mensajes de error
  const [done, setDone]           = useState(false)  // Ya reservado

  // B) Geolocalización inicial
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setLocB([coords.latitude, coords.longitude]),
        ()            => setLocB([37.8882, -4.7794])
      )
    } else {
      setLocB([37.8882, -4.7794])
    }
  }, [])

  // C) Captura click en mapa para fijar C
  function ClickHandler() {
    useMapEvents({
      click(e) {
        setLocC([e.latlng.lat, e.latlng.lng])
        setSelDriver(null)
        setDone(false)
        setError('')
      }
    })
    return null
  }

  // D) Cálculo Haversine (km)
  function haversine([lat1, lon1], [lat2, lon2]) {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI/180
    const dLon = (lon2 - lon1) * Math.PI/180
    const a = Math.sin(dLat/2)**2
            + Math.cos(lat1 * Math.PI/180)
            * Math.cos(lat2 * Math.PI/180)
            * Math.sin(dLon/2)**2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // E) “Mostrar conductores & precios”
  const fetchDrivers = async () => {
    if (!locB || !locC) {
      return setError('Tienes que fijar tu ubicación (B) y destino (C)')
    }
    try {
      const { data } = await api.get('/conductores')
      // data = [{ id, nombre, apellidos, usuario: { email }, lat_inicio, lng_inicio, ... }]
      const withPrice = data.map(c => {
        const d1 = haversine(locB, [c.lat_inicio, c.lng_inicio])
        const d2 = haversine([c.lat_inicio, c.lng_inicio], locC)
        const precio = Math.round((5 + d1*10*0.10 + d2*10*0.10)*100)/100
        return { ...c, precio }
      })
      setDrivers(withPrice)
      setError('')
    } catch (e) {
      console.error(e)
      setError('No se pudieron cargar conductores')
    }
  }

  // F) “Realizar viaje” → envía sólo conductor_id y kilometros
  const handleReservar = async () => {
    if (!selDriver) {
      return setError('Selecciona un conductor primero')
    }
    // calculamos kilómetros reales B→C
    const km = haversine(locB, locC)
    try {
      await api.post('/viajes', {
        conductor_id: selDriver.id,
        kilometros:   Math.round(km*100)/100,   // decimal aceptado
      })
      setDone(true)
      setError('')
      alert('¡Viaje guardado con éxito!')
    } catch (e) {
      console.error(e)
      setError('Error al registrar el viaje')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* — Panel izquierdo — */}
      <div className="w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Reservar viaje</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <p className="mb-2">
          <strong>Tu ubicación (B):</strong>{' '}
          {locB ? `${locB[0].toFixed(6)}, ${locB[1].toFixed(6)}` : 'Cargando…'}
        </p>

        <p className="mb-4">
          <strong>Destino (C):</strong>{' '}
          {locC ? `${locC[0].toFixed(6)}, ${locC[1].toFixed(6)}` : 'Haz click en el mapa'}
        </p>

        <button
          onClick={fetchDrivers}
          className="w-full bg-black text-white py-2 rounded mb-4"
        >
          Mostrar conductores & precios
        </button>

        {/* Lista de conductores con precio */}
        {!done && drivers.map(d => (
          <div
            key={d.id}
            className={`border rounded p-3 mb-3 flex justify-between items-center ${
              selDriver?.id === d.id ? 'bg-gray-100' : ''
            }`}
          >
            <div>
              <p className="font-medium">{d.nombre} {d.apellidos}</p>
              <p>Precio: {d.precio} €</p>
            </div>
            <button
              onClick={() => setSelDriver(d)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Seleccionar
            </button>
          </div>
        ))}

        {/* Botón “Confirmar viaje” */}
        {!done && selDriver && (
          <button
            onClick={handleReservar}
            className="w-full bg-black text-white py-2 rounded mt-4"
          >
            Realizar viaje
          </button>
        )}
      </div>

      {/* — Mapa — */}
      <div className="flex-1">
        {locB && (
          <MapContainer
            center={locB}
            zoom={13}
            style={{ width: '100%', height: '100vh' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OSM contributors"
            />
            {/* Marcador Usuario */}
            <Marker
              position={locB}
              icon={L.icon({ iconUrl: '/marker-icon.png' })}
            />
            {/* Marcador Destino */}
            {locC && (
              <Marker
                position={locC}
                icon={L.icon({ iconUrl: '/marker-icon-red.png' })}
              />
            )}
            {/* Solo ruta si ya reservado */}
            {done && selDriver && (
              <>
                {/* del conductor a B (a pie) */}
                <Routing
                  waypoints={[
                    [selDriver.lat_inicio, selDriver.lng_inicio],
                    locB
                  ]}
                  profile="foot"
                />
                {/* de B a C (coche) */}
                <Routing
                  waypoints={[locB, locC]}
                  profile="car"
                />
              </>
            )}
            <ClickHandler/>
          </MapContainer>
        )}
      </div>
    </div>
  )
}

// Helper de Routing
function Routing({ waypoints, profile }) {
  const map = useMapEvents({})
  useEffect(() => {
    if (!map) return
    const ctl = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile
      }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false
    }).addTo(map)
    return () => map.removeControl(ctl)
  }, [map, waypoints, profile])
  return null
}
