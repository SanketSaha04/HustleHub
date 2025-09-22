import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // <-- Add this line

    useEffect(() => {
        if (authToken) {
            try {
                const decodedUser = jwtDecode(authToken);
                if (decodedUser.exp * 1000 > Date.now()) {
                    setUser(decodedUser);
                } else {
                    localStorage.removeItem('authToken');
                    setAuthToken(null);
                    setUser(null);
                }
            } catch (e) {
                localStorage.removeItem('authToken');
                setAuthToken(null);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setIsLoading(false);
    }, [authToken]);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        try {
            const decodedUser = jwtDecode(token);
            setAuthToken(token);
            setUser(decodedUser);
            navigate('/'); // <-- This line will redirect the user
        } catch (e) {
            console.error("Failed to decode token on login", e);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ authToken, user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};