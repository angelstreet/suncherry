import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just simulate a successful login
    // In a real implementation, you'd call your auth service here
    onLogin(username);
    onClose();
  };
  
  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black w-full max-w-md p-8 rounded relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xl">SunCherry</span>
          </div>
        </div>
        
        <p className="text-white text-center mb-6">
          Please login with your SunCherry credentials
        </p>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm block mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="0768017562"
                className="w-full bg-transparent border border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:border-gray-500"
              />
              <button type="button" className="absolute right-3 top-2.5 text-gray-400">
                <span className="text-gray-400">?</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-white text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-transparent border border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:border-gray-500"
              />
              <button 
                type="button" 
                className="absolute right-3 top-2.5 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-colors"
          >
            Login
          </button>
        </form>
        
        {/* Forgot Password Links */}
        <div className="mt-6 space-y-2 text-center">
          <a href="#" className="block text-red-600 hover:underline text-sm">
            Forgot your SunCherry password?
          </a>
        </div>
        
        {/* Skip Login Link */}
        <div className="mt-4 text-center">
          <button 
            onClick={handleSkip}
            className="text-gray-400 hover:text-white text-sm"
          >
            Skip login
          </button>
        </div>
        
        {/* Footer Links */}
        <div className="flex justify-between mt-8 text-xs text-gray-500">
          <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
          <a href="#" className="text-red-600 hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;