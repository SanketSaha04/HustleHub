import React from "react";
import { BookOpen, FileText, Briefcase, ArrowRight, Sparkles, Target, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Prepare() {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Sparkles className="text-indigo-400 opacity-70" size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Prepare for Freelance Success
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            HustleHub equips you with the skills, resources, and confidence
            you need to stand out in the freelance world.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">92%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">10K+</div>
              <div className="text-xs text-gray-500">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">4.9</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <FileText className="text-indigo-600" size={28} />,
              title: "Build Your Profile",
              desc: "Learn to craft a compelling freelancer profile that attracts clients and showcases your skills.",
              color: "from-indigo-50 to-indigo-100",
              path: "/profile-create" // Path to ProfileCreate.jsx
            },
            {
              icon: <BookOpen className="text-indigo-600" size={28} />,
              title: "Portfolio Builder",
              desc: "Create a strong portfolio with case studies, templates, and sample projects that clients trust.",
              color: "from-blue-50 to-blue-100",
              path: "/portfolio-builder"
            },
            {
              icon: <Briefcase className="text-indigo-600" size={28} />,
              title: "Interview Prep",
              desc: "Practice with real-world questions and scenarios to ace client interviews confidently.",
              color: "from-violet-50 to-violet-100",
              path: "/interview-prep"
            }
          ].map((card, index) => (
            <div 
              key={index} 
              className="group relative cursor-pointer"
              onClick={() => handleNavigate(card.path)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 blur transition-all duration-300 rounded-2xl"></div>
              <div
                className={`relative bg-gradient-to-br ${card.color} rounded-2xl p-6 h-full border border-white shadow-sm group-hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
                <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore resources <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <div className="relative">
          <div className="absolute -top-10 right-0">
            <Target className="text-indigo-200 opacity-50" size={120} />
          </div>

          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center relative">
            Resources to Get You Started
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                text: "Guide: How to Create a Winning Freelancer Profile →",
                path: "/profile-guide"
              },
              {
                text: "Free Templates: Resumes & Portfolios for Freelancers →",
                path: "/templates"
              },
              {
                text: "Freelance Interview Preparation Toolkit →",
                path: "/interview-toolkit"
              },
              {
                text: "Step-by-Step Roadmap to Kickstart Your Freelance Journey →",
                path: "/roadmap"
              }
            ].map((resource, index) => (
              <li 
                key={index} 
                className="group relative cursor-pointer"
                onClick={() => handleNavigate(resource.path)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
                <div className="relative bg-white p-5 rounded-xl border border-gray-100 group-hover:border-indigo-100 transition-all shadow-sm group-hover:shadow-md">
                  <div className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                    {resource.text}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="mx-auto mb-4" fill="white" size={24} />
            <p className="text-xl italic mb-4">
              "HustleHub's resources helped me triple my freelance income in just 6 months. The interview prep alone was worth it!"
            </p>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-indigo-300 rounded-full mr-3"></div>
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-indigo-200 text-sm">Freelance Designer</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700"
            onClick={() => handleNavigate("/resources")}
          >
            Explore All Resources
          </button>
          <p className="text-gray-600 text-sm mt-4">
            Join 50,000+ freelancers who've accelerated their careers with HustleHub
          </p>
        </div>
      </div>
    </div>
  );
}