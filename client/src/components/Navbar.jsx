import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { authToken, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    // --- CHANGE IS HERE ---
    // Added "fixed top-0 w-full z-50" to make the navbar sticky
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left: Logo and Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-1 text-xl font-bold">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">↗</div>
          <span className="text-blue-700">Hustle</span>
          <span className="text-orange-500">Hub</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-gray-700 text-sm font-medium">
          <Link to="/prepare" className="hover:text-blue-600">Prepare</Link>
          <Link to="/participate" className="hover:text-blue-600">Participate</Link>
          <Link to="/oppurtunities" className="hover:text-blue-600">Oppurtunities</Link>
        </div>
      </div>
      
      {/* Right: Conditional Content (no changes here) */}
      <div className="flex items-center gap-4">
        {!authToken ? (
          <button 
            onClick={() => navigate('/login', { state: { formType: 'register' } })} 
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up/Login
          </button>
        ) : (
          <>
            <button className="relative">
              <span className="text-gray-600 text-xl">🔔</span>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center text-md font-bold"
              >
                {getInitials(user?.name)}
              </button>
              {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-1 z-20">
                      <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                      >
                          Logout
                      </button>
                  </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}