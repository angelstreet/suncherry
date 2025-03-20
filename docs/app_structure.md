If you want to create different layouts for web, mobile, and TV platforms, you'll need to adapt your app structure to support responsive design and possibly different component rendering based on the platform. Here's how you could modify the structure:

# Platform-Responsive SunriseTV App Structure

```
src/
├── assets/                    # Static assets
│   ├── icons/
│   │   ├── web/               # Web-specific icons
│   │   ├── mobile/            # Mobile-specific icons
│   │   └── tv/                # TV-specific icons
│   └── images/
│
├── components/
│   ├── common/                # Shared components across platforms
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
│   ├── layout/
│   │   ├── web/               # Web-specific layouts
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── MainLayout/
│   │   ├── mobile/            # Mobile-specific layouts
│   │   │   ├── BottomNav/
│   │   │   ├── Header/
│   │   │   └── DrawerMenu/
│   │   └── tv/                # TV-specific layouts
│   │       ├── SideMenu/
│   │       ├── FocusableNav/
│   │       └── TVLayout/
│   ├── home/
│   │   ├── web/
│   │   ├── mobile/
│   │   └── tv/
│   └── ... (other feature components with platform-specific versions)
│
├── hooks/
│   ├── useTheme.ts
│   ├── usePlatform.ts         # Hook to detect platform
│   ├── useTVNavigation.ts     # TV-specific navigation hooks
│   └── ...
│
├── context/
│   ├── PlatformContext.tsx    # Context to manage platform state
│   └── ...
│
├── utils/
│   ├── platform.ts            # Platform detection utilities
│   └── ...
│
├── layouts/                   # Root layouts for each platform
│   ├── WebLayout.tsx
│   ├── MobileLayout.tsx
│   └── TVLayout.tsx
│
├── pages/                     # Shared page logic
│   ├── Home/
│   │   ├── index.tsx          # Common logic
│   │   ├── WebHome.tsx        # Web-specific view
│   │   ├── MobileHome.tsx     # Mobile-specific view
│   │   └── TVHome.tsx         # TV-specific view
│   └── ... (other pages with platform-specific implementations)
│
├── routes/
│   ├── index.tsx              # Main router
│   ├── webRoutes.tsx          # Web-specific routes
│   ├── mobileRoutes.tsx       # Mobile-specific routes
│   └── tvRoutes.tsx           # TV-specific routes
│
├── styles/
│   ├── globals.css
│   ├── web.css                # Web-specific styles
│   ├── mobile.css             # Mobile-specific styles
│   └── tv.css                 # TV-specific styles
│
└── App.tsx                    # Root component with platform detection
```

## Implementation Strategy:

### 1. Platform Detection

Create a platform detection utility:

```typescript
// utils/platform.ts
export type Platform = 'web' | 'mobile' | 'tv';

export const detectPlatform = (): Platform => {
  // TV detection (typically based on user agent or specific APIs)
  if (navigator.userAgent.includes('SmartTV') || navigator.userAgent.includes('AppleTV')) {
    return 'tv';
  }
  
  // Mobile detection
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || window.innerWidth < 768) {
    return 'mobile';
  }
  
  // Default to web
  return 'web';
};
```

### 2. Platform Context

Create a context to share platform information:

```typescript
// context/PlatformContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, detectPlatform } from '../utils/platform';

type PlatformContextType = {
  platform: Platform;
  isMobile: boolean;
  isTV: boolean;
  isWeb: boolean;
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC = ({ children }) => {
  const [platform, setPlatform] = useState<Platform>('web');
  
  useEffect(() => {
    setPlatform(detectPlatform());
    
    // Optional: Add window resize listener for responsive changes
    const handleResize = () => {
      setPlatform(detectPlatform());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <PlatformContext.Provider 
      value={{
        platform,
        isMobile: platform === 'mobile',
        isTV: platform === 'tv',
        isWeb: platform === 'web'
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
```

### 3. Root App Component

Implement platform-specific rendering:

```typescript
// App.tsx
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import WebLayout from './layouts/WebLayout';
import MobileLayout from './layouts/MobileLayout';
import TVLayout from './layouts/TVLayout';

const AppContent = () => {
  const { isWeb, isMobile, isTV } = usePlatform();
  
  if (isTV) {
    return <TVLayout />;
  }
  
  if (isMobile) {
    return <MobileLayout />;
  }
  
  return <WebLayout />;
};

const App = () => {
  return (
    <PlatformProvider>
      <AppContent />
    </PlatformProvider>
  );
};

export default App;
```

### 4. TV-Specific Features

For TV platforms, add special navigation support:

```typescript
// hooks/useTVNavigation.ts
import { useEffect, useRef } from 'react';

export const useTVNavigation = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle arrow keys, Enter, Back button for TV remote navigation
      if (elementRef.current) {
        switch (e.key) {
          case 'ArrowUp':
            // Logic to navigate up
            break;
          case 'ArrowDown':
            // Logic to navigate down
            break;
          case 'ArrowLeft':
            // Logic to navigate left
            break;
          case 'ArrowRight':
            // Logic to navigate right
            break;
          case 'Enter':
            // Logic to select item
            elementRef.current.click();
            break;
          // Add more cases for other remote control buttons
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [elementRef]);
};
```

### 5. Responsive Components

Create components that adapt to each platform:

```typescript
// components/ContentCard/ContentCard.tsx
import { usePlatform } from '../../context/PlatformContext';

const ContentCard = ({ content }) => {
  const { platform } = usePlatform();
  
  if (platform === 'tv') {
    return <TVContentCard content={content} />;
  }
  
  if (platform === 'mobile') {
    return <MobileContentCard content={content} />;
  }
  
  return <WebContentCard content={content} />;
};

const WebContentCard = ({ content }) => {
  // Web-specific implementation
  return (
    <div className="web-card">
      {/* Web card layout */}
    </div>
  );
};

const MobileContentCard = ({ content }) => {
  // Mobile-specific implementation
  return (
    <div className="mobile-card">
      {/* Mobile card layout */}
    </div>
  );
};

const TVContentCard = ({ content }) => {
  // TV-specific implementation with focus handling
  const cardRef = useRef(null);
  useTVNavigation(cardRef);
  
  return (
    <div ref={cardRef} className="tv-card focusable">
      {/* TV card layout */}
    </div>
  );
};
```

## Additional Considerations:

### Media Queries

For simpler cases, you might use CSS media queries instead of completely different components:

```css
/* Base styles for all platforms */
.content-card {
  /* Shared styles */
}

/* Desktop/Web specific */
@media (min-width: 1024px) {
  .content-card {
    /* Web-specific styles */
  }
}

/* Tablet/Mobile specific */
@media (max-width: 1023px) {
  .content-card {
    /* Mobile-specific styles */
  }
}

/* TV specific - might require user agent detection in conjunction */
@media (min-width: 1920px) {
  .content-card.tv-mode {
    /* TV-specific styles */
  }
}
```

### Testing

Include platform-specific testing setup:

```
cypress/
├── e2e/
│   ├── web/
│   ├── mobile/
│   └── tv/
```

This structure provides flexibility for creating platform-specific experiences while maintaining shared business logic and minimizing code duplication. You can adapt the level of separation based on how different your UIs need to be across platforms.