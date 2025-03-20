import React from 'react';
import { useSkin } from '../../context/SkinContext';

const SkinOverlay = () => {
  const { activeSkinData } = useSkin();
  
  // If using default skin, don't render an overlay
  if (activeSkinData.id === 'default') {
    return null;
  }
  
  return (
    <>
      {/* Background image overlay */}
      {activeSkinData.backgroundImage && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-10"
          style={{ 
            backgroundImage: `url(${activeSkinData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
      )}
      
      {/* Color overlay */}
      {activeSkinData.overlayColor && (
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundColor: activeSkinData.overlayColor }}
        />
      )}
      
      {/* Valentine's Day animation */}
      {activeSkinData.id === 'valentines' && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Primary emoji (hearts) */}
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={`heart-${index}`}
              className="absolute animate-falling-heart text-pink-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
                fontSize: `${20 + Math.random() * 30}px`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            >
              {activeSkinData.emoji}
            </div>
          ))}
          
          {/* Secondary emoji (roses) - fewer, slower */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={`rose-${index}`}
              className="absolute animate-falling-heart text-red-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 30}s`,
                animationDuration: `${15 + Math.random() * 25}s`,
                fontSize: `${25 + Math.random() * 20}px`,
                opacity: 0.3 + Math.random() * 0.5
              }}
            >
              {activeSkinData.secondaryEmoji}
            </div>
          ))}
          
          {/* Fixed decorations */}
          <div className="absolute top-10 left-10 text-pink-500 opacity-20 text-5xl">❤</div>
          <div className="absolute bottom-10 right-10 text-pink-500 opacity-20 text-5xl">❤</div>
          <div className="absolute top-40 right-20 text-red-500 opacity-15 text-4xl">🌹</div>
          <div className="absolute bottom-40 left-20 text-red-500 opacity-15 text-4xl">🌹</div>
        </div>
      )}
      
      {/* Champions League animation */}
      {activeSkinData.id === 'champions' && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Primary emoji (footballs) */}
          {Array.from({ length: 15 }).map((_, index) => (
            <div 
              key={`ball-${index}`}
              className="absolute animate-falling-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${8 + Math.random() * 15}s`,
                fontSize: `${15 + Math.random() * 25}px`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            >
              {activeSkinData.emoji}
            </div>
          ))}
          
          {/* Secondary emoji (trophies) - fewer */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={`trophy-${index}`}
              className="absolute animate-falling-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${12 + Math.random() * 20}s`,
                fontSize: `${20 + Math.random() * 15}px`,
                opacity: 0.2 + Math.random() * 0.4
              }}
            >
              {activeSkinData.secondaryEmoji}
            </div>
          ))}
          
          {/* Trophy decorations */}
          <div className="absolute top-20 right-20 text-yellow-500 opacity-20 text-5xl">🏆</div>
          <div className="absolute bottom-20 left-20 text-yellow-500 opacity-20 text-5xl">🏆</div>
        </div>
      )}
      
      {/* Christmas animation */}
      {activeSkinData.id === 'christmas' && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Primary emoji (snowflakes) */}
          {Array.from({ length: 30 }).map((_, index) => (
            <div 
              key={`snow-${index}`}
              className="absolute animate-falling-snow text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 25}s`,
                fontSize: `${10 + Math.random() * 20}px`,
                opacity: 0.5 + Math.random() * 0.5,
                filter: 'blur(0.5px)',
                textShadow: '0 0 5px rgba(255,255,255,0.5)'
              }}
            >
              {activeSkinData.emoji}
            </div>
          ))}
          
          {/* Secondary emoji (christmas trees) - fewer */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={`tree-${index}`}
              className="absolute animate-falling-snow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animationDelay: `${Math.random() * 30}s`,
                animationDuration: `${20 + Math.random() * 30}s`,
                fontSize: `${20 + Math.random() * 15}px`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            >
              {activeSkinData.secondaryEmoji}
            </div>
          ))}
          
          {/* Fixed decorations */}
          <div className="absolute top-10 right-10 text-green-600 opacity-20 text-5xl">🎄</div>
          <div className="absolute bottom-10 left-10 text-green-600 opacity-20 text-5xl">🎄</div>
        </div>
      )}
    </>
  );
};

export default SkinOverlay;