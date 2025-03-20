# SunriseTV Mockup - Content Selection Flow

This document outlines how content selection works across all main pages of the SunriseTV mockup application. The implementation allows users to select content from any page and view its details or play the content.

## Overview

We've implemented a unified content selection flow across all main pages:

1. **Home**
2. **TV Guide**
3. **Replay**
4. **Movies & Series**
5. **Saved Content (Recordings/Watchlist)**

Each page passes selected content to the parent App component, which then displays either:
- Content detail page
- Video player (when "Watch" or "Play" is clicked)

## Content Selection Implementation

### App Component

The App component manages the content selection state:

```jsx
const [selectedContent, setSelectedContent] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);

// Handle content selection
const handleContentSelect = (contentId) => {
  const content = getContentById(contentId) || SAMPLE_CONTENT_DETAILS.movie;
  setSelectedContent(content);
};

// Handle play button click
const handlePlayContent = (content) => {
  setSelectedContent(content);
  setIsPlaying(true);
};
```

This state determines which component is rendered:
- Regular page (Home, TV Guide, etc.)
- Content detail page
- Video player

### Page Components

Each page component receives an `onContentSelect` prop:

```jsx
<HomePage theme={theme} onContentSelect={handleContentSelect} />
<TvGuidePage theme={theme} onContentSelect={handleContentSelect} />
<ReplayPage theme={theme} onContentSelect={handleContentSelect} />
<MoviesPage theme={theme} onContentSelect={handleContentSelect} />
<RecordingsPage theme={theme} onContentSelect={handleContentSelect} />
```

### Content Detail Page

The detail page receives:
- The selected content object
- Back navigation function
- Play content function

```jsx
<ContentDetailPage 
  content={selectedContent}
  onBack={handleBackFromDetail}
  onPlay={handlePlayContent}
  theme={theme}
/>
```

## Implementation by Page Type

### Home Page

Content selection occurs when:
- User clicks on a content item in content sections
- User clicks the "Watch Now" button on the featured hero carousel

```jsx
const handleContentClick = (contentId) => {
  if (onContentSelect) {
    onContentSelect(contentId);
  }
};

const handleHeroContentClick = () => {
  if (FEATURED_CONTENT[currentSlide] && onContentSelect) {
    onContentSelect(FEATURED_CONTENT[currentSlide].id);
  }
};