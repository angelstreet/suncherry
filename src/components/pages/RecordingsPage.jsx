import React, { useState } from 'react';
import { RECORDINGS, WATCHLIST } from '../../constants/recordingsData';
import { Clock } from 'lucide-react';

const RecordingsPage = ({ theme, onContentSelect }) => {
  const [activeTab, setActiveTab] = useState('RECORDINGS');
  
  const tabs = [
    { id: 'RECORDINGS', label: 'RECORDINGS' },
    { id: 'WATCHLIST', label: 'WATCHLIST' },
    { id: 'CONTINUE', label: 'CONTINUE WATCHING' },
    { id: 'RENTED', label: 'RENTED' }
  ];
  
  const handleContentClick = (contentId) => {
    // In a real implementation, we would have unique IDs for each recording
    // For our mockup, we'll pass a sample content ID
    if (onContentSelect) {
      const isWatchlist = activeTab === 'WATCHLIST';
      const defaultContentId = isWatchlist ? "blacklist-s01e01" : "tagesschau-20250318";
      onContentSelect(contentId || defaultContentId);
    }
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Saved Content</h1>
      
      {/* Tabs */}
      <div className={`border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} mb-6`}>
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`pb-3 relative ${
                activeTab === tab.id 
                  ? theme === 'light' ? 'text-black font-medium' : 'text-white font-medium' 
                  : theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'RECORDINGS' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {RECORDINGS.map(recording => (
            <div 
              key={recording.id} 
              className={`${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800'} rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => handleContentClick(recording.id)}
            >
              <div className={`h-40 ${recording.thumbnail} relative`}></div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{recording.title}</h3>
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {recording.recordedDate} • {recording.duration}
                </div>
                <div className="text-sm mt-2">
                  {recording.episodes} episode{recording.episodes > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Watchlist tab */}
      {activeTab === 'WATCHLIST' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {WATCHLIST.map(item => (
            <div 
              key={item.id} 
              className={`${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800'} rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => handleContentClick(item.id)}
            >
              <div className={`h-40 ${item.thumbnail} relative`}></div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{item.title}</h3>
                <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {item.genre}
                </div>
                <div className="text-sm mt-2">
                  {item.episodes} episode{item.episodes > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Empty states for other tabs */}
      {(activeTab === 'CONTINUE' || activeTab === 'RENTED') && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-6 rounded-full bg-gray-700 flex items-center justify-center">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">Your {activeTab.toLowerCase()} is empty</h3>
          <p className="max-w-md text-center mb-6 opacity-70">
            Content you add to your {activeTab.toLowerCase()} will appear here for easy access.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Browse Content
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordingsPage;