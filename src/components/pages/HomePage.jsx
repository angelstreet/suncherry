import React from 'react';
import { HERO_SLIDES, CONTENT_SECTIONS } from '../../constants/contentData';
import HeroCarousel from '../common/HeroCarousel';
import ContentSection from '../common/ContentSection';

const HomePage = ({ theme }) => {
  return (
    <div>
      <HeroCarousel slides={HERO_SLIDES} />
      
      <div className="px-8 py-6">
        {CONTENT_SECTIONS.map((section) => (
          <ContentSection 
            key={section.title}
            title={section.title}
            items={section.items}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;