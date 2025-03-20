import React from 'react';

const Footer = ({ theme }) => {
  return (
    <footer className={`w-full py-6 px-8 border-t ${
      theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-800'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">SunCherry TV</h3>
          <ul className="space-y-2 opacity-70">
            <li>Home</li>
            <li>TV Guide</li>
            <li>Replay</li>
            <li>Movies & Series</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 opacity-70">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookie Settings</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 opacity-70">
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>
      
      <div className={`pt-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'} flex justify-between items-center text-sm opacity-70`}>
        <div>© 2025 SunCherry LLC. All rights reserved.</div>
        <div>Version 5.16.11010</div>
      </div>
    </footer>
  );
};

export default Footer;