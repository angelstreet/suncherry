import React, { useState } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { useSkin } from '../../context/SkinContext';

const SkinSelector = ({ theme }) => {
  const { activeSkin, setActiveSkin, availableSkins } = useSkin();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSkinSelect = (skinId) => {
    setActiveSkin(skinId);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button 
        className={`flex items-center gap-1 p-1 rounded-full ${
          theme === 'light' ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-gray-800'
        }`}
        onClick={handleToggle}
        title="Change skin"
      >
        <Palette className="w-4 h-4" />
        <ChevronDown className="w-3 h-3" />
      </button>
      
      {isOpen && (
        <div 
          className={`absolute right-0 top-full mt-1 p-2 rounded-lg shadow-lg z-50 ${
            theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-900 border border-gray-700'
          }`}
          style={{ minWidth: '200px' }}
        >
          <div className="mb-2 px-2 py-1 text-sm font-medium">
            Interface Skins
          </div>
          
          {Object.values(availableSkins).map(skin => (
            <button
              key={skin.id}
              className={`flex items-center w-full px-3 py-2 rounded-md text-left text-sm ${
                activeSkin === skin.id 
                  ? 'bg-red-600 text-white' 
                  : theme === 'light' 
                    ? 'text-gray-800 hover:bg-gray-100' 
                    : 'text-gray-200 hover:bg-gray-800'
              }`}
              onClick={() => handleSkinSelect(skin.id)}
            >
              <div className="flex-1">
                <div>{skin.name}</div>
                <div className={`text-xs ${activeSkin === skin.id ? 'text-white/70' : 'text-gray-500'}`}>
                  {skin.description}
                </div>
              </div>
              
              {skin.id !== 'default' && (
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: skin.accentColor || '#ccc' }}
                />
              )}
            </button>
          ))}
          
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 text-center px-2">
            Select a skin to customize your experience
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinSelector;