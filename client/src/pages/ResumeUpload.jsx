import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResumeUpload = () => {
    const { user, authToken, login } = useAuth();
    const navigate = useNavigate();

    const [resumeData, setResumeData] = useState({
        jobTitle: '',
        fullName: '',
        skills: '',
        experience: '',
        file: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setResumeData({
                jobTitle: user.jobTitle || '',
                fullName: user.name || '',
                skills: user.skills ? user.skills.join(', ') : '',
                experience: user.experience || '',
                file: null,
            });
        }
    }, [user]);
    
    useEffect(() => {
        if (!authToken) {
            navigate('/login', {
                state: { from: '/upload-resume', formType: 'login' },
            });
        }
    }, [authToken, navigate]);

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
        setError('');
        setMessage('');

        const formData = new FormData();
        formData.append('jobTitle', resumeData.jobTitle);
        formData.append('fullName', resumeData.fullName);
        formData.append('skills', resumeData.skills);
        formData.append('experience', resumeData.experience);
        if (resumeData.file) {
            formData.append('resume', resumeData.file);
        }

        try {
            const response = await fetch('http://localhost:5000/api/user/resume', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                console.log('%cResumeUpload: Received new token from server. Calling login...', 'color: green;', data.token);
                login(data.token);
                setTimeout(() => navigate('/'), 2000); 
            } else {
                setError(data.message || 'Failed to submit resume.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setError('Failed to submit resume. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!authToken) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        <span className="text-indigo-600">Update</span> Your Profile
                    </h2>
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desired Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={resumeData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g., Frontend Developer"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={resumeData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200"
                        />
                    </div>
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                        <input
                            type="text"
                            name="skills"
                            value={resumeData.skills}
                            onChange={handleChange}
                            placeholder="React, JavaScript, UI/UX Design"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                        <select
                            name="experience"
                            value={resumeData.experience}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200"
                        >
                            <option value="">Select</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                        </select>
                    </div>
                    <div className="mb-6 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Resume (Optional)</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
                                    className="opacity-0 absolute"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting} className={`w-full py-3 px-4 rounded-lg text-white font-medium mt-4 transition-colors ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                    {isSubmitting ? 'Submitting...' : 'Save Profile & Resume'}
                </button>
            </form>
        </div>
    );
};

export default ResumeUpload;