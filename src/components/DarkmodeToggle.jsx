import { useEffect, useState } from "react";


const DarkmodeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
      );
    
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [darkMode]);
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 transition-all">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-6 py-3 bg-gray-800 text-white dark:bg-yellow-400 dark:text-black rounded-lg shadow-lg"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      );
};

export default DarkmodeToggle;