import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileIcon = () => {
    const { authToken, user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // THIS IS THE MOST IMPORTANT LOG
    console.log('%cProfileIcon rendering. User object is:', 'color: red; font-weight: bold;', user);

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            {authToken && user ? (
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center text-xl font-bold border-2 border-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {getInitials(user.name)}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-1">
                            <div className="px-4 py-3 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>

                            {user.resumePath && (
                                <a
                                    href={`http://localhost:5000${user.resumePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                                >
                                    My Resume
                                </a>
                            )}

                            <Link
                                to="/upload-resume"
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                            >
                                Update Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Login / Sign Up
                </button>
            )}
        </div>
    );
};

export default ProfileIcon;