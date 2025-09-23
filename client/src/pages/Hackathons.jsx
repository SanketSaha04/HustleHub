import React, { useState, useEffect } from "react";
import { Zap, Calendar, ExternalLink, AlertCircle, Clock } from "lucide-react";

export default function Hackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch('/api/hackathons');
        if (!res.ok) {
          throw new Error('Failed to fetch hackathons');
        }
        const data = await res.json();
        setHackathons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-500 bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div>
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6">
            <Zap size={40} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            Upcoming Hackathons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore exciting upcoming hackathons and coding events from around the web.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {hackathons.length > 0 ? (
            hackathons.map((hack) => (
              <div
                key={hack.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border hover:border-indigo-200"
              >
                <div className="overflow-hidden">
                    <img src={hack.imageUrl} alt={`${hack.title} banner`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full self-start mb-4">
                    {hack.platform}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex-grow">
                    {hack.title}
                  </h3>
                  <div className="text-gray-500 text-sm space-y-2 mb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 flex-shrink-0 text-gray-400" /> 
                      <span className="font-medium text-gray-700">Starts:</span>&nbsp;{hack.startsAt}
                    </div>
                     <div className="flex items-center">
                      <Clock size={16} className="mr-2 flex-shrink-0 text-gray-400" /> 
                      <span className="font-medium text-gray-700">Ends:</span>&nbsp;{hack.endsAt}
                    </div>
                  </div>
                  <a
                    href={hack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                  >
                    View Details
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-2 xl:col-span-3 text-center text-gray-500 py-16">
              <p className="text-lg">No upcoming hackathons found. Please check back later!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}