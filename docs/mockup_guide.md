    # SunriseTV Web Mockup Development Guide

This guide provides instructions for creating a working front-end mockup of the SunriseTV web application using Claude. The mockup will focus on three main pages (Home, TV Guide, and Recordings) with static data.

## Project Goal

Create a navigable mockup with:
- Consistent layout across pages
- Static data stored in separate constants files
- Basic navigation between pages
- Core UI components for each page
- Dark and light theme support

## Mockup Components

### 1. App Container & Layout

Start with the app container that includes:
- Theme state (dark/light)
- Navigation sidebar
- Main content area
- Theme toggle functionality

```jsx
// App.jsx
import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import MainContent from './components/layout/MainContent';
import Footer from './components/layout/Footer';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activePage, setActivePage] = useState('HOME');
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      <Navbar 
        theme={theme} 
        onThemeChange={setTheme} 
        activeItem={activePage}
        setActiveItem={setActivePage}
      />
      <MainContent theme={theme} activePage={activePage} />
      <Footer theme={theme} />
    </div>
  );
}

export default App;
```

### 2. Constants Files

Create separate files for all static data:

```jsx
// constants/menuItems.js
export const MENU_ITEMS = [
  { id: 'HOME', label: 'HOME' },
  { id: 'TV_GUIDE', label: 'TV GUIDE' },
  { id: 'REPLAY', label: 'REPLAY' },
  { id: 'FILME', label: 'FILME & SERIEN' },
  { id: 'GESPEICHERT', label: 'GESPEICHERT' }
];
```

```jsx
// constants/contentData.js
export const HERO_SLIDES = [
  {
    id: 1,
    title: "Celeste Beard: la face cachée d'une croqueuse de diamants",
    image: "https://picsum.photos/1920/600?random=1",
    description: "The untold story of a notorious jewelry thief..."
  },
  // Additional slides...
];

export const CONTENT_SECTIONS = [
  {
    title: "VOD TEST",
    items: [
      { id: 1, title: "Moonfall", duration: "2:30", image: "https://picsum.photos/240/135?random=1" },
      // More items...
    ]
  },
  // More sections...
];
```

```jsx
// constants/tvGuideData.js
export const TV_CHANNELS = [
  {
    id: "bbc1",
    name: "BBC ONE",
    logo: "/logos/bbc1.svg",
    programs: [
      { 
        id: "p1", 
        title: "Breakfast", 
        startTime: "08:00", 
        endTime: "10:30",
        description: "Morning news and features"
      },
      // More programs...
    ]
  },
  // More channels...
];

export const TIME_SLOTS = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
```

```jsx
// constants/recordingsData.js
export const RECORDINGS = [
  {
    id: "rec1",
    title: "Tagesschau - Hauptausgabe",
    channelLogo: "/logos/ard.svg",
    thumbnail: "https://picsum.photos/300/200?random=10",
    recordedDate: "2025-03-18",
    duration: "30 min",
    episodes: 1
  },
  // More recordings...
];

export const WATCHLIST = [
  {
    id: "watch1",
    title: "The Blacklist",
    channelLogo: "/logos/nbc.svg",
    thumbnail: "https://picsum.photos/300/200?random=20",
    genre: "Drama, Crime",
    episodes: 12
  },
  // More watchlist items...
];
```

### 3. Navigation Component

Create a navbar for navigation between pages:

```jsx
// components/layout/Navbar.jsx
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
```

### 4. Main Content Component

Create a content switcher based on active page:

```jsx
// components/layout/MainContent.jsx
import React from 'react';
import HomePage from '../pages/HomePage';
import TvGuidePage from '../pages/TvGuidePage';
import RecordingsPage from '../pages/RecordingsPage';

const MainContent = ({ theme, activePage }) => {
  // Switch content based on active page
  const renderContent = () => {
    switch (activePage) {
      case 'HOME':
        return <HomePage theme={theme} />;
      case 'TV_GUIDE':
        return <TvGuidePage theme={theme} />;
      case 'GESPEICHERT':
        return <RecordingsPage theme={theme} />;
      default:
        return <div className="p-8 text-center">Page under construction</div>;
    }
  };

  return (
    <div className={`w-full ${theme === 'light' ? 'bg-gray-100' : 'bg-black'} ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
      {renderContent()}
    </div>
  );
};

export default MainContent;
```

### 5. Page Components

#### Home Page

```jsx
// components/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { HERO_SLIDES, CONTENT_SECTIONS } from '../../constants/contentData';

