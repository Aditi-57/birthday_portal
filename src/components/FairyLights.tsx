
import React, { useEffect, useRef } from 'react';
import { getRandomColor } from '../utils/animations';

const FairyLights: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full width
    canvas.width = window.innerWidth;
    canvas.height = 120; // Height for the fairy lights - increased for better drape
    
    // Fairy light properties
    const lightCount = Math.ceil(window.innerWidth / 40); // One light every ~40px
    const lights: {x: number, y: number, radius: number, color: string, phase: number, speed: number}[] = [];
    
    // Create lights
    for (let i = 0; i < lightCount; i++) {
      const x = (i / (lightCount - 1)) * canvas.width;
      // Create a draped curtain shape (double curve)
      const normalizedX = (x / canvas.width) * 2 - 1; // -1 to 1
      // Modified curve for more dramatic draping effect
      const y = 25 + 60 * Math.sin(Math.PI * normalizedX);
      
      lights.push({
        x,
        y,
        radius: 4 + Math.random() * 3, // Larger bulbs
        color: getRandomColor(), // Get pastel colors
        phase: Math.random() * Math.PI * 2, // Random starting phase
        speed: 0.02 + Math.random() * 0.03 // Random flicker speed
      });
    }
    
    // Draw rope (thick, visible cable)
    function drawRope() {
      // Draw thick rope for visibility
      ctx.beginPath();
      ctx.moveTo(0, 25);
      
      // Draw curve for rope with more dramatic draping
      for (let x = 0; x <= canvas.width; x += 5) {
        const normalizedX = (x / canvas.width) * 2 - 1; // -1 to 1
        const y = 25 + 60 * Math.sin(Math.PI * normalizedX);
        ctx.lineTo(x, y);
      }
      
      // Brown rope color with shadow for depth
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.7)'; 
      ctx.lineWidth = 3.5; // Thicker rope
      ctx.stroke();
      
      // Add subtle highlight to the rope for depth
      ctx.beginPath();
      ctx.moveTo(0, 24);
      
      for (let x = 0; x <= canvas.width; x += 5) {
        const normalizedX = (x / canvas.width) * 2 - 1;
        const y = 24 + 60 * Math.sin(Math.PI * normalizedX);
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = 'rgba(210, 180, 140, 0.3)'; 
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Animation loop
    let animationFrame: number;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the rope first
      drawRope();
      
      // Update and draw each light
      const time = performance.now() / 1000;
      
      for (const light of lights) {
        // Pulsating effect with more pronounced flicker
        const pulse = 0.6 + 0.4 * Math.sin(time * light.speed + light.phase);
        const radius = light.radius * pulse;
        
        // Draw the light socket - dark circle attached to rope
        ctx.beginPath();
        ctx.arc(light.x, light.y, radius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
        ctx.fill();
        
        // Draw the light bulb - with glow effect
        const gradient = ctx.createRadialGradient(
          light.x, light.y + radius * 1.2, 0,
          light.x, light.y + radius * 1.2, radius * 3
        );
        
        gradient.addColorStop(0, light.color);
        gradient.addColorStop(0.4, light.color.replace(')', ', 0.6)'));
        gradient.addColorStop(1, light.color.replace(')', ', 0)'));
        
        ctx.beginPath();
        ctx.arc(light.x, light.y + radius * 1.2, radius * 3, 0, Math.PI * 2); // Position below the rope
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw the light bulb (solid)
        ctx.beginPath();
        ctx.arc(light.x, light.y + radius * 1.2, radius, 0, Math.PI * 2);
        ctx.fillStyle = light.color;
        ctx.fill();
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      // Recalculate light positions
      for (let i = 0; i < lights.length; i++) {
        const x = (i / (lights.length - 1)) * canvas.width;
        const normalizedX = (x / canvas.width) * 2 - 1;
        const y = 25 + 60 * Math.sin(Math.PI * normalizedX);
        
        lights[i].x = x;
        lights[i].y = y;
      }
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};

export default FairyLights;
