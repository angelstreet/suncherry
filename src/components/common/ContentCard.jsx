import React from 'react';
import { Clock, Play } from 'lucide-react';

const ContentCard = ({ item, theme }) => {
  return (
    <div className="relative group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded">
        <div className="w-full h-32 bg-gray-800 transition-transform duration-300 group-hover:scale-105"></div>
        
        {/* Duration Badge */}
        {item.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded flex items-center gap-1 text-white">
            <Clock className="w-3 h-3" />
            {item.duration}
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-red-600 text-white p-2 rounded-full">
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Content info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium group-hover:text-red-500 transition-colors">{item.title}</h3>
        {item.genre && (
          <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{item.genre}</p>
        )}
      </div>
    </div>
  );
};

export default ContentCard;