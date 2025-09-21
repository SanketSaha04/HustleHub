import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure useAuth is imported

const Login = () => {
    const { login } = useAuth(); // Get the login function from your context
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState(location.state?.formType || "login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (authError) setAuthError(null);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (state === "register" && !formData.name.trim()) newErrors.name = "Name is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- THIS FUNCTION IS NOW FIXED ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setAuthError(null);

        const endpoint = state === 'login' ? 'login' : 'register';
        const url = `http://localhost:5000/auth/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // This will now be called for both login AND successful sign-up
                login(data.token); 
            } else {
                setAuthError(data.message || "Authentication failed");
            }
        } catch (error) {
            setAuthError("An error occurred. Please try again.");
            console.error("Auth error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const toggleFormType = () => {
        setState(prev => prev === "login" ? "register" : "login");
        setErrors({});
        setAuthError(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-md p-8 rounded-xl shadow-lg bg-white border border-gray-100"
            >
                <h2 className="text-3xl font-bold text-center mb-4">
                    <span className="text-indigo-600">User</span> {state === "login" ? "Login" : "Sign Up"}
                </h2>
                
                {authError && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">{authError}</p>}

                {state === "register" && (
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            type="text"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                )}

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        type="email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full p-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        type="password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium mt-2 transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? "Processing..." : (state === "register" ? "Create Account" : "Login")}
                </button>
                
                <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <a 
                    href="http://localhost:5000/auth/google"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5" />
                    Continue with Google
                </a>

                <p className="text-center text-sm text-gray-600 mt-2">
                    {state === "register" 
                        ? "Already have an account? "
                        : "Don't have an account? "}
                    <button
                        type="button"
                        onClick={toggleFormType}
                        className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
                    >
                        {state === "register" ? "Login" : "Sign Up"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;