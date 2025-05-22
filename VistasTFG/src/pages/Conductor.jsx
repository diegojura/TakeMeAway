import React from 'react';

const renderStars = count =>
  Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={i < count ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}
    >
      ★
    </span>
  ));

export default function Conductores() {
  const conductores = [
    { nombre: "Luis", apellido: "García", estrellas: 3, viajes: 120 },
    // … otros conductores …
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-6">Nuestros Conductores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {conductores.map((c, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-gray-300 rounded-md mb-4" />
            <h2 className="text-lg font-semibold">{c.nombre}</h2>
            <h3 className="text-gray-600">{c.apellido}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Viajes: <strong>{c.viajes}</strong>
            </p>
            <div className="flex gap-1 mt-3">{renderStars(c.estrellas)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
