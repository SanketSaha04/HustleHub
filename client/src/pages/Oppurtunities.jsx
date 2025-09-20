import React, { useState } from "react";
import { FaLaptopCode, FaPenNib, FaChartLine, FaPalette, FaSearch, FaFilter, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUserTie, FaRocket, FaMedal } from "react-icons/fa";

// Function to convert USD to INR
const usdToInr = (usdAmount) => {
  const exchangeRate = 83.5; // Current approximate exchange rate
  return Math.round(usdAmount * exchangeRate).toLocaleString('en-IN');
};

const opportunities = [
  {
    title: "Senior Frontend Developer",
    category: "Development",
    description: "Build responsive web applications using React and Tailwind CSS for innovative startups.",
    icon: <FaLaptopCode className="text-indigo-500 w-6 h-6" />,
    budget: "₹2,09,000 - ₹3,34,000",
    location: "Remote",
    duration: "3-6 months",
    skills: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
    featured: true
  },
  {
    title: "Creative Content Writer",
    category: "Writing",
    description: "Create engaging articles and blogs for diverse clients across multiple industries.",
    icon: <FaPenNib className="text-indigo-500 w-6 h-6" />,
    budget: "₹3,300 - ₹6,700 per article",
    location: "Remote",
    duration: "Ongoing",
    skills: ["Content Writing", "SEO", "Blogging", "Research"],
    featured: false
  },
  {
    title: "Digital Marketing Strategist",
    category: "Marketing",
    description: "Design and implement comprehensive marketing campaigns to boost client reach and engagement.",
    icon: <FaChartLine className="text-indigo-500 w-6 h-6" />,
    budget: "₹1,25,000 - ₹2,50,000",
    location: "Remote",
    duration: "2-4 months",
    skills: ["Social Media", "Google Ads", "Analytics", "Strategy"],
    featured: true
  },
  {
    title: "Visual Brand Designer",
    category: "Design",
    description: "Create stunning visuals and branding materials for clients across various industries.",
    icon: <FaPalette className="text-indigo-500 w-6 h-6" />,
    budget: "₹4,200 - ₹8,400 per hour",
    location: "Remote",
    duration: "Project-based",
    skills: ["Adobe Creative Suite", "Branding", "UI Design", "Illustration"],
    featured: false
  },
  {
    title: "Full Stack Engineer",
    category: "Development",
    description: "Build end-to-end web applications with modern technologies and best practices.",
    icon: <FaLaptopCode className="text-indigo-500 w-6 h-6" />,
    budget: "₹3,34,000 - ₹5,43,000",
    location: "Remote",
    duration: "4-8 months",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    featured: true
  },
  {
    title: "SEO Optimization Specialist",
    category: "Marketing",
    description: "Optimize website content and structure to improve search engine rankings.",
    icon: <FaChartLine className="text-indigo-500 w-6 h-6" />,
    budget: "₹1,00,000 - ₹2,09,000",
    location: "Remote",
    duration: "3 months",
    skills: ["SEO", "Keyword Research", "Analytics", "Content Strategy"],
    featured: false
  },
  {
    title: "UX/UI Product Designer",
    category: "Design",
    description: "Design intuitive user experiences and interfaces for digital products.",
    icon: <FaPalette className="text-indigo-500 w-6 h-6" />,
    budget: "₹5,000 - ₹10,000 per hour",
    location: "Remote",
    duration: "6+ months",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
    featured: true
  },
  {
    title: "Technical Content Creator",
    category: "Writing",
    description: "Produce technical documentation and tutorials for developer audiences.",
    icon: <FaPenNib className="text-indigo-500 w-6 h-6" />,
    budget: "₹6,700 - ₹12,500 per article",
    location: "Remote",
    duration: "Ongoing",
    skills: ["Technical Writing", "API Documentation", "Tutorials"],
    featured: false
  },
  {
    title: "DevOps Infrastructure Engineer",
    category: "Development",
    description: "Build and maintain cloud infrastructure and CI/CD pipelines.",
    icon: <FaLaptopCode className="text-indigo-500 w-6 h-6" />,
    budget: "₹4,17,000 - ₹6,68,000",
    location: "Remote",
    duration: "Long-term",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    featured: true
  }
];

