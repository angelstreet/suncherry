import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { HERO_SLIDES, CONTENT_SECTIONS } from '../../constants/contentData';
import { FEATURED_CONTENT } from '../../constants/sampleContentData';

const HomePage = ({ theme, onContentSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleContentClick = (contentId) => {
    if (onContentSelect) {
      onContentSelect(contentId);
    }
  };
  
  const handleHeroContentClick = () => {
    // Use the featured content for the current slide
    if (FEATURED_CONTENT[currentSlide] && onContentSelect) {
      onContentSelect(FEATURED_CONTENT[currentSlide].id);
    }
  };

  return (
    <div>
      {/* Hero Section (A-spot) */}
      <div className="relative h-96 w-full">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            FEATURED_CONTENT[currentSlide]?.color || HERO_SLIDES[currentSlide]?.color || 'bg-gray-800'
          }`}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            {FEATURED_CONTENT[currentSlide]?.title || HERO_SLIDES[currentSlide].title}
          </h1>
          <p className="text-white/80 max-w-lg mb-4">
            {FEATURED_CONTENT[currentSlide]?.description || "Watch now on Sunrise TV"}
          </p>
          <button 
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded w-fit mt-2 hover:bg-red-700"
            onClick={handleHeroContentClick}
          >
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
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-4 gap-4">
              {section.items.map((item) => (
                <div 
                  key={item.id} 
                  className="relative group cursor-pointer"
                  onClick={() => handleContentClick(item.id || "emmanuelle-2024")} // Default to a sample content if no ID
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <div
                      className="w-full h-32 rounded bg-gray-800 transition-transform duration-200 group-hover:scale-105"
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