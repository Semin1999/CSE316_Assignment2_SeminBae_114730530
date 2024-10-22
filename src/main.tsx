/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './main.css';

// Render the React app inside the root element in the DOM
createRoot(document.getElementById('root')!).render(
  // Apply mainBody class to wrap the entire app, useful for global styling
  <div className='mainBody'>
    {/* StrictMode helps highlight potential problems in the app */}
    <StrictMode>
      {/* Render the App component (the entire app) */}
      <App />
    </StrictMode>
  </div>
);
