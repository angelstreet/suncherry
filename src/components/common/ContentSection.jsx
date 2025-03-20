import React from 'react';
import ContentCard from './ContentCard';

const ContentSection = ({ title, items, theme, showAll = true }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showAll && (
          <a 
            href="#" 
            className="text-red-600 text-sm hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Show all
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default ContentSection;