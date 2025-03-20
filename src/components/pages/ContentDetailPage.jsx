import React, { useState } from 'react';
import { ChevronLeft, Play, Plus, Monitor, Clock, Download, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ContentDetailPage = ({ content, onBack, theme }) => {
  const [activeTab, setActiveTab] = useState('Trailer');
  const { isLoggedIn } = useAuth();
  
  // If no content is provided, show a loading state
  if (!content) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading content...</div>
      </div>
    );
  }
  
  // Format the runtime nicely
  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins > 0 ? `${mins}min` : ''}`;
  };
  
  const handlePlayClick = () => {
    // In a real implementation, this would initiate playback
    // For our mockup, we'll just log the action
    console.log(`Playing content: ${content.title}`);
    // Here you would use your authentication token to start a stream
  };
  
  const handleRentNow = () => {
    // Simulating rent flow
    console.log(`Renting content: ${content.title}`);
    // In a real implementation, this would open a payment flow
  };
  
  const handleAddToWatchlist = () => {
    // Simulating adding to watchlist
    console.log(`Adding to watchlist: ${content.title}`);
  };
  
  return (
    <div className={`w-full ${theme === 'light' ? 'bg-gray-100' : 'bg-black'} min-h-screen`}>
      {/* Back button */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 z-10 flex items-center text-white hover:text-gray-300"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>
      
      {/* Hero section with background */}
      <div className="relative w-full h-[500px]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: content.backgroundImage 
              ? `url(${content.backgroundImage})` 
              : `linear-gradient(to right, ${content.color || '#000'}, #000)`
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        
        {/* Content details */}
        <div className="relative h-full flex flex-col justify-end p-8">
          {/* Logo or title */}
          <h1 className="text-5xl font-bold mb-4 text-white">{content.title}</h1>
          
          {/* Metadata */}
          <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
            {content.year && <span>{content.year}</span>}
            {content.runtime && (
              <>
                <span>•</span>
                <span>{formatRuntime(content.runtime)}</span>
              </>
            )}
            {content.rating && (
              <>
                <span>•</span>
                <span className="px-1 border border-white/30 text-xs">{content.rating}</span>
              </>
            )}
            {content.genre && (
              <>
                <span>•</span>
                <span>{Array.isArray(content.genre) ? content.genre.join(', ') : content.genre}</span>
              </>
            )}
          </div>
          
          {/* Description */}
          <p className="text-white/90 max-w-2xl mb-6">
            {content.description}
          </p>
          
          {/* Action buttons */}
          <div className="flex items-center gap-4 mb-4">
            {content.type === 'rental' ? (
              <button 
                className="bg-red-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-red-700"
                onClick={handleRentNow}
              >
                <Play className="w-5 h-5" />
                RENT NOW
              </button>
            ) : (
              <button 
                className="bg-red-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-red-700"
                onClick={handlePlayClick}
              >
                <Play className="w-5 h-5" />
                WATCH
              </button>
            )}
            
            <button 
              className="border border-gray-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800"
              onClick={handleAddToWatchlist}
            >
              <Plus className="w-5 h-5" />
              WATCHLIST
            </button>
            
            {content.availableOnTV && (
              <button className="border border-gray-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800">
                <Monitor className="w-5 h-5" />
                WATCH ON TV
              </button>
            )}
          </div>
          
          {/* Additional info */}
          <div className="flex items-center gap-8 text-white/70 text-sm">
            {content.availableUntil && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Available until {content.availableUntil}</span>
              </div>
            )}
            
            {content.language && (
              <div>
                <span>Audio: {content.language}</span>
              </div>
            )}
            
            {content.subtitles && (
              <div>
                <span>Subtitles: {content.subtitles}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabs section */}
      <div className="px-8 py-4 border-b border-gray-800">
        <div className="flex gap-8">
          {['Trailer', 'Cast & Crew', 'More like this'].map(tab => (
            <button
              key={tab}
              className={`pb-3 relative ${
                activeTab === tab 
                  ? 'text-white font-medium' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab content */}
      <div className="p-8">
        {activeTab === 'Trailer' && (
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            {content.trailerThumbnail ? (
              <img 
                src={content.trailerThumbnail} 
                alt={`${content.title} trailer`} 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${content.color || 'bg-gray-800'} rounded-lg`}>
                <Play className="w-16 h-16 text-white opacity-70" />
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'Cast & Crew' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(content.cast || []).map((person, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                  {person.image ? (
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Star className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <h3 className="text-white text-sm font-medium">{person.name}</h3>
                <p className="text-gray-500 text-xs">{person.role}</p>
              </div>
            ))}
            
            {/* If no cast is provided, show placeholders */}
            {(!content.cast || content.cast.length === 0) && (
              <>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                      <Star className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-white text-sm font-medium">Actor Name</h3>
                    <p className="text-gray-500 text-xs">Character</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        
        {activeTab === 'More like this' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(content.similar || []).map((item, index) => (
              <div key={index} className="cursor-pointer group">
                <div className={`aspect-[2/3] ${item.color || 'bg-gray-800'} rounded-lg mb-2 overflow-hidden`}>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white opacity-50" />
                    </div>
                  )}
                </div>
                <h3 className="text-white text-sm group-hover:text-red-500 transition-colors">{item.title}</h3>
                {item.price && (
                  <p className="text-gray-500 text-xs">For CHF {item.price}</p>
                )}
              </div>
            ))}
            
            {/* If no similar content is provided, show placeholders */}
            {(!content.similar || content.similar.length === 0) && (
              <>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="cursor-pointer group">
                    <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2">
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white opacity-50" />
                      </div>
                    </div>
                    <h3 className="text-white text-sm">Similar Title</h3>
                    <p className="text-gray-500 text-xs">For CHF 3.50</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetailPage;