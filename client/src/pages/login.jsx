import React ,{ useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState(location.state?.formType || "login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        setAuthError(null);
        
        try {
            // Simulate API call
            const response = await mockAuthApi(state, formData);
            
            if (response.success) {
                // Store auth token or user data
                localStorage.setItem('authToken', response.token);
                // Redirect to home or dashboard
                navigate('/', { state: { loggedIn: true } });

            } else {
                setAuthError(response.message || "Authentication failed");
            }
        } catch (error) {
            setAuthError("An error occurred. Please try again.");
            console.error("Auth error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Mock API function
    const mockAuthApi = (action, data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (action === "login") {
                    resolve({
                        success: true,
                        token: "mock-jwt-token",
                        user: { email: data.email }
                    });
                } else {
                    resolve({
                        success: true,
                        token: "mock-jwt-token",
                        user: { ...data }
                    });
                }
            }, 1500);
        });
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
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium mt-2 transition-colors ${
                        loading 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        state === "register" ? "Create Account" : "Login"
                    )}
                </button>

                <p className="text-center text-sm text-gray-600 mt-2">
                    {state === "register" 
                        ? "Already have an account? "
                        : "Don't have an account? "}
                    <button
                        type="button"
                        onClick={() => {
                            setState(state === "login" ? "register" : "login");
                            setErrors({});
                        }}
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