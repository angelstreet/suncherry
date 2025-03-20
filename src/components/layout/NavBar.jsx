import React, { useState } from 'react';
import { Search, Settings, User, Clock } from 'lucide-react';
import { MENU_ITEMS } from '../../constants/menuItems';
import ThemeModal from './ThemeModal';

const Navbar = ({ theme, onThemeChange, activeItem, setActiveItem }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={`w-full ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <nav className="h-12 flex items-center px-4">
        {/* Search Section */}
        <div className="flex items-center gap-6">
          <Search className={`w-4 h-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'} opacity-70`} />
        </div>

        {/* Main Navigation */}
        <div className="flex gap-8 ml-8">
          {MENU_ITEMS.map((item) => (
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

export default Navbar;