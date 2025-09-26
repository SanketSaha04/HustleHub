import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Briefcase, Users, FileText } from 'lucide-react';

const Reports = () => {
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');
                const response = await fetch('/api/admin-api/reports', {
                    headers: { 'Authorization': `Bearer ${adminToken}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setReportData(data);
                }
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (isLoading || !reportData) {
        return <div className="p-8">Loading reports...</div>;
    }
    
    const chartData = [
        { name: 'Users', value: reportData.totalUsers },
        { name: 'Gigs', value: reportData.totalGigs },
        { name: 'Contracts', value: reportData.totalContracts }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Platform Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={<DollarSign />} title="Total Gig Value" value={`₹${reportData.totalBudgetValue.toLocaleString('en-IN')}`} />
                <StatCard icon={<Briefcase />} title="Total Gigs Posted" value={reportData.totalGigs} />
                <StatCard icon={<FileText />} title="Active Contracts" value={reportData.totalContracts} />
                <StatCard icon={<Users />} title="Registered Users" value={reportData.totalUsers} />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <div className="bg-indigo-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export default Reports;