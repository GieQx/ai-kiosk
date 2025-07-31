
import React, { useState, useEffect } from 'react';
import { ADS } from '../constants';
import type { Ad } from '../types';

const AdSidebar: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ADS.length);
    }, 8000); // Change ad every 8 seconds

    return () => clearInterval(timer);
  }, []);

  const currentAd = ADS[currentAdIndex];

  return (
    <aside className="w-1/4 max-w-md h-full bg-slate-800/50 p-8 flex flex-col justify-center items-center border-l-2 border-slate-700">
      <div key={currentAd.id} className="w-full h-full flex flex-col justify-center items-center animate-fade-in">
        {currentAd.type === 'image' ? (
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold text-cyan-300 mb-6">{currentAd.headline}</h2>
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img src={currentAd.content} alt={currentAd.headline} className="w-full h-full object-cover" />
            </div>
            <button className="mt-8 bg-cyan-500 text-white text-2xl font-bold py-4 px-10 rounded-full hover:bg-cyan-400 transition-colors duration-300 shadow-lg">
              {currentAd.cta}
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center text-center p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-2xl shadow-black/50">
            <h2 className="text-4xl font-bold text-cyan-300 mb-6">{currentAd.headline}</h2>
            <p className="text-2xl text-slate-300 flex-grow">{currentAd.content}</p>
            <button className="mt-8 bg-cyan-500 text-white text-2xl font-bold py-4 px-10 rounded-full hover:bg-cyan-400 transition-colors duration-300 shadow-lg self-center">
              {currentAd.cta}
            </button>
          </div>
        )}
      </div>
      <div className="absolute bottom-8 flex space-x-3">
        {ADS.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentAdIndex ? 'bg-cyan-400 scale-125' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </aside>
  );
};

export default AdSidebar;