const HomePage = ({ theme }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <div className="relative h-96 w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url('${HERO_SLIDES[currentSlide].image}')`,
            backgroundSize: 'cover'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            {HERO_SLIDES[currentSlide].title}
          </h1>
          <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded w-fit mt-4 hover:bg-red-700">
            <Play className="w-4 h-4" />
            <span>Watch Now</span>
          </button>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-8 py-6">
        {CONTENT_SECTIONS.map((section) => (
          <div key={section.title} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <a href="#" className="text-red-600 text-sm hover:underline">Show all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.items.map((item) => (
                <div key={item.id} className="relative group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded transition-transform duration-200 group-hover:scale-105"
                    />
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded flex items-center gap-1 text-white">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  </div>
                  {/* Title */}
                  <h3 className="mt-2 text-sm opacity-90 group-hover:opacity-100">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
```

#### TV Guide Page

```jsx
// components/pages/TvGuidePage.jsx
import React, { useState } from 'react';
import { TV_CHANNELS, TIME_SLOTS } from '../../constants/tvGuideData';

const TvGuidePage = ({ theme }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">TV Guide</h1>
        <div className="flex items-center space-x-4 mb-4">
          <button className="bg-gray-800 text-white px-4 py-1 rounded">Today</button>
          <button className="text-gray-400 hover:text-white">Tomorrow</button>
          <button className="text-gray-400 hover:text-white">Monday</button>
        </div>
      </div>
      
      {/* Time header */}
      <div className="relative overflow-x-auto">
        <div className="grid grid-cols-[150px_repeat(7,180px)] gap-1 mb-2">
          <div className="p-2 font-medium"></div>
          {TIME_SLOTS.map(time => (
            <div key={time} className="p-2 font-medium text-center">{time}</div>
          ))}
        </div>
        
        {/* Current time indicator */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-red-600" style={{ left: '300px' }}></div>
        
        {/* Channels and programs */}
        <div className="grid gap-1">
          {TV_CHANNELS.map(channel => (
            <div key={channel.id} className="grid grid-cols-[150px_repeat(7,180px)] gap-1">
              <div className={`p-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-900'} flex items-center`}>
                <div className="w-8 h-8 mr-2 flex items-center justify-center">
                  {channel.logo ? (
                    <img src={channel.logo} alt={channel.name} className="max-w-full max-h-full" />
                  ) : (
                    <span className="text-sm font-bold">{channel.name}</span>
                  )}
                </div>
                <span className="text-sm">{channel.name}</span>
              </div>
              
              {/* Channel programs */}
              <div className="col-span-7 grid grid-cols-7 gap-1">
                {channel.programs.map(program => {
                  // Calculate width based on duration
                  const startIndex = TIME_SLOTS.findIndex(t => t === program.startTime);
                  const endIndex = TIME_SLOTS.findIndex(t => t === program.endTime);
                  const span = endIndex - startIndex || 1;
                  
                  return (
                    <div 
                      key={program.id}
                      className={`col-span-${span} p-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'} 
                        rounded hover:bg-red-600 transition-colors cursor-pointer`}
                      style={{ gridColumn: `span ${span}` }}
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="text-sm font-medium truncate">{program.title}</div>
                      <div className="text-xs opacity-70">{program.startTime} - {program.endTime}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Program details popup */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className={`relative w-full max-w-md ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} rounded-lg p-6`}>
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
              onClick={() => setSelectedProgram(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedProgram.title}</h2>
            <div className="text-sm mb-4">{selectedProgram.startTime} - {selectedProgram.endTime}</div>
            <p className="text-sm mb-6">{selectedProgram.description || 'No description available.'}</p>
            <div className="flex space-x-3">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Watch
              </button>
              <button className="border border-gray-600 px-4 py-2 rounded hover:bg-gray-800">
                Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvGuidePage;
```

#### Recordings Page

```jsx
// components/pages/RecordingsPage.jsx
import React, { useState } from 'react';
import { RECORDINGS, WATCHLIST } from '../../constants/recordingsData';

const RecordingsPage = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('RECORDINGS');
  
  const tabs = [
    { id: 'RECORDINGS', label: 'RECORDINGS' },
    { id: 'WATCHLIST', label: 'WATCHLIST' },
    { id: 'CONTINUE', label: 'CONTINUE WATCHING' },
    { id: 'RENTED', label: 'RENTED' }
  ];
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Content</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-800 mb-6">
        <div className="flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`pb-3 px-1 relative ${
                activeTab === tab.id 
                  ? 'text-white font-medium' 
                  : 'text-gray-500 hover:text-gray-300'
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
              className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow`}
            >
              <div className="relative h-40">
                <img 
                  src={recording.thumbnail} 
                  alt={recording.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 rounded px-2 py-1 text-xs">
                  {recording.episodes} episode{recording.episodes > 1 ? 's' : ''}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{recording.title}</h3>
                  {recording.channelLogo && (
                    <img src={recording.channelLogo} alt="Channel" className="h-5" />
                  )}
                </div>
                <div className="text-sm opacity-70">
                  {recording.recordedDate} • {recording.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'WATCHLIST' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {WATCHLIST.map(item => (
            <div 
              key={item.id} 
              className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow`}
            >
              <div className="relative h-40">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.channelLogo && (
                    <img src={item.channelLogo} alt="Channel" className="h-5" />
                  )}
                </div>
                <div className="text-sm opacity-70 mb-2">
                  {item.genre}
                </div>
                <div className="text-xs">
                  {item.episodes} episode{item.episodes > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {(activeTab === 'CONTINUE' || activeTab === 'RENTED') && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 mb-4 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Your {activeTab.toLowerCase()} list is empty</h3>
          <p className="text-gray-500 text-center max-w-md">
            {activeTab === 'CONTINUE' 
              ? 'Videos you start watching will appear here so you can easily continue where you left off.' 
              : 'Movies and shows you rent will appear here for easy access during the rental period.'}
          </p>
          <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Browse Content
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordingsPage;
```

### 6. Footer Component

```jsx
// components/layout/Footer.jsx
import React from 'react';

const Footer = ({ theme }) => {
  return (
    <footer className={`w-full py-8 px-8 border-t ${
      theme === 'light' ? 'bg-gray-100 border-gray-200 text-gray-600' : 'bg-gray-900 border-gray-800 text-gray-300'
    }`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>Sunrise TV</h3>
            <ul className="space-y-2">
              <li>Home</li>
              <li>LIVE TV</li>
              <li>TV GUIDE</li>
              <li>Replay</li>
              <li>Movies & Series</li>
              <li>Saved</li>
            </ul>
          </div>
          
          {/* Legal Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>Legal</h3>
            <ul className="space-y-2">
              <li>Privacy</li>
              <li>Terms & Conditions</li>
              <li>Cookie policy</li>
              <li>Cookie settings</li>
            </ul>
          </div>
          
          {/* More From Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>More From Sunrise</h3>
            <ul className="space-y-2">
              <li>For Private Customers</li>
              <li>For Business Clients</li>
              <li>esports.ch</li>
              <li>Spotlight</li>
              <li>MySunrise</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className={`mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center ${
          theme === 'light' ? 'border-gray-200' : 'border-gray-800'
        }`}>
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span>© 2025 Sunrise LLC</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="opacity-80 hover:opacity-100">
              @Sunrise_de
            </a>
            <a href="#" className="opacity-80 hover:opacity-100">
              @SunriseCH
            </a>
          </div>
          
          <div className="text-sm mt-4 md:mt-0">
            Version: 5.16.11010+16653 prod
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### 7. Theme Modal Component

```jsx
// components/layout/ThemeModal.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeModal = ({ isOpen, setIsOpen, currentTheme, onThemeChange }) => {
  const handleThemeChange = (newTheme) => {
    onThemeChange(newTheme);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-80">
        <div className="mb-4">
          <h2 className="text-white text-lg font-semibold">Theme Settings</h2>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentTheme === 'dark' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-white/70 hover:bg-gray-700'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon className="w-4 h-4" />
            Dark Theme
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentTheme === 'light' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-white/70 hover:bg-gray-700'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun className="w-4 h-4" />
            Light Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
```

## Development Process

1. Start by creating the constants files for static data
2. Build the main app container with theme management
3. Create the layout components (Navbar, Footer, ThemeModal)
4. Implement the page components one by one
5. Test navigation and theme switching
6. Refine the UI and responsiveness

## Best Practices

1. Keep components focused on a single responsibility
2. Maintain consistent styling across components
3. Use descriptive variable and component names
4. Comment complex logic or calculations
5. Separate data from presentation components
6. Ensure responsive design works on various screen