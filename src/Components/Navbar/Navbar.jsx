import React, { useState, useEffect } from 'react';
import HeroSection from '../Hero/HeroSection';
import Dashboard from '../DashBoard/Dashboard';
import Do from '../Do/Do';
import FAQ from '../FQA/Fqa';
import TestimonialSection from '../TestimonialSection/TestimonialSection';
import Footer from '../Footer/Footer';
import ContactForm from '../../Components/ContactFrom/contactFrom'
import Login from '../Auth/Login';
import { isAuthenticated, logout } from '../../lib/auth';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white/50 backdrop-blur-sm'}`}>
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2 z-60">
            <a href="#" className="flex-shrink-0">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-8 md:h-10 lg:h-12 transition-all duration-300"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-12 text-gray-700">
            <a
              href="#"
              className="font-semibold text-base lg:text-xl hover:text-blue-500 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </a>
            <a
              href="https://dashboard.kutmasterz.com/"
              className="font-semibold text-base lg:text-xl hover:text-blue-500 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              Dashboard
            </a>
            <a
              href="#FAQ"
              className="font-semibold text-base lg:text-xl hover:text-blue-500 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="font-semibold text-base lg:text-xl hover:text-blue-500 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Log In Button */}
          <div className="hidden md:flex items-center">
                        {
              isAuthenticated() ? (
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-inner group"
                  onClick={() => {
                    // Add your logout function here
                    logout();
                  }}
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              ) : (
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-inner group"
                  onClick={() => {
                    setLoginOpen(true);
                  }}
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Log In
                </button>
              )
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none z-60 relative w-8 h-8"
              aria-label="Toggle menu"
            >
              <span className={`bg-gray-700 absolute left-0 w-full h-0.5 rounded transition-all duration-300 ${menuOpen ? 'top-3 rotate-45' : 'top-2'}`}></span>
              <span className={`bg-gray-700 absolute left-0 top-4 w-full h-0.5 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-700 absolute left-0 w-full h-0.5 rounded transition-all duration-300 ${menuOpen ? 'top-3 -rotate-45' : 'top-6'}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black transition-opacity duration-300 h-screen z-40 ${menuOpen ? 'opacity-50 pointer-events-auto ' : 'opacity-0 pointer-events-none'}`}
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu - Full Height */}
        <div className={`md:hidden fixed top-0 right-0 w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 h-screen ease-in-out ${menuOpen ? 'translate-x-0 ' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
            <nav className="flex flex-col space-y-6 text-gray-700 flex-grow">
              <a
                href="#"
                className="font-semibold text-lg py-2 border-b border-gray-100 hover:text-blue-500 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="https://dashboard.kutmasterz.com/"
                className="font-semibold text-lg py-2 border-b border-gray-100 hover:text-blue-500 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </a>
              <a
                href="#FAQ"
                className="font-semibold text-lg py-2 border-b border-gray-100 hover:text-blue-500 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="font-semibold text-lg py-2 border-b border-gray-100 hover:text-blue-500 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </nav>

            {
              console.log(isAuthenticated())
            }

            {
              isAuthenticated() ? (
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-inner group"
                  onClick={() => {
                    setMenuOpen(false);
                    // Add your logout function here
                    logout();
                  }}
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              ) : (
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-inner group"
                  onClick={() => {
                    setMenuOpen(false);
                    setLoginOpen(true);
                  }}
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Log In
                </button>
              )
            }
          </div>
        </div>
      </div>

      {/* Login Modal Overlay */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={closeLogin}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold transition-colors duration-200"
              aria-label="Close login"
            >
              ×
            </button>

            {/* Login Form Component */}
            <div className="mt-2">
              <Login closeLogin={closeLogin} />
            </div>
          </div>
        </div>
      )}

      {/* Main content with proper spacing for fixed navbar */}
      <div className=" overflow-hidden overflow-y-auto">
        <HeroSection />
        <Dashboard />
        <Do />
        <FAQ />
        <TestimonialSection />
        <ContactForm />
        <Footer />
      </div>

      {/* Add these animations to your CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;