import React, { useState } from 'react';
import { TV_CHANNELS, TIME_SLOTS } from '../../constants/tvGuideData';

const TvGuidePage = ({ theme, onContentSelect }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };
  
  const handleWatchClick = () => {
    if (onContentSelect && selectedProgram) {
      // In a real app, we'd use the program's unique ID
      // For our mockup, we'll just use a sample ID
      onContentSelect("tagesschau-20250318");
    }
    setSelectedProgram(null);
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">TV Guide</h1>
      
      <div className="mb-4">
        <div className="flex space-x-4">
          <button className="bg-red-600 text-white px-4 py-1 rounded">Today</button>
          <button className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} hover:text-gray-200`}>Tomorrow</button>
          <button className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} hover:text-gray-200`}>Wednesday</button>
        </div>
      </div>
      
      {/* Time header */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-[120px_repeat(4,180px)] mb-4">
            <div className="p-2"></div>
            {TIME_SLOTS.map(time => (
              <div key={time} className="p-2 text-center font-medium">{time}</div>
            ))}
          </div>
          
          {/* Channels and programs */}
          {TV_CHANNELS.map(channel => (
            <div key={channel.id} className="grid grid-cols-[120px_repeat(4,180px)] mb-2">
              <div className={`p-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'} rounded-l flex items-center`}>
                <span className="font-medium">{channel.name}</span>
              </div>
              
              <div className="col-span-4 grid grid-cols-4 gap-1">
                {channel.programs.map(program => (
                  <div 
                    key={program.id}
                    className={`p-2 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} rounded 
                      hover:bg-red-600 transition-colors cursor-pointer`}
                    style={{ gridColumn: `span ${program.duration}` }}
                    onClick={() => handleProgramClick(program)}
                  >
                    <div className="font-medium">{program.title}</div>
                    <div className="text-sm opacity-70">
                      {program.startTime} - {program.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Program details popup */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className={`relative w-full max-w-md ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} rounded-lg p-6`}>
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
              onClick={() => setSelectedProgram(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedProgram.title}</h2>
            <div className="text-sm mb-4">{selectedProgram.startTime} - {selectedProgram.endTime}</div>
            <p className="text-sm mb-6">Program description would appear here. This content provides details about the selected program.</p>
            <div className="flex space-x-3">
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleWatchClick}
              >
                Watch
              </button>
              <button className="border border-gray-600 px-4 py-2 rounded hover:bg-gray-800">
                Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvGuidePage;