import React from 'react';

export default function Perfil() {
  // Simulación de datos del usuario (pueden venir de props, context, API, etc.)
  const usuario = {
    nombre: "Carlos Pérez",
    correo: "carlos@example.com",
    viajesRealizados: 12,
    pagosRealizados: "325€",
    miembroDesde: "enero 2024",
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 font-sans flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-gray-700 font-semibold">Nombre:</h2>
            <p>{usuario.nombre}</p>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold">Correo electrónico:</h2>
            <p>{usuario.correo}</p>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold">Miembro desde:</h2>
            <p>{usuario.miembroDesde}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-600">Viajes realizados</h3>
              <p className="text-2xl font-bold">{usuario.viajesRealizados}</p>
            </div>

            <div className="bg-gray-100 rounded-md p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-600">Pagos realizados</h3>
              <p className="text-2xl font-bold">{usuario.pagosRealizados}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
