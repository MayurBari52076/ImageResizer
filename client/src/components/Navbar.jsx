// src/components/Navbar.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">ImageResizer</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {darkMode ? <SunIcon className="text-yellow-300" /> : <MoonIcon className="text-gray-800" />}
      </button>
    </nav>
  );
};

export default Navbar;
