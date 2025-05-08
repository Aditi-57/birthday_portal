
import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import PhotoGallery from '../components/PhotoGallery';
import GameZone from '../components/GameZone';
import MessageSender from '../components/MessageSender';
import Footer from '../components/Footer';
import FairyLights from '../components/FairyLights';
import CustomCursor from '../components/CustomCursor';

const Index = () => {
  useEffect(() => {
    // Play background music when the page loads (optional)
    // This is commented out as autoplay is often blocked by browsers
    /*
    const audio = new Audio('/path-to-soft-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay prevented by browser:', error);
      });
    }
    
    return () => {
      audio.pause();
    };
    */
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Custom Cursor - Dragon Tail */}
      <CustomCursor />
      
      {/* Realistic Rope Lights */}
      <FairyLights />
      
      <HeroSection />
      <PhotoGallery />
      <GameZone />
      <MessageSender />
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-birthday-pink hover:text-white transition-all z-50"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
