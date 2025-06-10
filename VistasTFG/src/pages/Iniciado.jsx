// src/pages/Iniciado.jsx
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import api from '../services/api'    // Axios baseURL + token
import { useAuth } from '../contexts/AuthContext'

// Paleta para diferenciar cada ubicación de conductor
const COLORS = [
  '#e6194B',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#42d4f4',
  '#bfef45'
]

export default function Iniciado() {
  const { user } = useAuth()

  // A) Estados principales
  const [locB, setLocB]           = useState(null)   // Ubicación usuario
  const [locC, setLocC]           = useState(null)   // Destino clickado
  const [drivers, setDrivers]     = useState([])     // Conductores con precio y color
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
      const withPrice = data.map((c, i) => {
        const d1 = haversine(locB, [c.lat_inicio, c.lng_inicio])
        const d2 = haversine([c.lat_inicio, c.lng_inicio], locC)
        const precio = Math.round((5 + d1*10*0.10 + d2*10*0.10)*100)/100
        const color = COLORS[i % COLORS.length]
        return { ...c, precio, color }
      })
      setDrivers(withPrice)
      setError('')
    } catch (e) {
      console.error(e)
      setError('No se pudieron cargar conductores')
    }
  }

    // F) “Realizar viaje” → envía datos completos del viaje
  const handleReservar = async () => {
    if (!selDriver) {
      return setError('Selecciona un conductor primero')
    }
    // calculamos kilómetros reales B→C
    const km = haversine(locB, locC)
    try {
      await api.post('/viajes', {
        conductor_id: selDriver.id,
        lat_inicio:   locB[0],
        lng_inicio:   locB[1],
        lat_fin:      locC[0],
        lng_fin:      locC[1],
        precio:       selDriver.precio,
        // el backend calcula los kilómetros reales
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

        {/* Lista de conductores con precio y color */}
        {!done && drivers.map(d => (
          <div
            key={d.id}
            className={`border rounded p-3 mb-3 flex justify-between items-center ${
              selDriver?.id === d.id ? 'bg-gray-100' : ''
            }`}
          >
            <div>
              <p className="font-medium flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ background: d.color }}
                />
                {d.nombre} {d.apellidos}
              </p>
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
      <div className="flex-1 flex items-center justify-center p-6">
        {locB && (
          <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={locB}
              zoom={13}
              style={{ width: '100%', height: '100%' }}
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
           
            {/* Marcadores de conductores */}
            {drivers.map(d => (
              <Marker
                key={`m-${d.id}`}
                position={[d.lat_inicio, d.lng_inicio]}
                icon={L.divIcon({
                  className: '',
                  html: `<div style="background:${d.color};width:16px;height:16px;border-radius:50%;border:2px solid white"></div>`
                })}
              />
            ))}

            {/* Rutas de todos los conductores */}
            {locB && locC && drivers.map(d => (
              <Routing
                key={`r-${d.id}`}
                waypoints={[
                  [d.lat_inicio, d.lng_inicio],
                  locB,
                  locC
                ]}
                profile="car"
                color={d.color}
              />
            ))}

            <ClickHandler/>
          </MapContainer>
           </div>
        )}
      </div>
    </div>
  )
}

// Helper de Routing
function Routing({ waypoints, profile, color }) {
  const map = useMapEvents({})
  useEffect(() => {
    if (!map) return
    const ctl = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile
      }),
      lineOptions: { styles: [{ color, weight: 4 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false
    }).addTo(map)
    return () => map.removeControl(ctl)
  }, [map, waypoints, profile, color])
  return null
}
