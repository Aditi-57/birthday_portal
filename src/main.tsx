
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setupTouchDetection } from './utils/animations'

// Initialize touch detection
setupTouchDetection();

createRoot(document.getElementById("root")!).render(<App />);
