
import React, { useState } from 'react';
import { sweetPopup } from '../utils/animations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RiddleLevel {
  question: string;
  hint: string;
  answers: string[];
}

const SweetRiddle: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  // Define the 5 levels of riddles
  const levels: RiddleLevel[] = [
    {
      question: "Main hoon tumhari hansi, tumhari yaadon ki gudiya.",
      hint: "It's someone very close to you... like looking in a mirror! 💕",
      answers: ['best friend', 'you', 'my best friend', 'my friend', 'friend']
    },
    {
      question: "Jab bhi muskuraati ho, phool khilte hain mere dil mein.",
      hint: "Think of who brings the most joy to your heart! 🌸",
      answers: ['best friend', 'you', 'my best friend', 'my friend', 'friend']
    },
    {
      question: "Na durr, na paas, phir bhi hamesha saath.",
      hint: "Someone who is always with you in spirit, even when apart! ✨",
      answers: ['best friend', 'you', 'my best friend', 'my friend', 'friend', 'memories']
    },
    {
      question: "Bina kahe samajhne waali, bina bole saath dene waali.",
      hint: "Someone who understands you without words! 💭",
      answers: ['best friend', 'you', 'my best friend', 'my friend', 'friend', 'soulmate']
    },
    {
      question: "Zindagi ki kitaab mein sabse khoobsurat panna.",
      hint: "The most beautiful page in your life's book! 📖",
      answers: ['best friend', 'you', 'my best friend', 'my friend', 'friend', 'memories']
    }
  ];

  const randomQuotes = [
    "Your smile is the sunshine that brightens my darkest days! 💖",
    "Every moment with you is a treasure I keep in my heart! ✨",
    "In a world of change, our friendship is my favorite constant! 🧸",
    "You're the sparkle in my laughter and the comfort in my tears! 💫",
    "Life gave me many blessings, but you're my favorite one! 💝"
  ];

  const checkAnswer = () => {
    const normalizedAnswer = answer.toLowerCase().trim();
    const currentRiddle = levels[currentLevel];
    
    if (currentRiddle.answers.includes(normalizedAnswer)) {
      // Mark current level as completed
      setCompletedLevels([...completedLevels, currentLevel]);
      
      // Generate a random quote for the popup
      const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
      
      // Show success popup
      sweetPopup(randomQuote);
      
      // Reset for next level
      setAnswer('');
      setAttempts(0);
      
      // If not the last level, move to next level after a short delay
      if (currentLevel < levels.length - 1) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
        }, 1500);
      }
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        // Give a hint after 3 attempts
        sweetPopup(currentRiddle.hint);
      }
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setCompletedLevels([]);
    setAnswer('');
    setAttempts(0);
  };

  const currentRiddle = levels[currentLevel];
  const allLevelsCompleted = completedLevels.length === levels.length;

  return (
    <div className="bg-birthday-lavender bg-opacity-20 rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bubbly text-purple-500">Sweet Riddle Challenge</h3>
          <div className="flex space-x-1">
            {levels.map((_, index) => (
              <div 
                key={`level-${index}`} 
                className={`w-2 h-2 rounded-full ${
                  completedLevels.includes(index) 
                    ? 'bg-purple-500' 
                    : index === currentLevel && !allLevelsCompleted
                      ? 'bg-purple-300'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {!allLevelsCompleted ? (
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6 relative">
            <div className="absolute -top-3 -right-3 text-3xl animate-float" style={{animationDelay: '0.7s'}}>💭</div>
            
            <p className="text-xl font-handwritten text-gray-700 italic mb-4">
              "{currentRiddle.question}"
            </p>
            <p className="font-cute text-gray-600">Guess who am I?</p>
            <p className="text-xs text-gray-400 mt-2">Level {currentLevel + 1} of {levels.length}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6 relative text-center">
            <div className="absolute -top-3 -left-3 text-3xl animate-float" style={{animationDelay: '0.4s'}}>✨</div>
            <div className="absolute -top-3 -right-3 text-3xl animate-float" style={{animationDelay: '0.7s'}}>💖</div>
            
            <p className="text-xl font-handwritten text-purple-600 mb-2">
              You've completed all the riddles!
            </p>
            <p className="font-cute text-gray-600">
              Your brilliance shines as bright as our friendship!
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <span className="text-2xl animate-float" style={{animationDelay: '0.1s'}}>🎉</span>
              <span className="text-2xl animate-float" style={{animationDelay: '0.3s'}}>💝</span>
              <span className="text-2xl animate-float" style={{animationDelay: '0.5s'}}>🎈</span>
            </div>
          </div>
        )}
      </div>
      
      {!allLevelsCompleted ? (
        <div className="space-y-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="font-cute border-birthday-pink focus:ring-birthday-pink"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          
          <Button 
            onClick={checkAnswer} 
            className="w-full bg-gradient-to-r from-birthday-pink to-birthday-lavender hover:from-birthday-lavender hover:to-birthday-pink font-bubbly"
          >
            Check Answer
          </Button>
        </div>
      ) : (
        <Button 
          onClick={resetGame} 
          className="w-full bg-gradient-to-r from-birthday-pink to-birthday-lavender hover:from-birthday-lavender hover:to-birthday-pink font-bubbly"
        >
          Play Again
        </Button>
      )}
    </div>
  );
};

export default SweetRiddle;
