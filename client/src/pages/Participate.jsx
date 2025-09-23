import React from "react";
import { Zap, Briefcase, Users, Award, ArrowRight, Calendar, Star, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Participate() {
  const opportunities = [
    {
      title: "Freelance Projects",
      desc: "Work on live projects and showcase your skills to potential clients.",
      emoji: "💼",
      icon: <Briefcase size={24} className="text-indigo-600" />,
      stats: "250+ active projects",
      color: "from-blue-50 to-blue-100",
      link: "/freelance-projects"
    },
    {
      title: "Hackathons",
      desc: "Join HustleHub hackathons to collaborate and innovate with top talent.",
      emoji: "⚡",
      icon: <Zap size={24} className="text-indigo-600" />,
      stats: "12 upcoming events",
      color: "from-purple-50 to-purple-100",
      link: "/hackathons"

    },
    {
      title: "Mentorship Program",
      desc: "Get paired with experienced mentors in your field for guidance.",
      emoji: "👥",
      icon: <Users size={24} className="text-indigo-600" />,
      stats: "80+ expert mentors",
      color: "from-indigo-50 to-indigo-100",
      link: "/mentorship-program"
    },
    {
      title: "Challenges",
      desc: "Test your skills with weekly challenges and win recognition.",
      emoji: "🏆",
      icon: <Award size={24} className="text-indigo-600" />,
      stats: "Weekly challenges",
      color: "from-cyan-50 to-cyan-100",
      link: "/challenges"
    }
  ];

  const stats = [
    { value: "5,000+", label: "Active Participants" },
    { value: "1,200+", label: "Projects Completed" },
    { value: "96%", label: "Satisfaction Rate" },
    { value: "200+", label: "Mentors Available" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <Target size={16} className="mr-2" /> Grow Your Career
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-700 mb-6">
            Participate & Excel
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Explore projects, hackathons, and mentorship opportunities that help you gain 
            real-world experience while connecting with other professionals.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-16">
          {opportunities.map((item, index) => (
            <Link to={item.link}
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white hover:border-indigo-100"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10`}></div>
              
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4 group-hover:bg-white transition-colors">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {item.desc}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {item.stats}
                </span>
                
                <button className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm font-medium">
                  Explore <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-md mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">Upcoming Events</h2>
            <button className="text-indigo-600 text-sm font-medium flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid gap-4">
            {[
              { name: "Web3 Hackathon", date: "Oct 15-17", participants: "120+ joined" },
              { name: "UI/UX Design Challenge", date: "Oct 22", participants: "80+ joined" },
              { name: "Freelancer Meetup", date: "Oct 29", participants: "50+ joined" }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-lg hover:bg-indigo-100/50 transition-colors">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm mr-4">
                    <Calendar size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{event.name}</div>
                    <div className="text-sm text-gray-600">{event.date} • {event.participants}</div>
                  </div>
                </div>
                <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-12">
          <Star className="mx-auto mb-4" fill="white" size={24} />
          <p className="text-xl italic mb-4">
            "Participating in HustleHub challenges helped me build a portfolio that landed me my first major client!"
          </p>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-white/20 rounded-full mr-3"></div>
            <div>
              <div className="font-medium">Alex Morgan</div>
              <div className="text-indigo-200 text-sm">Freelance Developer</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 flex items-center mx-auto">
            Join the Community
            <ArrowRight size={18} className="ml-2" />
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Join 15,000+ freelancers already growing their careers on HustleHub
          </p>
        </div>
      </div>
    </section>
  );
}