import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import GamesPage from './GamesPage.jsx';

const path = window.location.pathname.toLowerCase();
const redirectToHomePaths = new Set([
  '/category/games/',
  '/browsers-for-the-best-now-gg-performance/',
  '/category/games/page/2/',
  '/getting-started-with-now-gg/',
  '/how-to-unblock-now-gg/',
  '/now-gg-configuration-service-online/',
  '/advantages-of-now-gg-over-traditional-emulators/',
  '/biled/',
  '/disabling-browser-extensions-to-fix-now-gg-gaming-issues/',
  '/now-gg-gacha-club/',
  '/now-gg-minecraft/',
  '/now-gg-stumble-guys/',
  '/services/',
  '/snack-video-downloader/',
  '/contact-us/',
  '/about-us/',
  '/toca-boca/',
]);

if (redirectToHomePaths.has(path)) {
  window.location.replace('https://now-gg.com/');
}

const isGamesPage = path === '/games' || path === '/games/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isGamesPage ? <GamesPage /> : <App />}
  </StrictMode>
);
