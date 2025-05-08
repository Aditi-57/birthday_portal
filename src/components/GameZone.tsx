
import React from 'react';
import SweetRiddle from './SweetRiddle';
import ColorCard from './ColorCard';
import HiddenGift from './HiddenGift';

const GameZone: React.FC = () => {
  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bubbly text-center mb-3 text-birthday-blue">Fun Birthday Games</h2>
        <p className="text-xl font-handwritten text-center mb-10 text-gray-600">
          Because celebrating you deserves all the fun in the world!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SweetRiddle />
          <ColorCard />
          <HiddenGift />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 text-5xl animate-float" style={{animationDelay: '0.3s'}}>🎮</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-float" style={{animationDelay: '1s'}}>🎯</div>
    </section>
  );
};

export default GameZone;
