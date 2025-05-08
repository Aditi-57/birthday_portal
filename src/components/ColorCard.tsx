
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { sweetPopup } from '../utils/animations';

interface ColoringLevel {
  name: string;
  template: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
  description: string;
}

const ColorCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#FF9999');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  
  const colors = [
    '#FF9999', // Pink
    '#9999FF', // Purple
    '#99CCFF', // Blue
    '#FFFF99', // Yellow
    '#99FF99', // Green
    '#FF99FF', // Magenta
    '#FFCC99', // Peach
    '#FFFFFF', // White
    '#000000', // Black
  ];

  const randomQuotes = [
    "Your creative touch turns everything into magic! ✨",
    "The colors of our friendship are the brightest of all! 🌈",
    "Every stroke of yours paints happiness in my heart! 💘",
    "Like this card, you make everything around you beautiful! 🎨",
    "Our memories together are as colorful as this masterpiece! 💖"
  ];
  
  // Define the 5 levels with different templates
  const levels: ColoringLevel[] = [
    {
      name: "Birthday Card",
      description: "Color this birthday card to make it special!",
      template: (ctx, width, height) => {
        // Simple birthday card template
        ctx.font = '20px Caveat, cursive';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('Color this birthday card!', width / 2, 30);
        
        // Draw card outline
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(20, 50, width - 40, height - 70);
        ctx.stroke();
        
        // Draw a simple cake outline
        ctx.beginPath();
        ctx.rect(width / 2 - 50, height / 2 - 30, 100, 60);
        ctx.moveTo(width / 2 - 50, height / 2);
        ctx.lineTo(width / 2 + 50, height / 2);
        ctx.moveTo(width / 2, height / 2 - 30);
        ctx.lineTo(width / 2, height / 2 - 50);
        ctx.stroke();
        
        // Draw a heart outline
        const heartX = width / 2;
        const heartY = height / 2 + 60;
        ctx.beginPath();
        ctx.moveTo(heartX, heartY + 10);
        ctx.bezierCurveTo(heartX - 30, heartY - 25, heartX - 30, heartY - 40, heartX, heartY - 15);
        ctx.bezierCurveTo(heartX + 30, heartY - 40, heartX + 30, heartY - 25, heartX, heartY + 10);
        ctx.stroke();
      }
    },
    {
      name: "Friendship Bracelet",
      description: "Color this friendship bracelet with your favorite colors!",
      template: (ctx, width, height) => {
        ctx.font = '20px Caveat, cursive';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('Color our friendship bracelet!', width / 2, 30);
        
        // Draw bracelet outline
        const centerY = height / 2;
        const radius = 80;
        
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(width / 2, centerY, radius, radius / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draw pattern on bracelet
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * 2 * Math.PI;
          const x = width / 2 + radius * Math.cos(angle);
          const y = centerY + (radius / 2) * Math.sin(angle);
          
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI);
          ctx.stroke();
        }
        
        // Draw heart charm
        const charmX = width / 2;
        const charmY = centerY + 30;
        
        ctx.beginPath();
        ctx.moveTo(charmX, charmY + 15);
        ctx.bezierCurveTo(charmX - 15, charmY, charmX - 15, charmY - 10, charmX, charmY);
        ctx.bezierCurveTo(charmX + 15, charmY - 10, charmX + 15, charmY, charmX, charmY + 15);
        ctx.stroke();
      }
    },
    {
      name: "Memory Frame",
      description: "Color this frame where our favorite memories live!",
      template: (ctx, width, height) => {
        ctx.font = '20px Caveat, cursive';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('Our Memory Frame', width / 2, 30);
        
        // Draw decorative frame
        const margin = 40;
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 3;
        
        // Outer frame
        ctx.beginPath();
        ctx.rect(margin, margin, width - 2 * margin, height - 2 * margin);
        ctx.stroke();
        
        // Inner frame
        ctx.beginPath();
        ctx.rect(margin + 15, margin + 15, width - 2 * (margin + 15), height - 2 * (margin + 15));
        ctx.stroke();
        
        // Corner decorations
        const cornerSize = 20;
        
        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(margin - 5, margin + cornerSize);
        ctx.lineTo(margin - 5, margin - 5);
        ctx.lineTo(margin + cornerSize, margin - 5);
        ctx.stroke();
        
        // Top-right corner
        ctx.beginPath();
        ctx.moveTo(width - margin - cornerSize, margin - 5);
        ctx.lineTo(width - margin + 5, margin - 5);
        ctx.lineTo(width - margin + 5, margin + cornerSize);
        ctx.stroke();
        
        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(width - margin + 5, height - margin - cornerSize);
        ctx.lineTo(width - margin + 5, height - margin + 5);
        ctx.lineTo(width - margin - cornerSize, height - margin + 5);
        ctx.stroke();
        
        // Bottom-left corner
        ctx.beginPath();
        ctx.moveTo(margin + cornerSize, height - margin + 5);
        ctx.lineTo(margin - 5, height - margin + 5);
        ctx.lineTo(margin - 5, height - margin - cornerSize);
        ctx.stroke();
        
        // Draw a heart in the center
        const heartX = width / 2;
        const heartY = height / 2;
        ctx.beginPath();
        ctx.moveTo(heartX, heartY + 20);
        ctx.bezierCurveTo(heartX - 20, heartY - 15, heartX - 20, heartY - 25, heartX, heartY - 10);
        ctx.bezierCurveTo(heartX + 20, heartY - 25, heartX + 20, heartY - 15, heartX, heartY + 20);
        ctx.stroke();
      }
    },
    {
      name: "Celebration Balloons",
      description: "Color these celebration balloons to make them festive!",
      template: (ctx, width, height) => {
        ctx.font = '20px Caveat, cursive';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('Celebration Balloons', width / 2, 30);
        
        // Draw balloon outlines
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 2;
        
        // First balloon
        ctx.beginPath();
        ctx.ellipse(width / 2 - 70, height / 2 - 40, 40, 50, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // String for first balloon
        ctx.beginPath();
        ctx.moveTo(width / 2 - 70, height / 2 + 10);
        ctx.quadraticCurveTo(width / 2 - 60, height / 2 + 40, width / 2 - 40, height - 50);
        ctx.stroke();
        
        // Second balloon
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2 - 60, 45, 55, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // String for second balloon
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 5);
        ctx.quadraticCurveTo(width / 2 + 10, height / 2 + 50, width / 2, height - 50);
        ctx.stroke();
        
        // Third balloon
        ctx.beginPath();
        ctx.ellipse(width / 2 + 70, height / 2 - 30, 35, 45, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // String for third balloon
        ctx.beginPath();
        ctx.moveTo(width / 2 + 70, height / 2 + 15);
        ctx.quadraticCurveTo(width / 2 + 60, height / 2 + 60, width / 2 + 40, height - 50);
        ctx.stroke();
        
        // Draw a bow at the bottom
        ctx.beginPath();
        ctx.ellipse(width / 2 - 15, height - 45, 15, 10, Math.PI / 4, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(width / 2 + 15, height - 45, 15, 10, -Math.PI / 4, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(width / 2, height - 55);
        ctx.lineTo(width / 2, height - 35);
        ctx.stroke();
      }
    },
    {
      name: "Friendship Mandala",
      description: "Color this mandala that represents our unbreakable bond!",
      template: (ctx, width, height) => {
        ctx.font = '20px Caveat, cursive';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('Friendship Mandala', width / 2, 30);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 2 - 40;
        
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 1;
        
        // Draw concentric circles
        for (let radius = maxRadius; radius > 20; radius -= 20) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        
        // Draw radial lines
        const numLines = 16;
        for (let i = 0; i < numLines; i++) {
          const angle = (i / numLines) * 2 * Math.PI;
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + maxRadius * Math.cos(angle),
            centerY + maxRadius * Math.sin(angle)
          );
          ctx.stroke();
        }
        
        // Draw petal patterns
        for (let i = 0; i < numLines; i++) {
          const angle1 = (i / numLines) * 2 * Math.PI;
          const angle2 = ((i + 0.5) / numLines) * 2 * Math.PI;
          
          const midRadius = maxRadius * 0.7;
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.quadraticCurveTo(
            centerX + midRadius * Math.cos((angle1 + angle2) / 2),
            centerY + midRadius * Math.sin((angle1 + angle2) / 2),
            centerX + (maxRadius * 0.5) * Math.cos(angle2),
            centerY + (maxRadius * 0.5) * Math.sin(angle2)
          );
          ctx.stroke();
        }
        
        // Draw center heart
        ctx.beginPath();
        const heartSize = 15;
        ctx.moveTo(centerX, centerY + heartSize);
        ctx.bezierCurveTo(
          centerX - heartSize, centerY, 
          centerX - heartSize, centerY - heartSize / 2, 
          centerX, centerY - heartSize / 4
        );
        ctx.bezierCurveTo(
          centerX + heartSize, centerY - heartSize / 2, 
          centerX + heartSize, centerY, 
          centerX, centerY + heartSize
        );
        ctx.stroke();
      }
    }
  ];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Reset canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the current level's template
    levels[currentLevel].template(ctx, canvas.width, canvas.height);
    
  }, [currentLevel]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
      
      // Prevent scrolling while drawing
      e.preventDefault();
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const completeCard = () => {
    if (!hasDrawn) {
      sweetPopup("Don't be shy! Add your colorful touch to the card first! 🎨");
      return;
    }
    
    // Mark level as completed
    if (!completedLevels.includes(currentLevel)) {
      setCompletedLevels([...completedLevels, currentLevel]);
    }
    
    // Select a random quote for the popup
    const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    sweetPopup(randomQuote);
    
    // If not the last level, move to next level after a short delay
    if (currentLevel < levels.length - 1) {
      setTimeout(() => {
        setCurrentLevel(currentLevel + 1);
        setHasDrawn(false);
      }, 1500);
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear and redraw the template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Re-initialize canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the current level's template
    levels[currentLevel].template(ctx, canvas.width, canvas.height);
    
    setHasDrawn(false);
  };
  
  const resetGame = () => {
    setCurrentLevel(0);
    setCompletedLevels([]);
    setHasDrawn(false);
    clearCanvas();
  };
  
  const allLevelsCompleted = completedLevels.length === levels.length;
  
  return (
    <div className="bg-birthday-peach bg-opacity-20 rounded-3xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bubbly text-orange-500">Color the Card</h3>
        <div className="flex space-x-1">
          {levels.map((_, index) => (
            <div 
              key={`level-${index}`} 
              className={`w-2 h-2 rounded-full ${
                completedLevels.includes(index) 
                  ? 'bg-orange-500' 
                  : index === currentLevel && !allLevelsCompleted
                    ? 'bg-orange-300'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <p className="text-sm font-cute text-gray-600 mb-2">
        {levels[currentLevel].description} (Level {currentLevel + 1})
      </p>
      
      <div className="flex mb-4 justify-center space-x-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 ${
              currentColor === color ? 'border-gray-800' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setCurrentColor(color)}
          />
        ))}
        
        <select 
          value={brushSize} 
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="ml-2 border border-gray-300 rounded px-2 py-1"
        >
          <option value="2">Thin</option>
          <option value="5">Medium</option>
          <option value="10">Thick</option>
        </select>
      </div>
      
      <div className="relative bg-white rounded-xl shadow-md flex-grow overflow-hidden mb-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="color-card-canvas w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      {!allLevelsCompleted ? (
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={clearCanvas}
            className="flex-1 font-cute"
          >
            Clear
          </Button>
          
          <Button 
            onClick={completeCard} 
            className="flex-1 bg-gradient-to-r from-birthday-peach to-birthday-pink hover:bg-birthday-pink font-bubbly"
          >
            Finish Card
          </Button>
        </div>
      ) : (
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="font-handwritten text-xl text-green-600">
            You completed all coloring levels! 🎨
          </p>
          <p className="font-cute text-gray-600 mt-2">
            Your artistic touch brightens my world!
          </p>
          <Button 
            onClick={resetGame}
            className="mt-4 bg-gradient-to-r from-birthday-peach to-birthday-pink hover:bg-birthday-pink font-bubbly"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ColorCard;
