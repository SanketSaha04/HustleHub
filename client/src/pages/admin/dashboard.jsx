import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { HiUserGroup, HiBriefcase, HiCollection, HiCurrencyRupee } from "react-icons/hi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle.jsx";

// Data
const userStats = [
  { label: "Workers", value: 120 },
  { label: "Admins", value: 5 },
  { label: "Clients", value: 40 },
];

const gigsStats = [
  { label: "Completed", value: 75 },
  { label: "Ongoing", value: 30 },
  { label: "Pending", value: 60 },
];

const earningsStats = [
  { name: "Jan", amount: 12000 },
  { name: "Feb", amount: 18000 },
  { name: "Mar", amount: 14000 },
  { name: "Apr", amount: 22000 },
  { name: "May", amount: 25000 },
];

const PIE_COLORS = ["#4F46E5", "#6366F1", "#818CF8"];

// Color Maps
const colorMap = {
  indigo: { bg: "bg-indigo-500", text: "text-indigo-500", shadow: "shadow-indigo-200" },
  green: { bg: "bg-green-500", text: "text-green-500", shadow: "shadow-green-200" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-500", shadow: "shadow-yellow-200" },
  pink: { bg: "bg-pink-500", text: "text-pink-500", shadow: "shadow-pink-200" },
};

const stats = [
  { label: "Total Users", value: 165, icon: HiUserGroup, color: "indigo" },
  { label: "Total Gigs", value: 165, icon: HiBriefcase, color: "green" },
  { label: "Active Contracts", value: 30, icon: HiCollection, color: "yellow" },
  { label: "Total Earnings", value: "₹2,50,000", icon: HiCurrencyRupee, color: "pink" },
];

const sidebarMenu = [
    { label: "Dashboard", icon: HiUserGroup, path: "/admin/dashboard" },
    { label: "Gigs", icon: HiBriefcase, path: "/admin/gigs" },
    { label: "Contracts", icon: HiCollection, path: "/admin/contracts" },
    { label: "Reports", icon: HiCurrencyRupee, path: "/admin/reports" },
  ];
  
  export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
  
    return (
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-screen border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
        <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md text-lg font-bold">H</span>
              <span className="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
                HustleHub
              </span>
            </Link>
          </div>
  
          <nav className="flex-1 p-4 space-y-2">
          {sidebarMenu.map((item) => {
            const isActive = location.pathname === item.path;
            const ItemIcon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
                }`}
              >
                <ItemIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <ThemeToggle />
        </div>
      </aside>
        {/* Main */}
        <section className="flex-1 min-h-screen flex flex-col">
          {/* Topbar */}
          <header className="flex items-center justify-between px-6 lg:px-10 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs px-1.5 py-0.5">3</span>
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Superuser</p>
                </div>
              </div>
            </div>
          </header>
  
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-6 lg:p-8">
            {stats.map((item) => {
              const palette = colorMap[item.color];
              const Icon = item.icon;
              return (
                <div key={item.label} className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex items-center gap-5 border-l-4 ${palette.bg}`}>
                  <div className={`p-3 rounded-full bg-white shadow-inner`}>
                    <Icon className={`w-7 h-7 ${palette.text}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                    <h3 className={`text-3xl font-bold text-gray-800 dark:text-white`}>{item.value}</h3>
                  </div>
                </div>
              );
            })}
          </div>
  
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-6 lg:px-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">User Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={userStats} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100} labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {userStats.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
  
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">Gigs Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gigsStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Earnings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6 mx-6 lg:mx-8">
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">Monthly Earnings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#10B981" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6 mx-6 lg:mx-8 mb-10">
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">Recent Activities</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex items-center gap-3"><span className="font-semibold text-indigo-600">Worker John</span> applied for Gig #12 <span className="text-xs text-gray-400 ml-auto">2 hours ago</span></li>
              <li className="flex items-center gap-3"><span className="font-semibold text-green-600">Gig #15</span> completed by Worker Sarah <span className="text-xs text-gray-400 ml-auto">5 hours ago</span></li>
              <li className="flex items-center gap-3">New contract started for <span className="text-pink-600 font-semibold">Client XYZ</span> <span className="text-xs text-gray-400 ml-auto">1 day ago</span></li>
              <li className="flex items-center gap-3"><span className="font-semibold text-indigo-600">Worker Mike</span> registered <span className="text-xs text-gray-400 ml-auto">2 days ago</span></li>
              <li className="flex items-center gap-3">Admin changed gig status of <span className="font-semibold">#10</span> to <span className="text-green-600 font-semibold">Completed</span> <span className="text-xs text-gray-400 ml-auto">3 days ago</span></li>
            </ul>
          </div>
        </section>
      </div>
    );
  }