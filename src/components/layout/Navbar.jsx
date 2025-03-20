import React, { useState } from 'react';
import { Search, Settings, User, Clock, LogIn, LogOut } from 'lucide-react';
import { MENU_ITEMS } from '../../constants/menuItems';
import ThemeModal from './ThemeModal';
import LoginModal from '../auth/LoginModal';
import { useAuth } from '../../context/AuthContext';
import SkinSelector from '../skin/SkinSelector';
import { useSkin } from '../../context/SkinContext';

const Navbar = ({ theme, onThemeChange, activeItem, setActiveItem }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { activeSkinData } = useSkin();

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div 
      className={`w-full ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      style={activeSkinData.id !== 'default' ? {
        borderBottom: `1px solid ${activeSkinData.accentColor}20` // Very subtle accent color border
      } : {}}
    >
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
                style={activeItem === item.id && activeSkinData.id !== 'default' ? {
                  color: activeSkinData.accentColor // Apply accent color to active item text
                } : {}}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.id);
                }}
              >
                {item.label}
              </a>
              {activeItem === item.id && (
                <div 
                  className="absolute bottom-0 left-0 w-full h-0.5"
                  style={activeSkinData.id !== 'default' ? {
                    backgroundColor: activeSkinData.accentColor
                  } : {
                    backgroundColor: '#dc2626' // Default red-600
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Skin Selector */}
          <SkinSelector theme={theme} />
          
          <Settings 
            className={`w-4 h-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'} opacity-70 hover:opacity-100 cursor-pointer`}
            onClick={() => setIsSettingsOpen(true)}
          />
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className={`h-6 w-6 rounded-full ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'} flex items-center justify-center`}>
                <User className={`w-3 h-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
              <span className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-xs`}>
                {user?.username || 'User'}
              </span>
              <button
                onClick={logout}
                className={`ml-2 rounded-full p-1 ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                <LogOut className={`w-3 h-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`} />
              </button>
            </div>
          ) : (
            <button 
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                theme === 'light' 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              } text-xs`}
              onClick={handleLoginClick}
              style={activeSkinData.id !== 'default' ? {
                backgroundColor: `${activeSkinData.accentColor}20`,
                color: activeSkinData.accentColor
              } : {}}
            >
              <LogIn className="w-3 h-3" />
              <span>Login</span>
            </button>
          )}
          
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
        
        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </nav>
    </div>
  );
};

export default Navbar;