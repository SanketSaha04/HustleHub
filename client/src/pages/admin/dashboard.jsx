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

// Safe Tailwind color maps
const colorMap = {
  indigo: { bgFrom: "from-indigo-100", bgTo: "to-indigo-400", text: "text-indigo-700", icon: "text-indigo-600" },
  green: { bgFrom: "from-emerald-100", bgTo: "to-emerald-400", text: "text-emerald-700", icon: "text-emerald-600" },
  yellow:{ bgFrom: "from-amber-100",   bgTo: "to-amber-400",   text: "text-amber-700",   icon: "text-amber-600" },
  pink:  { bgFrom: "from-pink-100",    bgTo: "to-pink-400",    text: "text-pink-700",    icon: "text-pink-600" },
};

const stats = [
  { label: "Total Users", value: 165, icon: HiUserGroup, color: "indigo" },
  { label: "Total Gigs", value: 165, icon: HiBriefcase, color: "green" },
  { label: "Active Contracts", value: 30, icon: HiCollection, color: "yellow" },
  { label: "Total Earnings", value: "₹2,50,000", icon: HiCurrencyRupee, color: "pink" },
];

const sidebarMenu = [
  { label: "Dashboard", icon: HiUserGroup, path: "/admin" },
  { label: "Gigs", icon: HiBriefcase, path: "/admin/gigs" },
  { label: "Contracts", icon: HiCollection, path: "/admin/contracts" },
  { label: "Reports", icon: HiCurrencyRupee, path: "/admin/reports" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[radial-gradient(1200px_600px_at_-10%_-10%,#eef2ff,transparent),radial-gradient(800px_400px_at_110%_10%,#fffbeb,transparent)] dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen border-r bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-xl dark:border-white/10">
        <div className="p-6 border-b dark:border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">↗</span>
            <span className="text-2xl tracking-tight">
              <span className="text-[#1565c0]">Hustle</span>
              <span className="text-[#ff6f00] ml-1">Hub</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {sidebarMenu.map((item) => {
              const isActive = location.pathname === item.path;
              const ItemIcon = item.icon;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive ? "bg-indigo-100 text-indigo-800" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <ItemIcon className={`w-5 h-5 ${isActive ? "text-indigo-700" : "text-indigo-500"}`} />
                    <span>{item.label}</span>
                    {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_0_3px_rgba(99,102,241,0.25)]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t flex items-center justify-between dark:border-white/10">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main */}
      <section className="flex-1 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 lg:px-10 py-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b dark:border-white/10 sticky top-0 z-10">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button className="relative">
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-[10px] px-1.5">3</span>
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/32" alt="Avatar" className="w-8 h-8 rounded-full object-cover border" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-6 lg:p-8">
          {stats.map((item) => {
            const palette = colorMap[item.color];
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all px-6 py-5 flex items-center gap-4 border border-white/40 dark:border-white/10">
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${palette.bgFrom} ${palette.bgTo} shadow`}>
                  <Icon className={`w-6 h-6 ${palette.icon}`} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.label}</p>
                  <h3 className={`text-2xl lg:text-3xl font-extrabold ${palette.text}`}>{item.value}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-8">
          <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-md p-6 backdrop-blur-xl border border-white/40 dark:border-white/10">
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">User Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={userStats} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={85} label>
                  {userStats.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-md p-6 backdrop-blur-xl border border-white/40 dark:border-white/10">
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">Gigs Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gigsStats}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-md p-6 backdrop-blur-xl mt-6 mx-6 lg:mx-8 border border-white/40 dark:border-white/10">
          <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-md p-6 backdrop-blur-xl mt-6 mx-6 lg:mx-8 mb-10 border border-white/40 dark:border-white/10">
          <h2 className="text-gray-700 dark:text-gray-200 font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li><span className="font-semibold text-indigo-600">Worker John</span> applied for Gig #12</li>
            <li><span className="font-semibold text-emerald-600">Gig #15</span> completed by Worker Sarah</li>
            <li>New contract started for <span className="text-pink-600 font-semibold">Client XYZ</span></li>
            <li><span className="font-semibold text-indigo-600">Worker Mike</span> registered</li>
            <li>Admin changed gig status of <span className="font-semibold">#10</span> to <span className="text-emerald-600 font-semibold">Completed</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
