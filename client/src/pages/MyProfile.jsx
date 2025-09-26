import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Edit, Clock, CheckCircle, FileText } from 'lucide-react';

const MyProfile = () => {
  const { user, authToken, logout } = useAuth();
  const navigate = useNavigate();

  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobFilter, setJobFilter] = useState('Active');

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    const fetchContracts = async () => {
      try {
        const response = await fetch('/api/contracts/my-contracts', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setContracts(data);
        } else {
          console.error("Failed to fetch contracts");
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [authToken, navigate]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  const filteredJobs = contracts.filter(c => c.status === jobFilter);
  const activeJobsCount = contracts.filter(c => c.status === 'Active').length;
  const completedJobsCount = contracts.filter(c => c.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold border-4 border-indigo-200">
            {user?.name?.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-indigo-600 font-medium">{user?.jobTitle || 'Freelancer'}</p>
            <div className="flex justify-center sm:justify-start flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mt-2">
              <span className="flex items-center"><Mail size={14} className="mr-1" />{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/resume-upload')}
            className="flex-shrink-0 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>
        </div>

        {/* --- MODIFIED SECTION: Profile Details & Resume --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Professional Details</h2>
            <div><strong>Skills:</strong> {user?.skills?.join(', ') || 'Not specified'}</div>
            <div><strong>Experience:</strong> {user?.experience || 'Not specified'}</div>
          </div>
          
          {/* --- NEW SECTION: My Resume --- */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
             <h2 className="text-xl font-bold text-gray-800 mb-4">My Resume</h2>
             {user?.resumePath ? (
                <a
                    href={`http://localhost:5000${user.resumePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-200 flex items-center gap-2"
                >
                    <FileText size={18} /> View Resume
                </a>
             ) : (
                <p className="text-gray-500">No resume uploaded.</p>
             )}
          </div>
        </div>

        {/* Jobs Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Jobs</h2>
              <div>
                <button onClick={() => setJobFilter('Active')} className={`px-3 py-1 text-sm rounded-l-lg ${jobFilter === 'Active' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Active</button>
                <button onClick={() => setJobFilter('Completed')} className={`px-3 py-1 text-sm rounded-r-lg ${jobFilter === 'Completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Completed</button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(contract => {
                  if (jobFilter === 'Active') {
                    return (
                      <Link to={`/job/${contract._id}`} key={contract._id}>
                        <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                          <div>
                            <p className="font-semibold">{contract.gigId.title}</p>
                            <p className="text-xs text-gray-500">Accepted: {new Date(contract.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="text-sm font-medium text-indigo-600">View & Submit Task →</span>
                        </div>
                      </Link>
                    );
                  }
                  if (jobFilter === 'Completed') {
                     return (
                        <div key={contract._id} className="p-4 border rounded-lg flex justify-between items-center bg-green-50">
                             <div>
                                 <p className="font-semibold">{contract.gigId.title}</p>
                                 <p className="text-xs text-gray-500">Completed on: {new Date(contract.updatedAt).toLocaleDateString()}</p>
                             </div>
                             <span className="text-sm font-medium text-green-700 flex items-center"><CheckCircle size={16} className="mr-2"/>Finished</span>
                        </div>
                     )
                  }
                  return null;
                })
              ) : (
                <p className="text-gray-500 text-center py-4">No {jobFilter.toLowerCase()} jobs found.</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-gray-800 flex items-center"><Clock size={16} className="mr-2 text-blue-500" /> Active Jobs</h3>
              <p className="text-2xl font-bold text-center mt-2">{activeJobsCount}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-gray-800 flex items-center"><CheckCircle size={16} className="mr-2 text-green-500" /> Completed Jobs</h3>
              <p className="text-2xl font-bold text-center mt-2">{completedJobsCount}</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-4">
          <Link to="/privacy" className="hover:text-indigo-600 mx-2">Privacy Policy</Link> |
          <Link to="/terms" className="hover:text-indigo-600 mx-2">Terms & Conditions</Link> |
          <button onClick={logout} className="hover:text-indigo-600 mx-2 font-semibold">Logout</button>
        </footer>
      </div>
    </div>
  );
};

export default MyProfile;