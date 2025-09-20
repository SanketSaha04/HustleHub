import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsDark(false)}
        className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-xs hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        Light
      </button>
      <button
        onClick={() => setIsDark(true)}
        className="px-3 py-1.5 rounded-lg bg-gray-900 text-gray-100 text-xs hover:bg-gray-800 transition"
      >
        Dark
      </button>
    </div>
  );
}
