import React, { createContext, useContext, useState, useEffect } from 'react';

// Available skins with their metadata
export const SKINS = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Standard SunCherry interface'
  },
  valentines: {
    id: 'valentines',
    name: 'Valentine\'s Day',
    description: 'Valentine\'s Day theme with hearts and roses',
    backgroundImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920',
    overlayColor: 'rgba(255, 0, 100, 0.03)',
    accentColor: '#ff3e6c',
    emoji: '❤',
    secondaryEmoji: '🌹',
    highlight: '#ffccd5',
    buttonColor: '#ff3e6c',
    buttonHoverColor: '#ff0a4c',
    seasonalContent: [
      {
        title: 'Valentine Special: Love Stories',
        description: 'Explore our collection of romantic movies',
        image: 'https://images.unsplash.com/photo-1454944338482-a69bb95894af'
      },
      {
        title: 'Romantic Comedies Marathon',
        description: 'Watch back-to-back rom-coms this Valentine\'s',
        image: 'https://images.unsplash.com/photo-1549995308-dd0ea1cdded8'
      }
    ]
  },
  champions: {
    id: 'champions',
    name: 'Champions League',
    description: 'UEFA Champions League special theme',
    backgroundImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920',
    overlayColor: 'rgba(30, 55, 153, 0.05)',
    accentColor: '#1e3799',
    emoji: '⚽',
    secondaryEmoji: '🏆',
    highlight: '#cfd9ff',
    buttonColor: '#1e3799',
    buttonHoverColor: '#0a26a1',
    seasonalContent: [
      {
        title: 'Champions League Final',
        description: 'Watch the biggest match in club football live',
        image: 'https://images.unsplash.com/photo-1562552476-8ac59b2a2e46'
      },
      {
        title: 'Road to Glory',
        description: 'Highlights from this season\'s Champions League',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0c'
      }
    ]
  },
  christmas: {
    id: 'christmas',
    name: 'Christmas',
    description: 'Festive holiday theme with snow effects',
    backgroundImage: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920',
    overlayColor: 'rgba(255, 0, 0, 0.02)',
    accentColor: '#c10f0f',
    emoji: '❄️',
    secondaryEmoji: '🎄',
    highlight: '#ffebeb',
    buttonColor: '#c10f0f',
    buttonHoverColor: '#a10000',
    seasonalContent: [
      {
        title: 'Christmas Movie Marathon',
        description: 'Enjoy the best holiday classics',
        image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf'
      }
    ]
  }
};

// Create the skin context
const SkinContext = createContext();

export const SkinProvider = ({ children }) => {
  const [activeSkin, setActiveSkin] = useState('default');
  
  // Check if a special event is active based on date
  useEffect(() => {
    const checkForSpecialEvents = () => {
      const today = new Date();
      const month = today.getMonth(); // 0-11
      const day = today.getDate(); // 1-31
      
      // Valentine's Day (February 14, and nearby dates)
      if (month === 1 && day >= 10 && day <= 17) {
        setActiveSkin('valentines');
        return;
      }
      
      // Champions League Final (simulate for last weekend in May)
      if (month === 4 && day >= 25 && day <= 31) {
        setActiveSkin('champions');
        return;
      }
      
      // Christmas season (December 1-31)
      if (month === 11) {
        setActiveSkin('christmas');
        return;
      }
      
      // Default to standard skin if no event is active
      setActiveSkin('default');
    };
    
    // Check on initial load
    checkForSpecialEvents();
    
    // Load saved skin preference
    const savedSkin = localStorage.getItem('suncherry_skin');
    if (savedSkin && SKINS[savedSkin]) {
      setActiveSkin(savedSkin);
    }
  }, []);
  
  // Save skin preference when it changes
  useEffect(() => {
    localStorage.setItem('suncherry_skin', activeSkin);
  }, [activeSkin]);
  
  // Special treatment for skin-specific elements
  useEffect(() => {
    // Add skin-specific CSS class to body for global styling if needed
    document.body.classList.forEach(cls => {
      if (cls.startsWith('skin-')) {
        document.body.classList.remove(cls);
      }
    });
    
    document.body.classList.add(`skin-${activeSkin}`);
    
    // Apply favicon or other document-level changes if needed
    // For example, you could change the favicon for seasonal events
    
    return () => {
      document.body.classList.remove(`skin-${activeSkin}`);
    };
  }, [activeSkin]);
  
  return (
    <SkinContext.Provider value={{ 
      activeSkin, 
      setActiveSkin, 
      activeSkinData: SKINS[activeSkin] || SKINS.default,
      availableSkins: SKINS,
      // Helper function to get skin-specific styling for components
      getSkinStyles: (element) => {
        const skin = SKINS[activeSkin] || SKINS.default;
        if (skin.id === 'default') return {};
        
        // Different styling based on element type
        switch(element) {
          case 'button':
            return {
              backgroundColor: skin.buttonColor || skin.accentColor,
              color: 'white',
              '&:hover': {
                backgroundColor: skin.buttonHoverColor || skin.accentColor
              }
            };
          case 'accent':
            return {
              color: skin.accentColor
            };
          case 'highlight':
            return {
              backgroundColor: skin.highlight || `${skin.accentColor}20`
            };
          default:
            return {};
        }
      }
    }}>
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = () => useContext(SkinContext);