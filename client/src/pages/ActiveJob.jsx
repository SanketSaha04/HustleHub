import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ListChecks, Paperclip, Link as LinkIcon, Send } from 'lucide-react';

const ActiveJob = () => {
    const { contractId } = useParams();
    const navigate = useNavigate();
    const { authToken } = useAuth();
    
    const [contract, setContract] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [notes, setNotes] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!authToken) return;
        const fetchContractDetails = async () => {
            try {
                const response = await axios.get(`/api/contracts/${contractId}`, {
                    headers: { 'Authorization': `Bearer ${authToken}` },
                });
                console.log("CONTRACT DATA FROM SERVER:", response.data);
                setContract(response.data);
            } catch (error) {
                console.error("Failed to fetch contract details:", error);
                navigate('/my-profile'); // Redirect if contract not found or unauthorized
            } finally {
                setIsLoading(false);
            }
        };
        fetchContractDetails();
    }, [contractId, authToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!notes && !link && !file) {
            return alert("Please provide submission notes, a link, or a file.");
        }

        const formData = new FormData();
        formData.append('notes', notes);
        formData.append('link', link); // Add the link to the form data
        if (file) {
            formData.append('taskFile', file);
        }

        try {
            await axios.post(`/api/tasks/${contractId}/submit`, formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Work submitted successfully!');
            navigate('/my-profile');
        } catch (error) {
            console.error("Submission Error:", error);
            alert('Failed to submit your work. Please try again.');
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading job details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* --- Task Details Section --- */}
                <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{contract?.gigId?.title}</h1>
                    <p className="text-gray-600 mb-6">{contract?.gigId?.description}</p>
                    <div className="border-t pt-4">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                            <ListChecks size={20} className="mr-2 text-indigo-600" />
                            Required Tasks
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {contract?.gigId?.tasks?.map((task, index) => (
                                <li key={index}>{task}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* --- Submission Form Section --- */}
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Work for Review</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Submission Notes</label>
                            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="5"
                                placeholder="Add notes for the admin (e.g., how to run your code, special instructions)."
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Submission Link (GitHub, Figma, etc.)</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LinkIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="url" id="link" value={link} onChange={(e) => setLink(e.target.value)}
                                    placeholder="https://github.com/your-repo"
                                    className="block w-full pl-10 p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload File (Optional)</label>
                            <div className="mt-1 flex items-center gap-4">
                                <Paperclip className="h-5 w-5 text-gray-400" />
                                <input type="file" onChange={(e) => setFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                            <Send size={18} />
                            Submit for Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActiveJob;