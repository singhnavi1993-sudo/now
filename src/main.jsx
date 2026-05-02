import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import GamesPage from './GamesPage.jsx';
import { browseCategories, categorySlug, gameSlug, gamesData } from './gamesData';

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

const isGamesIndexPage = path === '/games' || path === '/games/';
const isGameDetailPage = /^\/games\/[a-z0-9-]+\.html\/?$/.test(path);
const isCategoryPage = /^\/games\/category\/[a-z0-9-]+\.html\/?$/.test(path);

if (isGameDetailPage) {
  const gamePathSlug = path.replace(/^\/games\//, '').replace(/\.html\/?$/, '');
  const gameExists = gamesData.some((g) => gameSlug(g) === gamePathSlug);
  if (!gameExists) {
    window.location.replace('https://now-gg.com/games/');
  }
}

if (isCategoryPage) {
  const categoryPathSlug = path.replace(/^\/games\/category\//, '').replace(/\.html\/?$/, '');
  const exists = browseCategories.some((name) => categorySlug(name) === categoryPathSlug);
  if (!exists) {
    window.location.replace('https://now-gg.com/games/');
  }
}

const isGamesPage = isGamesIndexPage || isGameDetailPage || isCategoryPage;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isGamesPage ? <GamesPage /> : <App />}
  </StrictMode>
);
