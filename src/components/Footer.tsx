
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-handwritten text-birthday-pink mb-4 animate-float">
          Happy Birthday, My Forever Friend!
        </h2>
        
        <p className="font-cute text-gray-600 max-w-lg mx-auto mb-6">
          You mean the world to me. Let's make this year your most magical one yet!
          Here's to endless laughter, adventures, and memories waiting to be made.
        </p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <div className="text-5xl animate-heartbeat">❤️</div>
          <div className="text-5xl animate-float" style={{animationDelay: '0.5s'}}>✨</div>
          <div className="text-5xl animate-heartbeat" style={{animationDelay: '0.7s'}}>💖</div>
        </div>
        
        <p className="text-sm text-gray-500">Made with love, just for you.</p>
      </div>
      
      {/* Decorative balloons */}
      <div className="absolute -bottom-6 left-10 text-6xl balloon" style={{['--delay' as any]: '0.2'}}>🎈</div>
      <div className="absolute -bottom-6 right-10 text-6xl balloon" style={{['--delay' as any]: '0.7'}}>🎈</div>
      <div className="absolute -bottom-6 left-1/4 text-6xl balloon" style={{['--delay' as any]: '0.4'}}>🎈</div>
      <div className="absolute -bottom-6 right-1/4 text-6xl balloon" style={{['--delay' as any]: '1.1'}}>🎈</div>
      <div className="absolute -bottom-6 left-2/4 text-6xl balloon" style={{['--delay' as any]: '0.9'}}>🎈</div>
    </footer>
  );
};

export default Footer;
