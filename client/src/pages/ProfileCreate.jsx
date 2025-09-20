import React, { useState } from "react";

export default function ProfileCreate() {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    skills: "",
    experience: "",
    portfolio: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile submitted:", formData);
    alert("Profile created successfully 🚀");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Create Your Professional Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium">Professional Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="Full Stack Developer"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell employers about yourself..."
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="React, Node.js, SQL, Tailwind CSS"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium">Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="2 years as a freelance web developer..."
            />
          </div>

          {/* Portfolio Link */}
          <div>
            <label className="block text-gray-700 font-medium">Portfolio Link</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="https://yourportfolio.com"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
