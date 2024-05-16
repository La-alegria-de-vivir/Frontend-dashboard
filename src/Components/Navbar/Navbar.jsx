import React, { useState } from 'react';
import logo from '../../../public/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Lógica para determinar si el usuario está autenticado...
  const isAuthenticated = true; // Reemplaza esto con tu lógica real

  // Función para manejar el clic en el logo
  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard?tab=profile');
    } else {
      navigate('/');
    }
  };

  // Función para manejar el clic en el enlace de "Inicio"
  const handleInicioClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard?tab=profile');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-white text-black">
      <section className="relative mx-auto">
        {/* Navbar */}
        <nav className="flex justify-between">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            {/* Logo */}
            <a className="text-3xl font-bold font-heading" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
  <img
    src={logo}
    style={{ width: '50px', height: 'auto' }} // Establece el ancho deseado y deja que la altura se ajuste automáticamente
    className=""
    alt="Logo"
  />
</a>

            {/* Menu Hamburguesa */}
            <button
              className="md:hidden text-xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
            {/* Nav Links */}
            <ul className={`${menuOpen ? 'flex flex-col w-screen items-center space-y-4' : 'hidden'} md:hidden`}>
              <li><a className="hover:text-[#BBBC4E] cursor-pointer" onClick={handleInicioClick}>Inicio</a></li>
              <li><Link className="hover:text-[#BBBC4E]" to="/alergenos">Alérgenos</Link></li>
              <li><Link className="hover:text-[#BBBC4E]" to="/reservations">Reservaa</Link></li>
              <li><Link className="hover:text-[#BBBC4E]" to="/create-menu">Menú</Link></li>
              <li><Link className="hover:text-[#BBBC4E]" to="#">Contacto</Link></li>
            </ul>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li><a className="hover:text-[#BBBC4E] cursor-pointer" onClick={handleInicioClick}>Inicio</a></li>
              <li><Link className="hover:text-[#BBBC4E]" to="/alergenos">Alérgenos</Link></li>
              <li><Link className="hover:text-[#BBBC4E]" to="/reservations">Reservas</Link></li>
              <li><Link className="hover:text-[#BBBC4E]" to="/create-menu">Menú</Link></li>
              <li><Link className="hover:text-[#BBBC4E]" to="#">Contacto</Link></li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
}

export default Navbar;
