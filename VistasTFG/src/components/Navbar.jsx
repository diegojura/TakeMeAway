import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "/media/logo2blanco.png";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "Viaje", path: "/viajes" },
    { name: "Conductor", path: "/conductor" },
  ];

  const linkClass =
    "text-lg font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70";
  const activeLinkClass =
    "text-lg font-medium text-[#FFA726] hover:text-[#FFA726] transition-all duration-200 lg:text-base";

  return (
    <header className="sticky top-0 bg-black z-50">
      <div className="px-4 mx-auto max-w-7xl text-lg">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo y título */}
          <Link to="/">
            <div className="flex items-center text-white">
              <img className="w-auto h-8 lg:h-10" src={Logo} alt="Logo" />
              <span className="ml-2 mt-1 font-bold">TakeMeAway</span>
            </div>
          </Link>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            <ul className="flex items-center space-x-10">
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? activeLinkClass : linkClass
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Botones de autenticación */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {!user ? (
              <>
                <Link to="/login">
                  <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-200 shadow-sm">
                    Iniciar Sesión
                  </button>
                </Link>
                <Link to="/registro">
                  <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-200 shadow-sm">
                    Registrarse
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/perfil">
                  <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-200 shadow-sm">
                    <img src={Logo} alt="Perfil" className="w-5 h-5" />
                    {user.name}
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition duration-200 shadow-sm"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
