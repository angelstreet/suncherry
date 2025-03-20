import React, { useState } from 'react';
import { Clock, Search } from 'lucide-react';
import { REPLAY_CATEGORIES, REPLAY_SHOWS } from '../../constants/replayData';

const ReplayPage = ({ theme, onContentSelect }) => {
  const [activeCategory, setActiveCategory] = useState('DISCOVER');
  
  const handleContentClick = (contentId) => {
    // Use the default if no real ID exists
    if (onContentSelect) {
      onContentSelect(contentId || "kassensturz-20250318");
    }
  };
  
  return (
    <div className="w-full">
      {/* Categories navigation */}
      <div className={`border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-800'}`}>
        <div className="flex px-8">
          {REPLAY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-3 relative ${
                activeCategory === category.id 
                  ? theme === 'light' ? 'text-black font-medium' : 'text-white font-medium' 
                  : theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
              {activeCategory === category.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="px-8 py-4 flex items-center">
        <div className={`flex items-center px-3 py-2 rounded-full ${
          theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
        }`}>
          <Search className="w-4 h-4 opacity-60 mr-2" />
          <input
            type="text"
            placeholder="Search replay content..."
            className={`bg-transparent focus:outline-none ${
              theme === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400'
            } text-sm w-64`}
          />
        </div>
      </div>
      
      {/* Content sections */}
      <div className="px-8 py-4">
        {REPLAY_SHOWS.map((section) => (
          <div key={section.category} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{section.category}</h2>
              <a href="#" className="text-red-600 text-sm hover:underline">Show all</a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800'} 
                    rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
                  onClick={() => handleContentClick(item.id)}
                >
                  {/* Thumbnail */}
                  <div className={`h-40 ${item.thumbnail} relative`}>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded flex items-center gap-1 text-white">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  </div>
                  
                  {/* Content info */}
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-2`}>
                      {item.channel}
                    </div>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {item.available}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplayPage;