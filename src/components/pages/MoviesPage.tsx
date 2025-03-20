import React, { useState } from 'react';
import { Play, Film, Smile, Zap, Heart, AlertTriangle, Users, Clock } from 'lucide-react';
import { 
  MOVIES_CATEGORIES, 
  GENRE_FILTERS, 
  FEATURED_MOVIES, 
  MOVIE_CATEGORIES, 
  SERIES_CATEGORIES 
} from '../../constants/moviesData';

// Helper component for genre icons
const GenreIcon = ({ genre }) => {
  switch (genre) {
    case 'film': return <Film className="w-5 h-5" />;
    case 'smile': return <Smile className="w-5 h-5" />;
    case 'zap': return <Zap className="w-5 h-5" />;
    case 'heart': return <Heart className="w-5 h-5" />;
    case 'alert-triangle': return <AlertTriangle className="w-5 h-5" />;
    case 'users': return <Users className="w-5 h-5" />;
    default: return <Film className="w-5 h-5" />;
  }
};

const MoviesPage = ({ theme, onContentSelect }) => {
  const [activeCategory, setActiveCategory] = useState('MOVIES');
  const [activeGenre, setActiveGenre] = useState('all');
  
  const handleContentClick = (contentId) => {
    // Use the default if no real ID exists
    if (onContentSelect) {
      onContentSelect(contentId || "emmanuelle-2024");
    }
  };
  
  const handleFeaturedClick = (movieIndex) => {
    if (onContentSelect && FEATURED_MOVIES[movieIndex]) {
      onContentSelect(FEATURED_MOVIES[movieIndex].id);
    }
  };
  
  // Content to display based on active category
  const renderContent = () => {
    if (activeCategory === 'MOVIES') {
      return (
        <>
          {/* Featured Movies - Hero Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_MOVIES.map((movie, index) => (
                <div 
                  key={movie.id || index} 
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  onClick={() => handleFeaturedClick(index)}
                >
                  {/* Movie thumbnail */}
                  <div className={`h-64 ${movie.color} relative`}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Movie info */}
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-white text-lg font-bold mb-1">{movie.title}</h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.genre?.join(', ') || "Drama"}</span>
                      </div>
                      <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-1 rounded-full text-sm hover:bg-red-700 transition-colors">
                        <Play className="w-3 h-3" />
                        <span>Watch</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Genre filters */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {GENRE_FILTERS.map((genre) => (
                <button
                  key={genre.id}
                  className={`p-3 rounded flex flex-col items-center justify-center gap-2 text-xs ${
                    activeGenre === genre.id
                      ? 'bg-red-600 text-white'
                      : theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'
                  }`}
                  onClick={() => setActiveGenre(genre.id)}
                >
                  <GenreIcon genre={genre.icon} />
                  {genre.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Movie categories */}
          {MOVIE_CATEGORIES.map((category) => (
            <div key={category.title} className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <a href="#" className="text-red-600 text-sm hover:underline">Show all</a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((movie) => (
                  <div 
                    key={movie.id} 
                    className={`${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800'} 
                      rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
                    onClick={() => handleContentClick(movie.id)}
                  >
                    <div className={`h-40 ${movie.thumbnail} relative`}>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded flex items-center gap-1 text-white">
                        <Clock className="w-3 h-3" />
                        {movie.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{movie.title}</h3>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-1`}>
                        {movie.year}
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    } else if (activeCategory === 'SERIES') {
      return (
        <>
          {/* Series categories */}
          {SERIES_CATEGORIES.map((category) => (
            <div key={category.title} className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <a href="#" className="text-red-600 text-sm hover:underline">Show all</a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((series) => (
                  <div 
                    key={series.id} 
                    className={`${theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800'} 
                      rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
                    onClick={() => handleContentClick("blacklist-s01e01")} // Use series ID in real implementation
                  >
                    <div className={`h-40 ${series.thumbnail} relative`}>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded text-white">
                        {series.seasons} seasons
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{series.title}</h3>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-1`}>
                        {series.episodes} episodes
                      </div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {Array.isArray(series.genre) ? series.genre.join(', ') : series.genre}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    } else {
      // Placeholder for other categories
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-4">{activeCategory}</h2>
          <p className="opacity-70 mb-8">This section is coming soon.</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Browse Movies
          </button>
        </div>
      );
    }
  };
  
  return (
    <div className="w-full">
      {/* Categories navigation */}
      <div className={`border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-800'}`}>
        <div className="flex px-8">
          {MOVIES_CATEGORIES.map((category) => (
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
      
      {/* Content */}
      <div className="px-8 py-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default MoviesPage;