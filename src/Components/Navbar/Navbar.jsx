import React, { useState } from 'react';
import Login from '../Auth/Login'; // Import your Login component

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const closeLogin = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <div className="bg-white/50 backdrop-blur-sm fixed top-0 left-0 w-screen z-50 overflow-x-hidden">
        <div className="flex items-center justify-between gap-2 md:gap-8 lg:gap-48 p-4 max-w-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a href="#" className="flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt=" Logo" 
                className="h-6 md:h-8 lg:h-14" // Smaller on mobile
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center md:space-x-4 lg:space-x-20 text-gray-700 flex-grow justify-center">
            <a
              href="#"
              className="md:font-semibold lg:font-bold text-sm md:text-base lg:text-3xl bg-black bg-clip-text text-transparent hover:underline hover:decoration-sky-400 hover:underline-offset-8 whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="https://dashboard.kutmasterz.com/"
              className="hover:text-gray-900 md:font-semibold lg:font-bold text-sm md:text-base lg:text-3xl hover:underline hover:decoration-sky-400 hover:underline-offset-8 whitespace-nowrap"
            >
              Dashboard
            </a>
            <a
              href="#FAQ"
              className="hover:text-gray-900 md:font-semibold lg:font-bold text-sm md:text-base lg:text-3xl hover:underline hover:decoration-sky-400 hover:underline-offset-8 whitespace-nowrap"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="hover:text-gray-900 md:font-semibold lg:font-bold text-sm md:text-base lg:text-3xl hover:underline hover:decoration-sky-400 hover:underline-offset-8 whitespace-nowrap"
            >
             Contact
            </a>
          </nav>

          {/* Desktop Log In Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <button 
              onClick={() => setLoginOpen(true)}
              className="px-4 lg:px-6 py-1.5 lg:py-3 font-semibold text-sm lg:text-2xl text-black bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] rounded-lg shadow-md hover:from-blue-500 hover:to-cyan-500 whitespace-nowrap"
            >
              Log In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  // X icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-10">
            <nav className="flex flex-col items-center space-y-4 py-4 text-gray-700">
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-600 hover:underline hover:decoration-sky-400 hover:underline-offset-4"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-gray-900 hover:underline hover:decoration-sky-400 hover:underline-offset-4"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </a>
              <a
                href="#"
                className="hover:text-gray-900 hover:underline hover:decoration-sky-400 hover:underline-offset-4"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#"
                className="hover:text-gray-900 hover:underline hover:decoration-sky-400 hover:underline-offset-4"
                onClick={() => setMenuOpen(false)}
              >
                Attendance
              </a>
              <button
                className="w-11/12 px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg shadow-md hover:from-blue-500 hover:to-cyan-500"
                onClick={() => {
                  setMenuOpen(false);
                  setLoginOpen(true);
                }}
              >
                Log In
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Login Modal Overlay */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={closeLogin}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold transition-colors"
              aria-label="Close login"
            >
              ×
            </button>

            {/* Login Form Component */}
            <div className="mt-2">
              <Login />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;