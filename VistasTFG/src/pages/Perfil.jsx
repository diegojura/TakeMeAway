"use client"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useEffect, useState } from "react"
import api from "../services/api.js"

export default function Perfil() {
  const { user } = useAuth()
  const [viajesCount, setViajesCount] = useState(null)
  const [ultimoViaje, setUltimoViaje] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    api.get(`/viajes?usuario_id=${user.id}`)
      .then(res => {
        const viajes = res.data
        setViajesCount(viajes.length)

        if (viajes.length > 0) {
          // Ordenar por fecha descendente y tomar el más reciente
          const viajeMasReciente = viajes.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
          )[0]
          setUltimoViaje(viajeMasReciente.created_at)
        }
      })
      .catch(() => {
        setViajesCount(0)
        setUltimoViaje(null)
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
    
  if (!user) return <p className="p-8">No se ha podido cargar el perfil. Por favor, inicia sesión.</p>

  return (
    <div className="p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Perfil de {user.name}</h1>
          <p className="text-gray-600">Información de tu cuenta</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Email */}
          <div className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="text-lg font-semibold text-black">{user.email}</p>
              </div>
            </div>
          </div>

          {/* ID */}
          <div className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0V5a2 2 0 014 0v1" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">ID de Usuario</p>
                <p className="text-lg font-semibold text-black">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Viajes */}
          <div className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Viajes Realizados</p>
                <p className="text-2xl font-bold text-black">{viajesCount ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-gray-50 rounded-lg p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Miembro desde</p>
              <p className="text-lg font-semibold text-black">
                {new Date(user.created_at).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Último viaje</p>
              <p className="text-lg font-semibold text-black">
                {ultimoViaje
                  ? new Date(ultimoViaje).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Sin viajes"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}