import React from "react";
import { Users, Star, BookOpen } from "lucide-react";

export default function MentorshipProgram() {
  const mentors = [
    {
      name: "Alice Johnson",
      role: "Senior Software Engineer at Google",
      expertise: "Machine Learning, System Design",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "David Chen",
      role: "Product Manager at Stripe",
      expertise: "Product Strategy, FinTech",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Maria Garcia",
      role: "UX Design Lead at Airbnb",
      expertise: "User Research, Interaction Design",
      img: "https://randomuser.me/api/portraits/women/47.jpg",
    },
  ];

  return (
    <section className="py-16 bg-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <Users size={48} className="mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            Mentorship Program
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with experienced professionals for personalized guidance and career growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={mentor.img}
                alt={mentor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {mentor.name}
              </h3>
              <p className="text-indigo-600 text-sm mb-2">{mentor.role}</p>
              <p className="text-gray-600 text-sm">{mentor.expertise}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
             <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700">
            Find a Mentor
          </button>
        </div>
      </div>
    </section>
  );
}