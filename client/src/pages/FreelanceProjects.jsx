import React, { useState, useEffect } from "react";
import { Briefcase, Filter, Search, XCircle } from "lucide-react";

const allProjects = [
    {
      title: "E-commerce Website Development",
      client: "StyleHub",
      budget: "₹2,22,000",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      deadline: "4 weeks",
    },
    {
      title: "Mobile App Design",
      client: "FitTrack",
      budget: "₹1,59,840",
      skills: ["Figma", "UI/UX Design", "Prototyping"],
      deadline: "3 weeks",
    },
    {
      title: "Content Writing for Tech Blog",
      client: "Innovate Tomorrow",
      budget: "₹71,040",
      skills: ["Content Writing", "SEO", "Technical Writing"],
      deadline: "2 weeks",
    },
    {
      title: "Social Media Marketing Campaign",
      client: "FoodieFinds",
      budget: "₹1,06,560",
      skills: ["Social Media Marketing", "Content Creation", "Canva"],
      deadline: "5 weeks",
    },
    {
      title: "Cloud Infrastructure Setup on AWS",
      client: "DataCorp",
      budget: "₹2,66,400",
      skills: ["AWS", "DevOps", "Terraform", "CI/CD"],
      deadline: "6 weeks",
    },
    {
      title: "Flutter Mobile App Development",
      client: "QuickCart",
      budget: "₹2,00,000",
      skills: ["Flutter", "Dart", "Firebase"],
      deadline: "5 weeks",
    },
    {
      title: "Brand Logo and Identity Design",
      client: "Nexus Solutions",
      budget: "₹89,000",
      skills: ["Branding", "Illustrator", "Logo Design"],
      deadline: "2 weeks",
    },
    {
      title: "Python Script for Data Scraping",
      client: "MarketAnalytics",
      budget: "₹53,000",
      skills: ["Python", "Beautiful Soup", "Scrapy"],
      deadline: "1 week",
    },
    {
      title: "WordPress Theme Customization",
      client: "Elegant Homes",
      budget: "₹62,000",
      skills: ["WordPress", "PHP", "CSS"],
      deadline: "10 days",
    },
    {
      title: "Video Editing for YouTube Channel",
      client: "TravelVibes",
      budget: "₹95,000",
      skills: ["Video Editing", "Premiere Pro", "After Effects"],
      deadline: "3 weeks",
    },
    {
      title: "Vue.js Frontend Development",
      client: "LearnWell",
      budget: "₹1,78,000",
      skills: ["Vue.js", "Vuex", "JavaScript"],
      deadline: "4 weeks",
    },
    {
      title: "API Integration with Stripe",
      client: "PayEasy",
      budget: "₹1,33,000",
      skills: ["API Integration", "Node.js", "Stripe"],
      deadline: "2 weeks",
    },
  ];

export default function FreelanceProjects() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(allProjects);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const results = allProjects.filter(project =>
            project.title.toLowerCase().includes(lowercasedTerm) ||
            project.client.toLowerCase().includes(lowercasedTerm) ||
            project.skills.some(skill => skill.toLowerCase().includes(lowercasedTerm))
        );
        setFilteredProjects(results);
    }, [searchTerm]);


  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <Briefcase size={48} className="mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            Freelance Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and apply for exclusive freelance projects to build your portfolio and earn income.
          </p>
        </div>

        <div className="flex justify-center items-center mb-12 gap-4">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, client, or skill (e.g., 'React')"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex-grow">
                    <p className="text-sm text-gray-500 mb-2">
                        Client: {project.client}
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, i) => (
                        <span
                        key={i}
                        className="text-xs font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full"
                        >
                        {skill}
                        </span>
                    ))}
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <span className="font-bold text-lg text-indigo-600">{project.budget}</span>
                    <span className="text-gray-500">{project.deadline}</span>
                </div>
                 <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105">
                  View Details
                </button>
              </div>
            ))
           ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-16 text-gray-500">
                <XCircle size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">No Projects Found</h3>
                <p className="mt-2">Your search for "{searchTerm}" did not match any projects.</p>
                <p className="text-sm text-gray-400 mt-1">Try a different keyword like "React" or "Design".</p>
            </div>
           )}
        </div>
      </div>
    </section>
  );
}
