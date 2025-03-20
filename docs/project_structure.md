# SunriseTV Web App - Project Structure

The SunriseTV web application has been structured with modularity and maintainability in mind. Below is the file organization and a brief description of each component.

```
src/
├── components/
│   ├── common/
│   │   ├── ContentCard.jsx         # Reusable card for displaying content items
│   │   ├── ContentSection.jsx      # Section of content with title and grid of cards
│   │   └── HeroCarousel.jsx        # Featured content carousel for homepage
│   ├── layout/
│   │   ├── Footer.jsx              # Application footer
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   └── ThemeModal.jsx          # Theme toggle modal
│   └── pages/
│       ├── HomePage.jsx            # Home page component
│       ├── RecordingsPage.jsx      # Saved content/recordings page
│       └── TvGuidePage.jsx         # TV Guide page
├── constants/
│   ├── contentData.js              # Mock data for content display
│   ├── menuItems.js                # Navigation menu items
│   ├── recordingsData.js           # Mock data for recordings and watchlist
│   └── tvGuideData.js              # Mock data for TV Guide
├── App.jsx                         # Main application component
├── index.css                       # Global styles
└── main.jsx                        # Application entry point
```

## Component Design

### Layout Components

- **Navbar**: Provides navigation between different sections of the app and access to theme settings
- **Footer**: Contains links to various sections, legal information, and app version
- **ThemeModal**: Allows switching between light and dark theme

### Page Components

- **HomePage**: Features a hero carousel and content sections
- **TvGuidePage**: Displays TV programs in a time-based grid
- **RecordingsPage**: Shows saved content with tab navigation

### Common Components

- **ContentCard**: Reusable card with hover effects for displaying media items
- **ContentSection**: Groups related content items with a title and grid layout
- **HeroCarousel**: Featured content slider with navigation controls

## Data Management

For this prototype, we're using mock data stored in constant files:

- **menuItems.js**: Navigation menu structure
- **contentData.js**: Homepage content (hero slides, VOD items)
- **tvGuideData.js**: TV channel and program information
- **recordingsData.js**: Recorded content and watchlist items

## Styling Approach

- Using Tailwind CSS for utility-based styling
- Theme-aware components that respond to the active theme
- Responsive design that works across different screen sizes

## Next Steps

1. Implement additional pages (REPLAY, FILME & SERIEN)
2. Add responsive behavior for mobile devices 
3. Enhance accessibility features
4. Connect to Supabase for authentication and data persistence