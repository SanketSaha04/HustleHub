import React, { useState, useEffect } from 'react';
import { FileText, User, Calendar } from 'lucide-react';

const Contracts = () => {
    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');
                const response = await fetch('/api/admin-api/contracts', {
                    headers: { 'Authorization': `Bearer ${adminToken}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setContracts(data);
                } else {
                    throw new Error(data.message || 'Failed to fetch contracts');
                }
            } catch (error) {
                console.error("Failed to fetch contracts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContracts();
    }, []);

    const handleApprove = async (contractId) => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin-api/contracts/${contractId}/approve`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${adminToken}` },
            });
            if (response.ok) {
                // Instantly update the UI to reflect the change
                setContracts(prevContracts => 
                    prevContracts.map(contract => 
                        contract._id === contractId ? { ...contract, status: 'Active' } : contract
                    )
                );
            } else {
                const errData = await response.json();
                alert(`Failed to approve: ${errData.message}`);
            }
        } catch (error) {
            console.error("Failed to approve contract:", error);
            alert('An error occurred while approving the contract.');
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading contracts...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contract Management</h1>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 font-semibold">Job Title</th>
                            <th className="p-4 font-semibold">Freelancer</th>
                            <th className="p-4 font-semibold">Date Applied</th>
                            <th className="p-4 font-semibold">Status / Action</th>
                            <th className="p-4 font-semibold">Payment (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.length > 0 ? contracts.map(contract => (
                            <tr key={contract._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 flex items-center">
                                    <FileText size={16} className="mr-2 text-indigo-500 flex-shrink-0" />
                                    {contract.gigId?.title || 'Gig Not Found'}
                                </td>
                                <td className="p-4">
                                    <User size={16} className="mr-2 text-gray-500 inline-block" />
                                    {contract.userId?.name} ({contract.userId?.email})
                                </td>
                                <td className="p-4">
                                    <Calendar size={16} className="mr-2 text-gray-500 inline-block" />
                                    {new Date(contract.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    {contract.status === 'Pending' ? (
                                        <button 
                                            onClick={() => handleApprove(contract._id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-600 transition-colors"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                            contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {contract.status}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 font-semibold">
                                    <span className="mr-1 text-green-500 inline-block">₹</span>
                                    {parseInt(contract.gigId?.budget || 0).toLocaleString('en-IN')}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-8">No contracts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contracts;
