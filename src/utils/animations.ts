
// Animation utilities for sparkles, confetti, and other effects

export interface SparkleProps {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}

export function generateSparkles(count: number): SparkleProps[] {
  const sparkles: SparkleProps[] = [];
  
  for (let i = 0; i < count; i++) {
    sparkles.push({
      size: Math.random() * 5 + 3,
      color: getRandomColor(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3
    });
  }
  
  return sparkles;
}

export function getRandomColor(): string {
  const colors = [
    '#FFDEE2', // Pink
    '#E5DEFF', // Lavender
    '#D3E4FD', // Sky Blue
    '#FEF7CD', // Soft Yellow
    '#FDE1D3', // Peach
    '#FFE4E1', // Misty Rose
    '#E6E6FA', // Lavender Mist
    '#F0FFF0', // Honeydew
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

export function createConfetti(x: number, y: number): void {
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    // Random horizontal movement
    const leftOffset = (Math.random() - 0.5) * 200;
    const duration = Math.random() * 3 + 3;
    
    confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
    confetti.style.transform = `translateX(${leftOffset}px) rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      if (document.body.contains(confetti)) {
        document.body.removeChild(confetti);
      }
    }, duration * 1000);
  }
}

export function sweetPopup(message: string): void {
  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-lg z-50 max-w-md text-center';
  popup.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 40px rgba(255, 222, 226, 0.5)';
  
  // Add content
  popup.innerHTML = `
    <div class="relative">
      <p class="font-handwritten text-2xl text-pink-500 mb-4">${message}</p>
      <div class="flex justify-center gap-2 my-3">
        <span class="text-3xl animate-float" style="animation-delay: 0s;">🧸</span>
        <span class="text-3xl animate-float" style="animation-delay: 0.5s;">🎈</span>
        <span class="text-3xl animate-float" style="animation-delay: 1s;">💞</span>
      </div>
      <button class="mt-4 px-6 py-2 bg-birthday-pink hover:bg-pink-300 rounded-full font-bubbly transition-all">Close</button>
    </div>
  `;
  
  // Add to DOM
  document.body.appendChild(popup);
  
  // Add close functionality
  const closeButton = popup.querySelector('button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  }
  
  // Create confetti at center of screen
  createConfetti(window.innerWidth / 2, window.innerHeight / 2);
  
  // Play a soft sound if available
  // We'll add this functionality later
}

// Detect if device is touch-enabled
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Add or remove the touch-device class to html element
export function setupTouchDetection(): void {
  if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
  } else {
    document.documentElement.classList.remove('touch-device');
  }
  
  // Listen for touch events to dynamically update
  window.addEventListener('touchstart', function onFirstTouch() {
    document.documentElement.classList.add('touch-device');
    window.removeEventListener('touchstart', onFirstTouch);
  }, { once: true });
}
