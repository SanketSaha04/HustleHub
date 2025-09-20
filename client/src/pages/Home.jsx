import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from "../assets/components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = Math.round((clientX / window.innerWidth) * 100);
      const y = Math.round((clientY / window.innerHeight) * 100);
      setGradientPos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [notificationCount, setNotificationCount] = useState(1);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.state?.loggedIn) {
      setIsLoggedIn(true);
    }
  }, [location.state]);

  // Function to handle navigation with login check
  const handleNavigate = (path, requiresLogin = false) => {
    if (requiresLogin && !isLoggedIn) {
      navigate('/login', { 
        state: { 
          formType: 'login',
          message: 'Please log in to access this feature',
          redirectTo: path
        } 
      });
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Left: Logo and Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1 text-xl font-bold">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">↗</div>
            <span className="text-blue-700">Hustle</span>
            <span className="text-orange-500">Hub</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-gray-700 text-sm font-medium">
            <Link to="/prepare" className="hover:text-blue-600">Prepare</Link>
            <Link to="/participate" className="hover:text-blue-600">Participate</Link>
            <Link to="/oppurtunities" className="hover:text-blue-600">Oppurtunities</Link>
          </div>
        </div>
        
        {/* Right: Conditional Content */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <button 
              onClick={() => navigate('/login', { state: { formType: 'register' } })} 
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              Sign Up
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
              <div className="relative flex items-center px-4 py-2 bg-gray-100 rounded-full cursor-pointer">
                <span className="text-sm mr-2">☰</span>
                <span className="text-gray-700">👤</span>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Animated Gradient Hero Section */}
      <section 
        className="py-20 text-white text-center relative overflow-hidden" 
        style={{ 
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(79, 70, 229, 0.95) 0%, rgba(129, 140, 248, 0.9) 100%)` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-600/30 to-purple-600/30 animate-gradient-shift"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">Dream Gig</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Connecting talented people with the best freelance opportunities
          </p>
          
          {/* Enhanced Job Search Bar */}
          <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl animate-fade-in-up delay-200">
            <div className="flex">
              <input 
                className="flex-1 px-6 py-4 text-gray-900 outline-none bg-white/90 focus:bg-white transition-all duration-300" 
                placeholder="Job title, keywords, or company" 
                type="text" 
              />
              <button 
                className="bg-gradient-to-r from-amber-400 to-amber-500 px-8 text-white font-semibold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/oppurtunities')}
              >
                Search Opportunities
              </button>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <button 
              onClick={() => handleNavigate('/resume-upload', true)} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-102"
            >
              Upload Resume
            </button>
            <button 
              onClick={() => handleNavigate('/post-gig', true)} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-102"
            >
              Post a Gig Opportunity
            </button>
          </div>
        </div>
      </section>

      {/* Popular Categories with Hover Effects */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 relative">
            Popular Freelance Categories
            <span 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full" 
              style={{ background: 'linear-gradient(to right, rgba(79, 70, 229, 0.8), rgba(129, 140, 248, 0.8))' }}
            ></span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            <CategoryCard icon="💻" label="Technology" color="from-indigo-400 to-indigo-600" bgColor="bg-indigo-50" />
            <CategoryCard icon="🩺" label="Healthcare" color="from-blue-400 to-blue-600" bgColor="bg-blue-50" />
            <CategoryCard icon="📊" label="Finance" color="from-purple-400 to-purple-600" bgColor="bg-purple-50" />
            <CategoryCard icon="🎨" label="Design" color="from-fuchsia-400 to-fuchsia-600" bgColor="bg-fuchsia-50" />
            <CategoryCard icon="📚" label="Education" color="from-amber-400 to-amber-600" bgColor="bg-amber-50" />
            <CategoryCard icon="⚙️" label="Engineering" color="from-cyan-400 to-cyan-600" bgColor="bg-cyan-50" />
          </div>
        </div>
      </section>

      {/* Employer/Candidate Info with Gradient Borders */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* For Employers */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-8 shadow-xl h-full">
                <h3 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  For Employers
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  Find the best talent effortlessly. Post gigs, manage applications, and hire faster with our smart recruitment tools designed for the modern workforce.
                </p>
                <button 
                  onClick={() => handleNavigate('/post-gig', true)} 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Post a Gig
                </button>
              </div>
            </div>

            {/* For Candidates */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-8 shadow-xl h-full">
                <h3 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  For Gig Seekers
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  Explore thousands of gigs, create your profile and get personalized recommendations. We match you with opportunities that fit your skills and goals.
                </p>
                <button 
                  onClick={() => handleNavigate('/resume-upload', true)} 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Upload Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional CTA/Footer Section */}
      <div className="mt-auto">
        {!isLoggedIn ? (
          <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
              <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
                Join thousands of professionals finding their perfect gig opportunities every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate("/login", { state: { formType: "register" } })} 
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up Free
                </button>
                <button className="bg-transparent border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        ) : (
          <Footer className="mt-auto" />
        )}
      </div>
    </div>
  );
}

// Enhanced Category Card with Gradient Background
function CategoryCard({ icon, label, color, bgColor }) {
  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${bgColor}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative flex flex-col items-center justify-center p-8 group-hover:bg-transparent transition-all duration-300 h-full">
        <div className="text-5xl mb-4 group-hover:text-white transition-colors duration-300">{icon}</div>
        <span className="font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">{label}</span>
      </div>
    </div>
  );
}