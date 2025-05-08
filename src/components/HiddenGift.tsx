
import React, { useState } from 'react';
import { sweetPopup } from '../utils/animations';
import { Button } from '@/components/ui/button';

interface GiftLevel {
  name: string;
  description: string;
  boxes: number;
  successMessage: string;
  emoji: string;
}

const HiddenGift: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [foundGift, setFoundGift] = useState(false);
  const [clickedBoxes, setClickedBoxes] = useState<number[]>([]);
  
  // Define the 5 levels
  const levels: GiftLevel[] = [
    {
      name: "First Surprise",
      description: "One of these beautiful gift boxes contains a special surprise just for you! Can you find it?",
      boxes: 6,
      successMessage: "You found it! Just like our friendship — full of hidden treasures and pure joy 🎁💫",
      emoji: "🎁"
    },
    {
      name: "Hidden Memories",
      description: "Our memories are like treasures. Can you find the special one hidden among these boxes?",
      boxes: 8,
      successMessage: "You found our special memory! It's one of many beautiful moments we've shared! 💖",
      emoji: "📷"
    },
    {
      name: "Secret Message",
      description: "I've hidden a secret message for you. Which box holds my words?",
      boxes: 10,
      successMessage: "You found my message! It says 'You're the most precious friend anyone could ask for!' 💌",
      emoji: "💌"
    },
    {
      name: "Birthday Wish",
      description: "A magical birthday wish awaits you! Find the right box to make it come true.",
      boxes: 12,
      successMessage: "My wish for you is a year filled with laughter, adventure, and all your dreams coming true! ✨",
      emoji: "🌠"
    },
    {
      name: "Grand Finale",
      description: "The final treasure hunt! Find the special box that holds my biggest heartfelt surprise!",
      boxes: 15,
      successMessage: "You found it! Our friendship is the greatest gift life has given me. Thank you for being you! 💝",
      emoji: "💝"
    }
  ];
  
  // Randomly select which box has the gift for current level
  const [giftBoxes] = useState(() => {
    return levels.map(level => Math.floor(Math.random() * level.boxes) + 1);
  });
  
  const randomQuotes = [
    "Finding you in this big world was my greatest luck! 💫",
    "Like this surprise, you bring joy to my everyday life! ✨",
    "Every moment with you is a gift I treasure! 🎁",
    "You light up my world with your beautiful presence! 💖",
    "Our bond is as precious as the rarest treasure! 💎"
  ];
  
  const checkBox = (boxNumber: number) => {
    if (clickedBoxes.includes(boxNumber)) {
      return; // Already clicked
    }
    
    setClickedBoxes([...clickedBoxes, boxNumber]);
    
    if (boxNumber === giftBoxes[currentLevel]) {
      setFoundGift(true);
      sweetPopup(levels[currentLevel].successMessage);
      
      // Mark level as completed
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }
    } else if (clickedBoxes.length === Math.floor(levels[currentLevel].boxes / 2) - 1) {
      // Give a hint after clicking half the boxes
      sweetPopup("Hint: Listen to your heart, it always knows where the treasures are! ❤️");
    }
  };
  
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setFoundGift(false);
      setClickedBoxes([]);
      
      // Select a random quote
      const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
      sweetPopup(randomQuote);
    }
  };
  
  const resetGame = () => {
    setCurrentLevel(0);
    setCompletedLevels([]);
    setFoundGift(false);
    setClickedBoxes([]);
    window.location.reload(); // Simple way to reset the gift boxes
  };
  
  const allLevelsCompleted = completedLevels.length === levels.length;
  const currentLevelData = levels[currentLevel];
  
  return (
    <div className="bg-birthday-yellow bg-opacity-20 rounded-3xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bubbly text-yellow-500">Find the Hidden Gift</h3>
        <div className="flex space-x-1">
          {levels.map((_, index) => (
            <div 
              key={`level-${index}`} 
              className={`w-2 h-2 rounded-full ${
                completedLevels.includes(index) 
                  ? 'bg-yellow-500' 
                  : index === currentLevel && !allLevelsCompleted
                    ? 'bg-yellow-300'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <p className="font-cute text-gray-600 mb-6 text-center">
        {currentLevelData.description}
        <span className="block text-xs mt-1">Level {currentLevel + 1}: {currentLevelData.name}</span>
      </p>
      
      {!foundGift ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-grow">
          {Array.from({ length: currentLevelData.boxes }).map((_, boxNum) => {
            const boxNumber = boxNum + 1;
            return (
              <div 
                key={boxNumber} 
                className={`gift-box flex items-center justify-center p-4 rounded-lg cursor-pointer ${
                  clickedBoxes.includes(boxNumber) ? 
                    'bg-gray-100 opacity-50' : 
                    'bg-white shadow-md hover:shadow-lg'
                }`}
                onClick={() => checkBox(boxNumber)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">
                    {clickedBoxes.includes(boxNumber) ? 
                      (boxNumber === giftBoxes[currentLevel] ? currentLevelData.emoji : '📦') : 
                      '🎁'}
                  </span>
                  <p className="font-handwritten text-center">
                    {clickedBoxes.includes(boxNumber) ? 
                      (boxNumber === giftBoxes[currentLevel] ? 'Found it!' : 'Not here...') : 
                      `Gift ${boxNumber}`
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <div className="text-7xl mb-4 animate-heartbeat">{currentLevelData.emoji}✨</div>
          <h4 className="text-2xl font-handwritten text-pink-500 mb-2">
            You found the treasure!
          </h4>
          <p className="font-cute text-gray-600 mb-6 max-w-xs mx-auto">
            Just like you found me in this big world, and made my life so much better!
          </p>
          
          {currentLevel < levels.length - 1 ? (
            <Button
              onClick={nextLevel}
              className="px-6 py-2 bg-birthday-yellow rounded-full font-bubbly hover:bg-yellow-300 transition"
            >
              Next Level
            </Button>
          ) : (
            !allLevelsCompleted ? (
              <Button
                onClick={() => setCompletedLevels([...Array(levels.length).keys()])}
                className="px-6 py-2 bg-birthday-yellow rounded-full font-bubbly hover:bg-yellow-300 transition"
              >
                Complete All Levels
              </Button>
            ) : (
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200 w-full">
                <p className="font-handwritten text-xl text-green-600">
                  You found all the treasures! 🎉
                </p>
                <p className="font-cute text-gray-600 mt-2">
                  But the greatest treasure is our friendship!
                </p>
                <Button
                  onClick={resetGame}
                  className="mt-4 bg-gradient-to-r from-birthday-yellow to-birthday-peach hover:bg-birthday-yellow font-bubbly"
                >
                  Play Again
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HiddenGift;
