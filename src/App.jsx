import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import TvGuidePage from './components/pages/TvGuidePage';
import RecordingsPage from './components/pages/RecordingsPage';
import ReplayPage from './components/pages/ReplayPage';
import MoviesPage from './components/pages/MoviesPage';
import ContentDetailPage from './components/pages/ContentDetailPage';
import VideoPlayer from './components/player/VideoPlayer';
import { AuthProvider } from './context/AuthContext';
import { getContentById, SAMPLE_CONTENT_DETAILS } from './constants/sampleContentData';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeItem, setActiveItem] = useState('HOME');
  const [selectedContent, setSelectedContent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handle content selection
  const handleContentSelect = (contentId) => {
    // In a real app, you'd fetch the content details from an API
    // For our mockup, we'll use the sample data
    const content = getContentById(contentId) || SAMPLE_CONTENT_DETAILS.movie;
    setSelectedContent(content);
  };
  
  // Handle back navigation from detail view
  const handleBackFromDetail = () => {
    setSelectedContent(null);
  };
  
  // Handle play button click
  const handlePlayContent = (content) => {
    setSelectedContent(content);
    setIsPlaying(true);
  };
  
  // Handle back from player
  const handleBackFromPlayer = () => {
    setIsPlaying(false);
  };
  
  // Render content based on active menu item
  const renderContent = () => {
    // If we're playing content, show the video player
    if (isPlaying && selectedContent) {
      return (
        <VideoPlayer 
          content={selectedContent}
          onBack={handleBackFromPlayer}
          theme={theme}
        />
      );
    }
    
    // If we have selected content but not playing, show content details
    if (selectedContent && !isPlaying) {
      return (
        <ContentDetailPage 
          content={selectedContent}
          onBack={handleBackFromDetail}
          onPlay={handlePlayContent}
          theme={theme}
        />
      );
    }
    
    // Otherwise, show the appropriate page based on active menu item
    switch (activeItem) {
      case 'HOME':
        return <HomePage theme={theme} onContentSelect={handleContentSelect} />;
      case 'TV_GUIDE':
        return <TvGuidePage theme={theme} onContentSelect={handleContentSelect} />;
      case 'REPLAY':
        return <ReplayPage theme={theme} onContentSelect={handleContentSelect} />;
      case 'FILME':
        return <MoviesPage theme={theme} onContentSelect={handleContentSelect} />;
      case 'GESPEICHERT':
        return <RecordingsPage theme={theme} onContentSelect={handleContentSelect} />;
      default:
        return (
          <div className="p-8 flex flex-col items-center justify-center h-96">
            <h2 className="text-2xl font-bold mb-4">{activeItem.replace('_', ' ')}</h2>
            <p className="opacity-70">This section is under construction.</p>
          </div>
        );
    }
  };

  return (
    <AuthProvider>
      <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-black text-white'}`}>
        {/* Only show navbar if not in player mode */}
        {!isPlaying && (
          <Navbar 
            theme={theme} 
            onThemeChange={setTheme} 
            activeItem={activeItem} 
            setActiveItem={(item) => {
              setActiveItem(item);
              setSelectedContent(null); // Clear selected content when changing menu items
            }} 
          />
        )}
        <div className={`flex-grow ${isPlaying ? 'h-screen' : ''}`}>
          {renderContent()}
        </div>
        {!isPlaying && !selectedContent && <Footer theme={theme} />}
      </div>
    </AuthProvider>
  );
}

export default App;