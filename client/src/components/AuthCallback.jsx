import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // 1. Set the token and user state
      login(token); 

      // 2. Force a full browser reload to the home page
      // This is a more forceful redirect that solves the timing issue.
      window.location.href = '/';

    } else {
      // If there's no token, go back to the login page
      navigate('/login');
    }
    
  // We remove navigate from the dependency array as it's no longer the primary method
  }, [login, location]); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Finalizing login...</p>
        <p className="text-sm text-gray-500">Redirecting you shortly.</p>
      </div>
    </div>
  );
};

export default AuthCallback;