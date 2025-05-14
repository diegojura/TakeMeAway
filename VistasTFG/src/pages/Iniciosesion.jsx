import React from 'react';

export default function Iniciosesion() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* Contenido Principal */}
      <div className="flex flex-col lg:flex-row flex-grow">

        {/* Izquierda */}
        <div className="w-full lg:w-1/2 px-6 py-8 lg:p-12 flex flex-col gap-6 justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Bienvenido de nuevo a TAKEMEAWAY
          </h1>
          <p className="text-gray-600">Inicia sesión para continuar viajando con nosotros.</p>
          
          <input
            type="email"
            placeholder="Correo electrónico"
            className="p-3 border rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-3 border rounded-md"
          />
          <button className="bg-black text-white px-4 py-2 rounded-md w-fit">
            Iniciar sesión
          </button>
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta? <a href="/registro" className="text-blue-600 underline">Regístrate</a>
          </p>
        </div>

        {/* Derecha */}
        <div className="w-full lg:w-1/2 bg-black min-h-[200px] sm:min-h-[300px] m-4 lg:m-8 rounded-lg shadow-md" />
      </div>
    </div>
  );
}
