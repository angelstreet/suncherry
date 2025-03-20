import React, { useState } from 'react';
import { Search, Settings, User, Clock, Play, Sun, Moon } from 'lucide-react';

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

const Navbar = ({ theme, onThemeChange }) => {
  const [activeItem, setActiveItem] = useState('HOME');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'TV_GUIDE', label: 'TV GUIDE' },
    { id: 'REPLAY', label: 'REPLAY' },
    { id: 'FILME', label: 'FILME & SERIEN' },
    { id: 'GESPEICHERT', label: 'GESPEICHERT' }
  ];

  return (
    <div className={`w-full ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <nav className="h-12 flex items-center px-4">
        {/* Search Section */}
        <div className="flex items-center gap-6">
          <Search className={`w-4 h-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'} opacity-70`} />
        </div>

        {/* Main Navigation */}
        <div className="flex gap-8 ml-8">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <a
                href="#"
                className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-sm ${
                  activeItem === item.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.id);
                }}
              >
                {item.label}
              </a>
              {activeItem === item.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600" />
              )}
            </div>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6 ml-auto">
          <Settings 
            className={`w-4 h-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'} opacity-70 hover:opacity-100 cursor-pointer`}
            onClick={() => setIsSettingsOpen(true)}
          />
          <User className={`w-4 h-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'} opacity-70 hover:opacity-100`} />
          <div className="flex items-center gap-2">
            <Clock className={`w-3 h-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'} opacity-70`} />
            <span className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-sm opacity-70`}>16:58</span>
          </div>
        </div>

        {/* Theme Settings Modal */}
        <ThemeModal 
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          currentTheme={theme}
          onThemeChange={onThemeChange}
        />
      </nav>
    </div>
  );
};

const MainContent = ({ theme }) => {
  const sections = [
    {
      title: "VOD TEST",
      items: [
        { id: 1, title: "Moonfall", duration: "2:30", image: "/api/placeholder/240/135" },
        { id: 2, title: "Ted 2", duration: "1:45", image: "/api/placeholder/240/135" },
        { id: 3, title: "Venom", duration: "2:15", image: "/api/placeholder/240/135" },
        { id: 4, title: "Chase", duration: "1:55", image: "/api/placeholder/240/135" }
      ]
    },
    {
      title: "Beliebt TV",
      items: [
        { id: 5, title: "Sport Show", duration: "1:30", image: "/api/placeholder/240/135" },
        { id: 6, title: "News Today", duration: "0:45", image: "/api/placeholder/240/135" },
        { id: 7, title: "Documentary", duration: "2:00", image: "/api/placeholder/240/135" },
        { id: 8, title: "Live Event", duration: "1:25", image: "/api/placeholder/240/135" }
      ]
    }
  ];

  return (
    <div className={`w-full ${theme === 'light' ? 'bg-gray-100' : 'bg-black'} ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
      {/* Hero Section (A-spot) */}
      <div className="relative h-96 w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://picsum.photos/1920/600')`,
            backgroundSize: 'cover'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Celeste Beard : la face cachée d'une croqueuse de diamants
          </h1>
          <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded w-fit mt-4 hover:bg-red-700">
            <Play className="w-4 h-4" />
            <span>Watch Now</span>
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-8 py-6">
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-4 gap-4">
              {section.items.map((item) => (
                <div key={item.id} className="relative group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/240/135?random=${item.id}`}
                      alt={item.title}
                      className="w-full rounded transition-transform duration-200 group-hover:scale-105"
                    />
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded flex items-center gap-1 text-white">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  </div>
                  {/* Title */}
                  <h3 className="mt-2 text-sm opacity-90 group-hover:opacity-100">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      <Navbar theme={theme} onThemeChange={setTheme} />
      <MainContent theme={theme} />
    </div>
  );
}

export default App;