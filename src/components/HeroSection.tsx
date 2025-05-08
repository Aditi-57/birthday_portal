
import React from 'react';
import { generateSparkles } from '../utils/animations';

const HeroSection: React.FC = () => {
  // Generate random sparkles for the background
  const sparkles = generateSparkles(30);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Sparkles background */}
      <div className="sparkles">
        {sparkles.map((sparkle, index) => (
          <div
            key={index}
            className="sparkle animate-twinkle absolute"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: sparkle.color,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating elements */}
      <div className="absolute w-full h-full pointer-events-none">
        {/* Hearts */}
        <div className="absolute top-[15%] left-[10%] text-5xl animate-float" style={{animationDelay: '0.5s'}}>❤️</div>
        <div className="absolute top-[30%] right-[15%] text-4xl animate-float" style={{animationDelay: '1.2s'}}>💕</div>
        <div className="absolute bottom-[20%] left-[20%] text-4xl animate-float" style={{animationDelay: '0.8s'}}>💖</div>
        <div className="absolute top-[60%] right-[20%] text-5xl animate-float" style={{animationDelay: '1.8s'}}>💝</div>
        
        {/* Balloons */}
        <div className="absolute top-[10%] right-[30%] text-6xl balloon" style={{['--delay' as any]: '0.3'}}>🎈</div>
        <div className="absolute top-[5%] left-[25%] text-5xl balloon" style={{['--delay' as any]: '1.1'}}>🎈</div>
        <div className="absolute bottom-[15%] right-[10%] text-5xl balloon" style={{['--delay' as any]: '0.7'}}>🎈</div>
      </div>

      {/* Text content */}
      <div className="z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bubbly text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 animate-float">
          Happy Birthday
        </h1>
        <h2 className="text-3xl md:text-5xl font-handwritten text-birthday-lavender mb-8">
          to the Most Precious Soul!
        </h2>
        
        <div className="relative inline-block">
          <h3 className="text-5xl md:text-7xl font-handwritten font-bold text-birthday-pink animate-heartbeat mb-12">
            Manjiri
          </h3>
          
          <div className="absolute -top-10 -right-12 text-4xl animate-float" style={{animationDelay: '0.3s'}}>
            ✨
          </div>
          <div className="absolute -bottom-6 -left-8 text-3xl animate-float" style={{animationDelay: '1s'}}>
            ✨
          </div>
        </div>
        
        <p className="max-w-lg mx-auto text-lg md:text-xl font-cute text-gray-600 mb-8">
          On this special day, I wanted to create something as unique and beautiful as our friendship.
          This is for you - made with love, memories, and lots of birthday magic!
        </p>
        
        <button onClick={() => {
          const photosSection = document.getElementById('photos');
          photosSection?.scrollIntoView({ behavior: 'smooth' });
        }} className="font-bubbly bg-gradient-to-r from-birthday-pink to-birthday-lavender hover:from-birthday-lavender hover:to-birthday-pink text-white py-3 px-8 rounded-full text-lg transform transition hover:scale-105 hover:shadow-lg">
          Start the Celebration!
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
