
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    jobTitle: '',
    fullName: '',
    skills: '',
    experience: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Or your auth token key
    if (!token) {
      navigate('/login', {
        state: {
          from: '/upload-resume',
          formType: 'login',
        },
      });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setResumeData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('jobTitle', resumeData.jobTitle);
      formData.append('fullName', resumeData.fullName);
      formData.append('skills', resumeData.skills);
      formData.append('experience', resumeData.experience);
      if (resumeData.file) {
        formData.append('resume', resumeData.file);
      }

      // Here you would normally call your API:
      // const response = await axios.post('/api/upload-resume', formData, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // Mock API response
      console.log('Form data to submit:', Object.fromEntries(formData));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Resume submitted successfully!');
      setResumeData({
        jobTitle: '',
        fullName: '',
        skills: '',
        experience: '',
        file: null,
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            <span className="text-indigo-600">Upload</span> Your Resume
          </h2>
          <p className="text-gray-600">Help us match you with the perfect opportunities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desired Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={resumeData.jobTitle}
              onChange={handleChange}
              required
              placeholder="e.g., Frontend Developer"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
            />
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={resumeData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
            />
          </div>

          {/* Skills */}
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={resumeData.skills}
              onChange={handleChange}
              required
              placeholder="React, JavaScript, UI/UX Design"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
            />
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <select
              name="experience"
              value={resumeData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
            >
              <option value="">Select</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="mb-6 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF/DOC)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-indigo-300 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm text-gray-600">
                    {resumeData.file ? resumeData.file.name : 'Drag and drop or click to browse'}
                  </p>
                </div>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                  className="opacity-0 absolute"
                />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium mt-4 transition-colors ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Submit Resume'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;