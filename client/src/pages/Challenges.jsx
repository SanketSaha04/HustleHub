import React from "react";
import { Award, CheckSquare, Clock } from "lucide-react";

export default function Challenges() {
  const challenges = [
    {
      title: "UI/UX Redesign Challenge",
      category: "Design",
      difficulty: "Intermediate",
      endsIn: "3 days",
      participants: "120+",
    },
    {
      title: "Data Visualization with D3.js",
      category: "Development",
      difficulty: "Advanced",
      endsIn: "5 days",
      participants: "85+",
    },
    {
      title: "SEO Copywriting Challenge",
      category: "Marketing",
      difficulty: "Beginner",
      endsIn: "2 days",
      participants: "200+",
    },
  ];

  return (
    <section className="py-16 bg-cyan-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <Award size={48} className="mx-auto text-cyan-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-700 mb-4">
            Skill Challenges
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your skills, compete with peers, and win recognition in our weekly challenges.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span className={`text-sm font-semibold ${
                challenge.category === "Design" ? "text-pink-600" :
                challenge.category === "Development" ? "text-blue-600" :
                "text-green-600"
              }`}>{challenge.category}</span>
              <h3 className="text-xl font-semibold text-gray-800 my-2">
                {challenge.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>{challenge.difficulty}</span>
                <span className="flex items-center"><Clock size={14} className="mr-1" /> {challenge.endsIn}</span>
              </div>
              <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700">
                Join Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}