const categories = ["All", "Development", "Design", "Marketing", "Writing"];
const budgetRanges = ["Any", "₹0-₹42,000", "₹42,000-₹1,67,000", "₹1,67,000-₹4,17,000", "₹4,17,000+"];

export default function Opportunities() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("Any");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesBudget = true;
    if (selectedBudget !== "Any") {
      // Extract numeric values from the budget range for comparison
      const rangeValues = selectedBudget.replace(/[₹,]/g, "").split("-").map(Number);
      const oppBudgetValues = opp.budget.replace(/[₹,]/g, "").split("-").map(Number);
      const oppMinBudget = Math.min(...oppBudgetValues.filter(n => !isNaN(n)));
      
      if (selectedBudget === "₹4,17,000+") {
        matchesBudget = oppMinBudget >= 417000;
      } else if (rangeValues.length === 2) {
        matchesBudget = oppMinBudget >= rangeValues[0] && oppMinBudget <= rangeValues[1];
      }
    }
    
    return matchesCategory && matchesSearch && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Discover Your Perfect <span className="text-indigo-600">Freelance Opportunity</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Explore curated freelance jobs and gigs from top clients worldwide. HustleHub connects you with premium opportunities tailored to your expertise.
          </p>
        </div>

        {/* Search and Filters */}
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
            <button className="px-4 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors">
              <FaFilter className="mr-2" /> Filter Opportunities
            </button>
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

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Budget Range (₹)</h3>
              <div className="flex flex-wrap gap-2">
                {budgetRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setSelectedBudget(range)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${selectedBudget === range ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-indigo-700">300+</div>
            <div className="text-sm text-gray-600">Premium Opportunities</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-indigo-700">₹20Cr+</div>
            <div className="text-sm text-gray-600">Total Project Value</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-indigo-700">98%</div>
            <div className="text-sm text-gray-600">Client Satisfaction Rate</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-indigo-700">24h</div>
            <div className="text-sm text-gray-600">Average Response Time</div>
          </div>
        </div>

        {/* Opportunities Grid Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'Opportunity' : 'Opportunities'} Available
          </h2>
          <div className="text-sm text-gray-600">
            Sorted by: <span className="font-medium">Relevance</span>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredOpportunities.map((opp, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${opp.featured ? 'border-indigo-500' : 'border-white'} relative flex flex-col h-full`}
            >
              {opp.featured && (
                <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <FaMedal className="mr-1" /> Featured
                </div>
              )}
              
              <div className="flex items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mr-4">
                  {opp.icon}
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
                  {opp.budget}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                  {opp.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2 text-indigo-500" />
                  {opp.duration}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {opp.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* This is the fixed button alignment */}
              <div className="mt-auto pt-4">
                <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center">
                  Apply Now <FaRocket className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-10">
          <h2 className="text-2xl font-bold mb-4">Ready to Elevate Your Freelance Career?</h2>
          <p className="mb-6 max-w-2xl mx-auto">Join thousands of top freelancers who've found their dream projects through HustleHub.</p>
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center mx-auto">
            <FaUserTie className="mr-2" /> Create Your Professional Profile
          </button>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Success Stories from Our Freelancers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLaptopCode className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">From Side Hustle to Full-Time Career</h3>
              <p className="text-gray-600 text-sm">"HustleHub helped me transition from my 9-5 job to a thriving freelance business earning ₹15L+ annually."</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3x Income Increase in 6 Months</h3>
              <p className="text-gray-600 text-sm">"I tripled my freelance income by connecting with better clients through HustleHub, now earning ₹8L+ monthly."</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMedal className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Award-Winning Projects</h3>
              <p className="text-gray-600 text-sm">"The quality of projects on HustleHub helped me build an award-winning portfolio that attracts premium clients."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}