import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeModal = ({ isOpen, setIsOpen, currentTheme, onThemeChange }) => {
  const handleThemeChange = (newTheme) => {
    onThemeChange(newTheme);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-80">
        <div className="mb-4">
          <h2 className="text-white text-lg font-semibold">Theme Settings</h2>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentTheme === 'dark' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-white/70 hover:bg-gray-700'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon className="w-4 h-4" />
            Dark Theme
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentTheme === 'light' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-white/70 hover:bg-gray-700'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun className="w-4 h-4" />
            Light Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;