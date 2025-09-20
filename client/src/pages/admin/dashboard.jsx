import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { HiUserGroup, HiBriefcase, HiCollection, HiCurrencyRupee } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

// Stat data
const userStats = [
  { label: "Workers", value: 120 },
  { label: "Admins", value: 5 },
  { label: "Clients", value: 40 }
];
const gigsStats = [
  { label: "Completed", value: 75 },
  { label: "Ongoing", value: 30 },
  { label: "Pending", value: 60 }
];
const earningsStats = [
  { name: "Jan", amount: 12000 },
  { name: "Feb", amount: 18000 },
  { name: "Mar", amount: 14000 },
  { name: "Apr", amount: 22000 },
  { name: "May", amount: 25000 }
];
const COLORS = ["#4F46E5", "#6366F1", "#818CF8"];

// Modern stat cards config
const stats = [
  { label: "Total Users", value: 165, icon: HiUserGroup, color: "indigo" },
  { label: "Total Gigs", value: 165, icon: HiBriefcase, color: "green" },
  { label: "Active Contracts", value: 30, icon: HiCollection, color: "yellow" },
  { label: "Total Earnings", value: "₹2,50,000", icon: HiCurrencyRupee, color: "pink" }
];

// Sidebar menu items with paths
const sidebarMenu = [
  { label: "Dashboard", icon: HiUserGroup, path: "/admin" },
  { label: "Gigs", icon: HiBriefcase, path: "/admin/gigs" },
  { label: "Contracts", icon: HiCollection, path: "/admin/contracts" },
  { label: "Reports", icon: HiCurrencyRupee, path: "/admin/reports" }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-gradient-to-tr from-gray-100 to-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-white/70 backdrop-blur-xl p-6 border-r shadow-xl">
        <div className="mb-12">
          <span className="flex items-center space-x-1 text-2xl font-normal">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-1">
              ↗
            </span>
            <span style={{ color: '#1565c0' }}>Hustle</span>
            <span style={{ color: '#ff6f00', marginLeft: 2 }}>Hub</span>
          </span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarMenu.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 text-lg rounded-lg font-medium w-full text-left ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'text-gray-700 hover:bg-indigo-50'
                    } transition-all duration-200 group`}
                  >
                    <item.icon className={`w-6 h-6 ${
                      isActive 
                        ? 'text-indigo-700' 
                        : 'text-indigo-500 group-hover:text-indigo-700'
                    }`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto mb-2 flex items-center justify-between">
          <button className="px-3 py-1.5 rounded-lg bg-gray-200 font-medium text-sm hover:bg-gray-300 transition">Light</button>
          <button className="px-3 py-1.5 rounded-lg bg-gray-900 text-gray-100 font-medium text-sm hover:bg-gray-800 transition">Dark</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-5 bg-white/70 backdrop-blur-xl border-b shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
            />
            <button className="relative">
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-xs px-2">3</span>
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/32" alt="Avatar" className="w-8 h-8 rounded-full object-cover border" />
              <span className="text-gray-800 font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 m-6">
          {stats.map((item, idx) => (
            <div
              key={item.label}
              className={`bg-white/80 backdrop-blur-lg flex items-center gap-4 rounded-2xl shadow-md px-6 py-5 hover:shadow-xl transition`}
            >
              <div className={`p-3 rounded-full bg-gradient-to-tr from-${item.color}-100 to-${item.color}-400`}>
                <item.icon className={`w-7 h-7 text-${item.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h3 className={`text-3xl font-extrabold text-${item.color}-700`}>{item.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-6">
          {/* User Distribution Pie */}
          <div className="bg-white/80 rounded-2xl shadow-md p-6 backdrop-blur-xl">
            <h2 className="text-gray-700 font-semibold mb-4">User Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userStats}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {userStats.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Gigs Overview Bar */}
          <div className="bg-white/80 rounded-2xl shadow-md p-6 backdrop-blur-xl">
            <h2 className="text-gray-700 font-semibold mb-4">Gigs Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gigsStats}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white/80 rounded-2xl shadow-md p-6 backdrop-blur-xl mt-6 mx-6">
          <h2 className="text-gray-700 font-semibold mb-4">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#10B981" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 rounded-2xl shadow-md p-6 backdrop-blur-xl mt-6 mx-6 mb-8">
          <h2 className="text-gray-700 font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-2 text-gray-600">
            <li><span className="font-bold text-indigo-600">Worker John</span> applied for Gig #12</li>
            <li><span className="font-bold text-green-600">Gig #15</span> completed by Worker Sarah</li>
            <li>New contract started for <span className="text-pink-600 font-semibold">Client XYZ</span></li>
            <li><span className="font-bold text-indigo-600">Worker Mike</span> registered</li>
            <li>Admin changed gig status of <span className="font-bold">#10</span> to <span className="text-green-600 font-semibold">Completed</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
