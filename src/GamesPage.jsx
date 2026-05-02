import React, { useEffect, useMemo, useState } from 'react';
import { browseCategories, categoryPath, categorySlug, gamePath, gameSlug, gamesData } from './gamesData';
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
  'Free Browser Games': 'BG',
  'Casual Games': 'CG',
  'Strategy Games': 'SG',
  'Simulation Games': 'SM',
  'Role Playing Games': 'RP',
  'Action Games': 'AC',
  'Adventure Games': 'AD',
  'Puzzle Games': 'PZ',
  'Arcade Games': 'AR',
  'Sports Games': 'SP',
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

function normalize(value) {
  if (Array.isArray(value)) return value.join(' ').toLowerCase().trim();
  return String(value || '').toLowerCase().trim();
}

export default function GamesPage() {
  const path = window.location.pathname.toLowerCase();
  const gamePathMatch = path.match(/^\/games\/([a-z0-9-]+)\.html\/?$/);
  const categoryPathMatch = path.match(/^\/games\/category\/([a-z0-9-]+)\.html\/?$/);

  const [search, setSearch] = useState('');
  const [moreVisible, setMoreVisible] = useState(16);

  const pathGameSlug = gamePathMatch?.[1] || '';
  const pathCategorySlug = categoryPathMatch?.[1] || '';
  const selectedCategory = browseCategories.find((name) => categorySlug(name) === pathCategorySlug) || null;
  const isCategoryPage = Boolean(selectedCategory);

  const selectedGame = gamesData.find((g) => gameSlug(g) === pathGameSlug) || gamesData[0];
  const hotRailGames = gamesData.slice(0, 10);

  const baseGames = selectedCategory
    ? gamesData.filter((g) =>
        g.category.some((c) => categorySlug(`${c} Games`) === pathCategorySlug || categorySlug(c) === pathCategorySlug)
      )
    : gamesData;

  const categoryGames = baseGames.length > 0 ? baseGames : gamesData;
  const popularGames = categoryGames.slice(0, 20);
  const randomSix = useMemo(() => shuffle(gamesData).slice(0, 6), []);
  const moreGames = categoryGames.slice(0, moreVisible);
  const hasMore = moreVisible < categoryGames.length;

  const filteredPopular = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return popularGames;
    return popularGames.filter((g) => g.title.toLowerCase().includes(q));
  }, [popularGames, search]);
  const searchResults = useMemo(() => {
    const q = normalize(search);
    if (!q) return [];
    return gamesData.filter(
      (g) =>
        normalize(g.title).includes(q) ||
        normalize(g.category).includes(q) ||
        normalize(g.slug).includes(q)
    );
  }, [search]);
  const searchActive = search.trim().length > 0;

  useEffect(() => {
    document.title = 'Games - Play Online in Browser | now-gg.com';

    const setMeta = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) tag.setAttribute('property', name);
        else tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    if (pathGameSlug) {
      canonical.setAttribute('href', `https://now-gg.com/games/${pathGameSlug}.html`);
    } else if (pathCategorySlug) {
      canonical.setAttribute('href', `https://now-gg.com/games/category/${pathCategorySlug}.html`);
    } else {
      canonical.setAttribute('href', 'https://now-gg.com/games/');
    }

    setMeta(
      'description',
      'Browse and play popular online games instantly on now-gg.com/games/. No downloads, no installation, direct browser gameplay.'
    );
    setMeta('og:title', 'Games - Play Online in Browser | now-gg.com', true);
    setMeta('og:description', 'Browse and play popular online games instantly on now-gg.com/games/.', true);
    setMeta('og:url', canonical.getAttribute('href') || 'https://now-gg.com/games/', true);
  }, [pathCategorySlug, pathGameSlug]);

  const playerSrc = selectedGame.embedUrl || selectedGame.playUrl || selectedGame.link;

  return (
    <div className="games-page">
      <header className="games-header">
        <div className="games-header__inner">
          <a className="games-logo" href="/">
            <NowLogo />
            <span className="games-logo__wordmark">
              <span>now</span>
              <strong>-gg</strong>
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
        {searchActive ? (
          <section className="games-section">
            <h2>Search Results</h2>
            <div className="games-grid games-grid--more">
              {searchResults.map((g) => (
                <a key={`search-${g.id}`} className="card-link" href={gamePath(g)}>
                  <GameCard game={g} variant="topSquare" hoverRated />
                </a>
              ))}
            </div>
          </section>
        ) : isCategoryPage ? (
          <section className="games-section">
            <h2>{selectedCategory}</h2>
            <div className="games-grid games-grid--more">
              {categoryGames.map((g) => (
                <a key={`category-${g.id}`} className="card-link" href={gamePath(g)}>
                  <GameCard game={g} variant="topSquare" hoverRated />
                </a>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="hero">
              <aside className="hot-rail" aria-label="Hot games">
                {hotRailGames.map((g) => (
                  <a key={`rail-${g.id}`} href={gamePath(g)} className="hot-rail__item">
                    <img src={g.thumbnail} alt={g.title} />
                  </a>
                ))}
              </aside>

              <div className="hero-stage hero-stage--playing">
                <iframe
                  className="hero-stage__iframe"
                  src={playerSrc}
                  title={`${selectedGame.title} game`}
                  allow="autoplay; fullscreen; gamepad"
                />
              </div>
            </section>

            <section className="games-section">
              <h2>Popular Games</h2>
              <div className="games-grid games-grid--popular">
                {filteredPopular.map((g) => (
                  <a key={`popular-${g.id}`} className="card-link" href={gamePath(g)}>
                    <GameCard game={g} variant="topSquare" hoverRated />
                  </a>
                ))}
              </div>

              <div className="games-grid games-grid--six">
                {randomSix.map((g) => (
                  <a key={`random-${g.id}`} className="card-link" href={gamePath(g)}>
                    <article className="wide-tile">
                      <img src={g.thumbnail} alt={g.title} />
                      <h3>{g.title}</h3>
                    </article>
                  </a>
                ))}
              </div>
            </section>

            <section className="games-section">
              <h2>More Games</h2>
              <div className="games-grid games-grid--more">
                {moreGames.map((g) => (
                  <a key={`more-${g.id}`} className="card-link" href={gamePath(g)}>
                    <GameCard game={g} variant="topSquare" hoverRated />
                  </a>
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
                  <a key={name} href={categoryPath(name)} className="category-chip">
                    <span className="category-chip__icon">{CATEGORY_ICONS[name] || '•'}</span>
                    <span className="category-chip__label">{name}</span>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="games-footer">
        <div className="games-footer__crumbs">
          {isCategoryPage ? `Home > Games > ${selectedCategory}` : `Home > Games > Casual Games > ${selectedGame.title}`}
        </div>
        <div className="games-footer__grid">
          <div>
            <a className="games-logo" href="/">
              <NowLogo />
              <span className="games-logo__wordmark">
                <span>now</span>
                <strong>-gg</strong>
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
