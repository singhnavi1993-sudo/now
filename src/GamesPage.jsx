import React, { useMemo, useState } from 'react';
import { browseCategories, gamesData } from './gamesData';
import GameCard from './GameCard';
import './App.css';
import './GamesPage.css';

function NowLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden>
      <circle cx="15.5" cy="13.5" r="10.5" fill="#00E5FF" fillOpacity="0.82" />
      <circle cx="12.5" cy="25" r="10.5" fill="#FF1FA9" fillOpacity="0.82" />
      <circle cx="26" cy="24" r="10.5" fill="#C4FF00" fillOpacity="0.78" />
      <ellipse cx="20" cy="19" rx="5.8" ry="6.2" fill="#0d0d0d" />
      <circle cx="17.2" cy="17.8" r="1.25" fill="#ffffff" />
      <circle cx="22.8" cy="17.8" r="1.25" fill="#ffffff" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  'Browser Games': 'BG',
  'Casual Games': 'CG',
  'Strategy Games': 'SG',
  'Simulation Games': 'SM',
  'Role Playing Games': 'RP',
  'Action Games': 'AC',
  'Adventure Games': 'AD',
  'Puzzle Games': 'PZ',
  'Arcade Games': 'AR',
  'Sports Games': 'SP',
  'Casino Games': 'CS',
  'Racing Games': 'RC',
  'Card Games': 'CD',
  'Educational Games': 'ED',
  'Social Games': 'SO',
};

function shuffle(source) {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GamesPage() {
  const params = new URLSearchParams(window.location.search);
  const gameIdParam = Number(params.get('game'));

  const [search, setSearch] = useState('');
  const [moreVisible, setMoreVisible] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);
  const initialGame = gamesData.find((g) => g.id === gameIdParam) || gamesData[0];
  const [selectedGame, setSelectedGame] = useState(initialGame);
  const hotRailGames = gamesData.slice(0, 10);
  const popularGames = gamesData.slice(0, 20);
  const randomSix = useMemo(() => shuffle(gamesData).slice(0, 6), []);
  const moreGames = gamesData.slice(0, moreVisible);
  const hasMore = moreVisible < gamesData.length;

  const filteredPopular = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return popularGames;
    return popularGames.filter((g) => g.title.toLowerCase().includes(q));
  }, [popularGames, search]);

  const playerSrc = selectedGame.embedUrl || selectedGame.playUrl || selectedGame.link;

  return (
    <div className="games-page">
      <header className="games-header">
        <div className="games-header__inner">
          <a className="games-logo" href="/">
            <NowLogo />
            <span className="games-logo__wordmark">
              <span>now</span>
              <strong>.gg</strong>
            </span>
          </a>
          <input
            className="games-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
      </header>

      <main>
        <section className="hero">
          <aside className="hot-rail" aria-label="Hot games">
            {hotRailGames.map((g) => (
              <button
                key={`rail-${g.id}`}
                type="button"
                className="hot-rail__item"
                onClick={() => {
                  setSelectedGame(g);
                  setIsPlaying(true);
                }}
              >
                <img src={g.thumbnail} alt={g.title} />
              </button>
            ))}
          </aside>

          <div className={`hero-stage ${isPlaying ? 'hero-stage--playing' : ''}`}>
            <iframe
              className="hero-stage__iframe"
              src={playerSrc}
              title={`${selectedGame.title} game`}
              allow="autoplay; fullscreen; gamepad"
            />
            <div className="hero-stage__overlay" />
            <article className="hero-card">
              <img src={selectedGame.thumbnail} alt={selectedGame.title} />
              <h1>{selectedGame.title}</h1>
              <p>Play instantly in your browser. Add your game links and users will be redirected directly.</p>
              <button type="button" className="hero-card__cta" onClick={() => setIsPlaying(true)}>
                Play in browser
              </button>
            </article>
          </div>
        </section>

        <section className="games-section">
          <h2>Popular Games</h2>
          <div className="games-grid games-grid--popular">
            {filteredPopular.map((g) => (
              <button
                key={`popular-${g.id}`}
                type="button"
                className="card-link"
                onClick={() => {
                  setSelectedGame(g);
                  setIsPlaying(true);
                }}
              >
                <GameCard game={g} variant="topSquare" hoverRated />
              </button>
            ))}
          </div>

          <div className="games-grid games-grid--six">
            {randomSix.map((g) => (
              <button
                key={`random-${g.id}`}
                type="button"
                className="card-link"
                onClick={() => {
                  setSelectedGame(g);
                  setIsPlaying(true);
                }}
              >
                <article className="wide-tile">
                  <img src={g.thumbnail} alt={g.title} />
                  <h3>{g.title}</h3>
                </article>
              </button>
            ))}
          </div>
        </section>

        <section className="games-section">
          <h2>More Games</h2>
          <div className="games-grid games-grid--more">
            {moreGames.map((g) => (
              <button
                key={`more-${g.id}`}
                type="button"
                className="card-link"
                onClick={() => {
                  setSelectedGame(g);
                  setIsPlaying(true);
                }}
              >
                <GameCard game={g} variant="topSquare" hoverRated />
              </button>
            ))}
          </div>
          {hasMore ? (
            <div className="more-actions">
              <button type="button" onClick={() => setMoreVisible((v) => v + 16)}>
                Show More
              </button>
            </div>
          ) : null}
        </section>

        <section className="games-section">
          <h2>Explore by Categories</h2>
          <div className="category-grid category-grid--games-page">
            {browseCategories.map((name) => (
              <a key={name} href="https://now-gg.com/" target="_blank" rel="noreferrer" className="category-chip">
                <span className="category-chip__icon">{CATEGORY_ICONS[name] || '•'}</span>
                <span className="category-chip__label">{name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="games-footer">
        <div className="games-footer__crumbs">Home &gt; Games &gt; Casual Games &gt; {selectedGame.title}</div>
        <div className="games-footer__grid">
          <div>
            <a className="games-logo" href="/">
              <NowLogo />
              <span className="games-logo__wordmark">
                <span>now</span>
                <strong>.gg</strong>
              </span>
            </a>
          </div>
          <div>
            <h4>Games</h4>
            <p>Action</p><p>RPG</p><p>Strategy</p><p>Casual</p><p>Puzzle</p><p>Adventure</p><p>Simulation</p>
          </div>
          <div>
            <h4>Company</h4>
            <p>About Us</p><p>News</p>
            <h4>Resources</h4>
            <p>Blog</p><p>Developers</p>
          </div>
          <div>
            <h4>Help &amp; Support</h4>
            <p>Get in Touch</p><p>Help center</p>
            <h4>Social</h4>
            <p>YouTube</p><p>Discord</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


