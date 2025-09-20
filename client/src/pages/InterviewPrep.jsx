import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function InterviewPrep() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/contests`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        // ✅ Map GitHub events to contest-like structure
        const mapped = Array.isArray(data)
          ? data.slice(0, 10).map((ev) => ({
              name: ev.type || "GitHub Event",
              site: ev.repo?.name || "GitHub",
              start_time: ev.created_at,
              end_time: ev.created_at,
              url: `https://github.com/${ev.repo?.name || ""}`,
            }))
          : [];

        setContests(mapped);
      } catch (e) {
        setError(e?.message || "Failed to load contests");
        setContests([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const empty =
    !loading && !error && Array.isArray(contests) && contests.length === 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        💻 Recent GitHub Events (Interview Prep)
      </h1>

      {loading && <p className="text-gray-600">Loading events...</p>}
      {!loading && error && <p className="text-red-600">Error: {error}</p>}
      {empty && (
        <p className="text-gray-500">No events available at the moment.</p>
      )}

      <ul className="space-y-4">
        {Array.isArray(contests) &&
          contests.map((contest, idx) => (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {contest.name}
              </h2>
              <p className="text-gray-600">Repo: {contest.site}</p>
              <p className="text-gray-500 text-sm">
                Time: {new Date(contest.start_time).toLocaleString()}
              </p>
              <a
                href={contest.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-indigo-600 hover:underline"
              >
                View on GitHub
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
