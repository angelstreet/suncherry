# SunriseTV App Footer

The footer component appears at the bottom of the application, providing essential links and information for users. It maintains the app's theme consistency and provides navigation to secondary content.

## Structure

```jsx
<Footer theme={theme} />
```

## Design Specifications

- Adheres to application theme (dark/light mode)
- Full width with appropriate padding
- Subtle border separator from main content
- Reduced opacity for secondary nature of content

## Content Sections

### Company Information
- Logo (reduced size)
- Copyright information
- App version number: `Version: 5.16.11010+16653 prod`

### Quick Links
- **SunriseTV**
  - Home
  - Live TV
  - TV Guide
  - Replay
  - Movies & Series
  - Saved

### Legal Information
- Privacy Policy
- Terms & Conditions
- Cookie Policy
- Cookie Settings

### External Resources
- **More From Sunrise**
  - For Private Customers
  - For Business Clients
  - esports.ch
  - Spotlight
  - MySunrise
  - Support

### Social Media
- Twitter (@Sunrise_de)
- Facebook

## Implementation Example

```jsx
const Footer = ({ theme }) => {
  return (
    <footer className={`w-full mt-auto py-8 px-8 border-t ${
      theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-900 border-gray-800'
    }`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>Sunrise TV</h3>
            <ul className={`space-y-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
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
            <ul className={`space-y-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
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
            <ul className={`space-y-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
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
          theme === 'light' ? 'border-gray-200 text-gray-500' : 'border-gray-800 text-gray-400'
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
```

## Responsive Behavior

- **Desktop**: Three-column layout with all sections visible
- **Tablet**: Two-column layout with adjusted spacing
- **Mobile**: Single-column layout with sections stacked vertically

## Accessibility Considerations

- All interactive elements are properly labeled
- Sufficient color contrast between text and background
- Focus states for keyboard navigation
- Semantic HTML structure for screen readers