import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ChevronLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const VideoPlayer = ({ content, onBack, theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100); // Default duration
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState(null);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('HD');
  
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const { isLoggedIn, authToken } = useAuth();
  
  // Simulate player initialization with token
  useEffect(() => {
    // In a real implementation, we would check if user is authenticated
    if (!isLoggedIn) {
      setError('Authentication required to play this content');
      return;
    }
    
    // Simulate initializing a stream with an auth token
    console.log(`Initializing stream for ${content?.title} with auth token`);
    
    // Simulate successful stream initialization after a delay
    const timer = setTimeout(() => {
      setIsBuffering(false);
      // Auto-start playback
      setIsPlaying(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [content, isLoggedIn, authToken]);
  
  // Hide controls after a period of inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      // Reset the timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      // Hide controls after 3 seconds of inactivity
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    // Add event listeners
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener('mousemove', handleMouseMove);
      playerElement.addEventListener('mouseleave', () => setShowControls(false));
      playerElement.addEventListener('mouseenter', () => setShowControls(true));
    }
    
    return () => {
      if (playerElement) {
        playerElement.removeEventListener('mousemove', handleMouseMove);
        playerElement.removeEventListener('mouseleave', () => setShowControls(false));
        playerElement.removeEventListener('mouseenter', () => setShowControls(true));
      }
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);
  
  // Update progress bar every second when playing
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const handleSeek = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
    // In a real player, you would seek to this position
  };
  
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if (playerRef.current.webkitRequestFullscreen) {
        playerRef.current.webkitRequestFullscreen();
      } else if (playerRef.current.msRequestFullscreen) {
        playerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  
  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
    setShowQualityMenu(false);
    
    // Simulate quality change with buffering
    setIsBuffering(true);
    setTimeout(() => {
      setIsBuffering(false);
    }, 1500);
  };
  
  // Format time (seconds) to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  if (!content) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white">No content selected</div>
      </div>
    );
  }
  
  return (
    <div 
      ref={playerRef}
      className="relative h-screen w-full bg-black overflow-hidden"
      onClick={togglePlay}
    >
      {/* Back button - always visible */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onBack();
        }}
        className="absolute top-4 left-4 z-30 flex items-center text-white bg-black/50 px-3 py-1 rounded-full hover:bg-black/70"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>
      
      {/* Video content (simulated) */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: content.backgroundImage 
          ? `url(${content.backgroundImage})` 
          : `linear-gradient(to right, ${content.color || '#000'}, #000)`
      }} />
      
      {/* Buffering indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="bg-red-900/80 text-white p-4 rounded-lg flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top controls - Title */}
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-bold">{content.title}</div>
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-2">
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #ff0000 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
              }}
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
          
          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause button */}
              <button 
                onClick={togglePlay}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              
              {/* Volume control */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(to right, white ${isMuted ? 0 : volume}%, rgba(255,255,255,0.3) ${isMuted ? 0 : volume}%)`
                  }}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Quality selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="text-white hover:text-gray-300 flex items-center gap-1"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm">{selectedQuality}</span>
                </button>
                
                {showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 p-2 rounded shadow-lg">
                    {['Auto', 'HD', 'SD', 'Low'].map(quality => (
                      <button
                        key={quality}
                        onClick={() => handleQualityChange(quality)}
                        className={`block w-full text-left px-3 py-1 text-sm rounded ${
                          selectedQuality === quality ? 'bg-red-600 text-white' : 'text-white hover:bg-gray-800'
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fullscreen button */}
              <button 
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;