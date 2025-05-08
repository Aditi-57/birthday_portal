
import React, { useEffect, useState, useRef } from 'react';

// Number of tail segments to create
const TAIL_SEGMENTS = 8;

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tailRefs = useRef<HTMLDivElement[]>([]);
  const cursorPositions = useRef<{x: number, y: number}[]>([]);
  
  useEffect(() => {
    // Initialize cursor position history
    cursorPositions.current = Array(TAIL_SEGMENTS).fill({ x: -100, y: -100 });
    
    // Update main cursor position
    const updatePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Add new position to the beginning of the history array
      cursorPositions.current.unshift(newPosition);
      // Remove the oldest position
      cursorPositions.current.pop();
      
      if (!isVisible) setIsVisible(true);
    };
    
    const updateCursorType = () => {
      // Check what element the cursor is currently over
      const element = document.elementFromPoint(position.x, position.y);
      if (!element) return;
      
      // Check if the element or any of its parents have cursor:pointer
      let currentElement: Element | null = element;
      let isPointerFound = false;
      
      while (currentElement && !isPointerFound) {
        const style = window.getComputedStyle(currentElement);
        if (style.cursor === 'pointer') {
          isPointerFound = true;
          break;
        }
        currentElement = currentElement.parentElement;
      }
      
      setIsPointer(isPointerFound);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Function to update the tail positions
    const updateTailPositions = () => {
      // Update each tail segment's position based on the history
      tailRefs.current.forEach((tailElement, index) => {
        if (tailElement && cursorPositions.current[index]) {
          const { x, y } = cursorPositions.current[index];
          tailElement.style.left = `${x}px`;
          tailElement.style.top = `${y}px`;
          
          // Make tail segments progressively smaller and more transparent
          const scale = 1 - (index * 0.08);
          const opacity = 1 - (index * 0.1);
          tailElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
          tailElement.style.opacity = `${opacity}`;
        }
      });
      
      requestAnimationFrame(updateTailPositions);
    };
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', updateCursorType);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Ensure the cursor is hidden when the document loads
    document.documentElement.style.cursor = 'none';
    
    // Start animation loop for tail
    const animationId = requestAnimationFrame(updateTailPositions);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
      document.documentElement.style.cursor = '';
    };
  }, [isVisible, position]);
  
  // Hide the cursor component on mobile (touch) devices
  useEffect(() => {
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    if (isTouchDevice()) {
      setIsVisible(false);
      document.documentElement.style.cursor = ''; // Restore the default cursor on touch devices
    }
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Dragon Tail Cursor - Main dot (tip) */}
      <div
        ref={cursorRef}
        className={`custom-cursor-tip fixed w-4 h-4 rounded-full pointer-events-none z-[9999] ${
          isPointer ? 'scale-125 bg-purple-500' : 'bg-pink-600'
        } transition-transform duration-100`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px 2px rgba(219, 39, 119, 0.6)'
        }}
        aria-hidden="true"
      />
      
      {/* Dragon Tail Segments */}
      {Array.from({ length: TAIL_SEGMENTS }).map((_, index) => (
        <div
          key={index}
          ref={(element) => {
            if (element) tailRefs.current[index] = element;
          }}
          className="custom-cursor-tail fixed rounded-full pointer-events-none z-[9998]"
          style={{
            width: `${5 + (index * 1)}px`,
            height: `${5 + (index * 1)}px`,
            left: '-100px',
            top: '-100px',
            backgroundColor: `rgba(219, 39, 119, ${1 - (index * 0.1)})`,
            transform: `translate(-50%, -50%) scale(${1 - (index * 0.08)})`,
            opacity: 1 - (index * 0.1),
            filter: 'blur(0.5px)',
            transition: index === 0 ? 'none' : `all ${index * 30}ms ease`
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default CustomCursor;
