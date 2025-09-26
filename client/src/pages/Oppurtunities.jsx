


import React, { useState, useEffect } from "react";
import { FaLaptopCode, FaPenNib, FaChartLine, FaPalette, FaSearch, FaFilter, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUserTie, FaRocket, FaMedal, FaBriefcase, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const categoryIcons = {
  "Development": <FaLaptopCode className="text-indigo-500 w-6 h-6" />,
  "Web Development": <FaLaptopCode className="text-indigo-500 w-6 h-6" />,
  "Mobile Development": <FaLaptopCode className="text-indigo-500 w-6 h-6" />,
  "Writing": <FaPenNib className="text-indigo-500 w-6 h-6" />,
  "Marketing": <FaChartLine className="text-indigo-500 w-6 h-6" />,
  "Design": <FaPalette className="text-indigo-500 w-6 h-6" />,
  "Data Science": <FaChartLine className="text-indigo-500 w-6 h-6" />,
  "Video Editing": <FaPalette className="text-indigo-500 w-6 h-6" />,
  "Photography": <FaPalette className="text-indigo-500 w-6 h-6" />,
  "Default": <FaBriefcase className="text-indigo-500 w-6 h-6" />
};

const categories = ["All", "Web Development", "Design", "Marketing", "Writing", "Mobile Development", "Data Science", "Video Editing", "Photography"];
const budgetRanges = ["Any", "₹0-₹42,000", "₹42,000-₹1,67,000", "₹1,67,000-₹4,17,000", "₹4,17,000+"];

export default function Opportunities() {
  const { authToken } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("Any");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedGigs, setAppliedGigs] = useState(new Set());

  useEffect(() => {
    const fetchGigsAndContracts = async () => {
      setIsLoading(true);
      try {
        // Fetch all available gigs
        const gigsResponse = await fetch('/api/gigs');
        if (!gigsResponse.ok) {
          throw new Error('Failed to fetch opportunities from the server.');
        }
        const gigsData = await gigsResponse.json();
        setOpportunities(gigsData);

        // If user is logged in, fetch their existing applications
        if (authToken) {
          const contractsResponse = await fetch('/api/contracts/my-contracts', {
            headers: { 'Authorization': `Bearer ${authToken}` },
          });
          if (contractsResponse.ok) {
            const contractsData = await contractsResponse.json();
            const userAppliedGigs = new Set(contractsData.map(c => c.gigId._id));
            setAppliedGigs(userAppliedGigs);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGigsAndContracts();
  }, [authToken]);

  const handleApply = async (gigId) => {
    if (!authToken) {
      alert('Please log in to apply for a job.');
      return;
    }
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ gigId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Application sent successfully!');
        setAppliedGigs(prev => new Set(prev).add(gigId));
      } else {
        throw new Error(data.message || 'Failed to apply for the job.');
      }
    } catch (err) {
      alert(err.message);
    }
  };
  
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Discover Your Perfect <span className="text-indigo-600">Freelance Opportunity</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Explore curated freelance jobs and gigs from top clients worldwide. HustleHub connects you with premium opportunities tailored to your expertise.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Ideal Project</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by skill, title, or keyword..."
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Project Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'Opportunity' : 'Opportunities'} Available
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp._id}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${opp.featured ? 'border-indigo-500' : 'border-white'} relative flex flex-col h-full`}
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mr-4">
                  {categoryIcons[opp.category] || categoryIcons.Default}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{opp.title}</h3>
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                    {opp.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-5 flex-grow">{opp.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex items-center text-sm text-gray-500">
                  <FaMoneyBillWave className="mr-2 text-indigo-500" />
                  ₹{parseInt(opp.budget).toLocaleString('en-IN')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2 text-indigo-500" />
                  {opp.duration}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {opp.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{skill}</span>
                ))}
              </div>
              <div className="mt-auto pt-4">
                {opp.isAccepted ? (
                  <button disabled className="w-full bg-gray-400 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center cursor-not-allowed">
                    Accepted <FaCheckCircle className="ml-2" />
                  </button>
                ) : appliedGigs.has(opp._id) ? (
                  <button disabled className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center cursor-not-allowed">
                    Applied <FaCheckCircle className="ml-2" />
                  </button>
                ) : (
                  <button onClick={() => handleApply(opp._id)} className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center">
                    Apply Now <FaRocket className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}