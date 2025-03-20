import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import TvGuidePage from './components/pages/TvGuidePage';
import RecordingsPage from './components/pages/RecordingsPage';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeItem, setActiveItem] = useState('HOME');
  
  // Render content based on active menu item
  const renderContent = () => {
    switch (activeItem) {
      case 'HOME':
        return <HomePage theme={theme} />;
      case 'TV_GUIDE':
        return <TvGuidePage theme={theme} />;
      case 'GESPEICHERT':
        return <RecordingsPage theme={theme} />;
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
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-black text-white'}`}>
      <Navbar 
        theme={theme} 
        onThemeChange={setTheme} 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
      />
      <div className="flex-grow">
        {renderContent()}
      </div>
      <Footer theme={theme} />
    </div>
  );
}

export default App;