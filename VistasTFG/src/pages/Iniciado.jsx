// src/pages/Iniciado.jsx
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import api from '../services/api'
import { useAuth } from '../contexts/AuthContext'

export default function Iniciado() {
  const { user } = useAuth()

  // Estados
  const [locB, setLocB] = useState(null)
  const [locC, setLocC] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [selDriver, setSelDriver] = useState(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // Geolocalización inicial
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setLocB([coords.latitude, coords.longitude]),
        () => setLocB([37.8882, -4.7794])
      )
    } else {
      setLocB([37.8882, -4.7794])
    }
  }, [])

  // Captura click en mapa
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

  // Cálculo Haversine (km)
  function haversine([lat1, lon1], [lat2, lon2]) {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI/180
    const dLon = (lon2 - lon1) * Math.PI/180
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1 * Math.PI/180) *
              Math.cos(lat2 * Math.PI/180) *
              Math.sin(dLon/2)**2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Obtener conductores
  const fetchDrivers = async () => {
    if (!locB || !locC) {
      return setError('Tienes que fijar tu ubicación (B) y destino (C)')
    }
    try {
      const { data } = await api.get('/conductores')
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

  // Reservar viaje
  const handleReservar = async () => {
    if (!selDriver) {
      return setError('Selecciona un conductor primero')
    }
    try {
      await api.post('/viajes', {
        conductor_id: selDriver.id,
        lat_inicio: locB[0],
        lng_inicio: locB[1],
        lat_fin: locC[0],
        lng_fin: locC[1],
        precio: selDriver.precio,
      })
      setDone(true)
      setError('')
      alert('¡Viaje reservado con éxito!')
    } catch (e) {
      console.error(e)
      setError('Error al registrar el viaje')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panel izquierdo */}
      <div className="w-2/5 p-8 bg-white shadow-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reservar viaje</h2>
          <p className="text-gray-600">Hola, {user?.email}</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="mb-2">
            <span className="font-semibold text-blue-800">Tu ubicación (B):</span>{' '}
            <span className="text-blue-600">
              {locB ? `${locB[0].toFixed(6)}, ${locB[1].toFixed(6)}` : 'Cargando...'}
            </span>
          </p>

          <p>
            <span className="font-semibold text-blue-800">Destino (C):</span>{' '}
            <span className="text-blue-600">
              {locC ? `${locC[0].toFixed(6)}, ${locC[1].toFixed(6)}` : 'Haz click en el mapa'}
            </span>
          </p>
        </div>

        <button
          onClick={fetchDrivers}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mb-6 transition duration-200 shadow-md"
        >
          Mostrar conductores y precios
        </button>

        {/* Lista de conductores */}
        <div className="space-y-4 mb-6">
          {!done && drivers.map(d => (
            <div
              key={d.id}
              className={`border rounded-lg p-4 flex justify-between items-center transition-all ${
                selDriver?.id === d.id 
                  ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                  : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">{d.nombre} {d.apellidos}</p>
                <p className="text-gray-600">Precio: <span className="font-bold text-indigo-600">{d.precio} €</span></p>
              </div>
              <button
                onClick={() => setSelDriver(d)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>

        {/* Botón de confirmación */}
        {!done && selDriver && (
          <button
            onClick={handleReservar}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-4 transition duration-200 shadow-md"
          >
            Confirmar viaje con {selDriver.nombre}
          </button>
        )}

        {done && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p>¡Viaje reservado con éxito!</p>
          </div>
        )}
      </div>

      {/* Mapa (más pequeño) */}
      <div className="flex-1 p-4 sticky top-0 h-screen">
        <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200 h-full">
          {locB && (
            <MapContainer
              center={locB}
              zoom={13}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={locB}
                icon={L.icon({ 
                  iconUrl: '/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })}
              />
              {locC && (
                <Marker
                  position={locC}
                  icon={L.icon({ 
                    iconUrl: '/marker-icon-red.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                  })}
                />
              )}
              {done && selDriver && (
                <>
                  <Routing
                    waypoints={[
                      [selDriver.lat_inicio, selDriver.lng_inicio],
                      locB
                    ]}
                    profile="foot"
                  />
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
    </div>
  )
}

// Componente de Routing
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
      showAlternatives: false,
      lineOptions: {
        styles: [{ 
          color: profile === 'foot' ? '#3b82f6' : '#10b981', 
          weight: 5 
        }]
      }
    }).addTo(map)
    return () => map.removeControl(ctl)
  }, [map, waypoints, profile])
  return null
}