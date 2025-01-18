import React, { useState, useRef, useCallback, useEffect } from "react";

const NavLink = ({ href, icon, children }) => (
  <a
    href={href}
    className="flex items-center p-2 rounded transition duration-300 hover:bg-gray-200 hover:scale-105"
  >
    {icon}
    {children}
  </a>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <header className="relative z-50 bg-gray-800 text-gray-100">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-600 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-600 rounded-full blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

      {/* Navigation */}
      <nav className="relative max-w-7xl mx-auto flex items-center justify-end space-x-12 p-8">
        <NavLink
          href="#"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
              />
            </svg>
          }
        >
          Home
        </NavLink>
        <NavLink
          href="#"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A2 2 0 013 15.382V8.618a2 2 0 011.553-1.894L9 4m6 0l5.447 2.724A2 2 0 0121 8.618v6.764a2 2 0 01-1.553 1.894L15 20m-6 0v-6m6 6v-6m-6 0h6"
              />
            </svg>
          }
        >
          Destination
        </NavLink>
        <NavLink
          href="#"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
              />
            </svg>
          }
        >
          About
        </NavLink>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center p-2 rounded transition duration-300 hover:bg-gray-700 hover:scale-105"
            aria-expanded={isDropdownOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A9 9 0 1117.804 5.121M12 7v5l3 3"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              {isLoggedIn ? (
                <>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign In
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;