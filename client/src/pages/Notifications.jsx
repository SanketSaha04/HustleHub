import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell } from 'lucide-react';

const Notifications = () => {
    const { authToken } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!authToken) return;
            try {
                const response = await fetch('/api/notifications', {
                    headers: { 'Authorization': `Bearer ${authToken}` },
                });
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotifications();
    }, [authToken]);
    
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center"><Bell className="mr-2"/>Notifications</h1>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                {isLoading ? <p>Loading...</p> : notifications.length > 0 ? (
                    notifications.map(notif => (
                        <div key={notif._id} className="border-b pb-2">
                            <p>{notif.message}</p>
                            <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : <p>No new notifications.</p>}
            </div>
        </div>
    );
};

export default Notifications;