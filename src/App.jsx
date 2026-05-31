import React, { useEffect, useMemo, useState } from 'react';
import { gamesData, categories, browseCategories, categoryPath, gamePath } from './gamesData';
import GameCard from './GameCard';
import homeSchema from './homeSchema.json';
import './App.css';

function normalize(s) {
  if (Array.isArray(s)) {
    return s.join(' ').toLowerCase().trim();
  }
  return String(s || '').toLowerCase().trim();
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="#42A5F5" strokeWidth="2" />
      <path d="M20 20l-4.5-4.5" stroke="#42A5F5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Icon-style mark: overlapping CMY circles + face (matches now.gg header artwork) */
function GamepadIcon({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="#ff42a5" aria-hidden>
      <path d="M16.5 9.5h-1V8h-1v1.5H13V11h1.5v1.5h1V11H17V9.5h-.5z" />
      <path d="M7.5 9C6.67 9 6 9.67 6 10.5S6.67 12 7.5 12 9 11.33 9 10.5 8.33 9 7.5 9zm-2 3c-.83 0-1.5.67-1.5 1.5S4.67 15 5.5 15 7 14.33 7 13.5 6.33 12 5.5 12zm4 0c-.83 0-1.5.67-1.5 1.5S8.67 15 9.5 15 11 14.33 11 13.5 10.33 12 9.5 12zm-2 3c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18 9 17.33 9 16.5 8.33 15 7.5 15z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h7A6.5 6.5 0 0122 10.5v1A6.5 6.5 0 0115.5 18h-7A6.5 6.5 0 012 11.5v-1A6.5 6.5 0 018.5 4zm7 2h-7A4.5 4.5 0 004 10.5v1A4.5 4.5 0 008.5 16h7a4.5 4.5 0 004.5-4.5v-1A4.5 4.5 0 0015.5 6z"
      />
    </svg>
  );
}

function NowGgLogoMark() {
  return (
    <svg className="logo__mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden>
      <circle cx="15.5" cy="13.5" r="10.5" fill="#00E5FF" fillOpacity="0.82" />
      <circle cx="12.5" cy="25" r="10.5" fill="#FF1FA9" fillOpacity="0.82" />
      <circle cx="26" cy="24" r="10.5" fill="#C4FF00" fillOpacity="0.78" />
      <ellipse cx="20" cy="19" rx="5.8" ry="6.2" fill="#0d0d0d" />
      <circle cx="17.2" cy="17.8" r="1.25" fill="#ffffff" />
      <circle cx="22.8" cy="17.8" r="1.25" fill="#ffffff" />
    </svg>
  );
}

const VIDEO_QUOTES = [
  'No Downloads. No Installs. Play games INSTANTLY on now-gg',
  'Did you score? #unblockedgames #school',
  'Play Instantly on now-gg',
  'Breaking game records like OG😎',
  'Busted gaming on school laptop, but you are still lit🔥😎',
];

const BLOG_TITLES = [];

const CATEGORY_ICONS = {
  'Free Browser Games': '◔',
  'Casual Games': '♟',
  'Strategy Games': '♞',
  'Simulation Games': '⚖',
  'Role Playing Games': '♛',
  'Action Games': '🗡',
  'Adventure Games': '🧭',
  'Puzzle Games': '🧩',
  'Arcade Games': '◕',
  'Sports Games': '⚾',
  'Racing Games': '◉',
  'Card Games': '🂱',
  'Educational Games': '✎',
  'Social Games': '✿',
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moreVisibleCount, setMoreVisibleCount] = useState(16);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const filtered = useMemo(() => {
    const q = normalize(searchTerm);
    if (!q) return gamesData;
    return gamesData.filter(
      (g) =>
        normalize(g.title).includes(q) ||
        normalize(g.category).includes(q) ||
        normalize(g.slug).includes(q)
    );
  }, [searchTerm]);

  const topGames = gamesData.filter((g) => g.category === 'Trending');
  const nonTrending = gamesData.filter((g) => g.category !== 'Trending');
  const hotRowGames = [...topGames, ...nonTrending].slice(0, 8);
  const topGridGames = gamesData.slice(0, 16);
  const basePopularGames = gamesData.slice(16, 21);
  const popularGames =
    basePopularGames.length >= 5
      ? basePopularGames.slice(0, 5)
      : [...basePopularGames, ...gamesData.slice(0, 5 - basePopularGames.length)];
  const morePool = gamesData;
  const moreGames = morePool.slice(0, moreVisibleCount);
  const hasMoreHidden = moreVisibleCount < morePool.length;

  const searchActive = searchTerm.trim().length > 0;

  useEffect(() => {
    document.title = 'Play Online Games for Free | now-gg.com';

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
    canonical.setAttribute('href', 'https://now-gg.com/');

    setMeta(
      'description',
      'Play online games instantly on now-gg.com. Explore top games, popular picks, categories, and browser play without downloads.'
    );
    setMeta('og:title', 'Play Online Games for Free | now-gg.com', true);
    setMeta(
      'og:description',
      'Play online games instantly on now-gg.com. Browse top games and start playing in your browser.',
      true
    );
    setMeta('og:url', 'https://now-gg.com/', true);

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(homeSchema);
  }, []);

  return (
    <div className="site">
      <header className={`header ${isHeaderVisible ? '' : 'header--hidden'}`}>
        <div className="header__inner">
          <a className="logo" href="/" aria-label="now-gg home">
            <span className="logo__wordmark">
              <span className="logo__now">now</span>
              <span className="logo__gg">-gg</span>
            </span>
          </a>

          <label className="search">
            <span className="visually-hidden">Search</span>
            <div className="search__wrap">
              <SearchIcon />
              <input
                className="search__input"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                autoComplete="off"
              />
            </div>
          </label>
        </div>
      </header>

      <main className="main">
        {searchActive ? (
          <section className="section" aria-labelledby="search-results-title">
            <div className="section__head">
              <h2 id="search-results-title" className="section__title">
                Search results
              </h2>
              <span className="section__count">{filtered.length} games</span>
            </div>
            {filtered.length === 0 ? (
              <p className="muted">No games match your search.</p>
            ) : (
              <div className="grid grid--dense">
                {filtered.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="section section--hot" aria-labelledby="hot-games-title">
                <div className="hot-container">
                    <h2 id="hot-games-title" className="section__title section__title--with-icon">
                    <span className="section__title-text">Hot 🎮<br /> Games</span>
                    <span className="hot-divider"></span>
                    </h2>
                <div className="horizontal-divider"></div>

                <div className="hot-games-row">
                    {hotRowGames.map((game) => (
                    <div key={`hot-${game.id}`} className="hot-games-row__item">
                        <GameCard game={game} variant="orb" />
                    </div>
                    ))}
                </div>
                </div>
            </section>

            <section className="section section--top-grid" id="games" aria-labelledby="top-games-title">
              <div className="section__head">
                <h2 id="top-games-title" className="section__title section__title--large">
                  Top Games
                </h2>
              </div>

              <div className="grid-top-games">
                {topGridGames.map((game, i) => (
                  <a
                    key={game.id}
                    className="top-game-link"
                    href={gamePath(game)}
                  >
                    <GameCard game={game} variant="topSquare" featured={i === 0} hoverRated />
                  </a>
                ))}
              </div>
            </section>

            <section className="section section--popular" id="popular" aria-labelledby="popular-title">
              <div className="section__head">
                <h2 id="popular-title" className="section__title">
                  Popular Games
                </h2>
              </div>
              <div className="grid-top-games">
                {popularGames.map((game) => (
                  <a key={`popular-${game.id}`} className="top-game-link" href={gamePath(game)}>
                    <GameCard game={game} variant="topSquare" hoverRated />
                  </a>
                ))}
              </div>
            </section>

            <section className="section section--more" aria-labelledby="more-title">
              <div className="section__head">
                <h2 id="more-title" className="section__title">
                  More Games
                </h2>
              </div>
              <div className="grid-top-games">
                {moreGames.map((game) => (
                  <a key={`more-${game.id}`} className="top-game-link" href={gamePath(game)}>
                    <GameCard game={game} variant="topSquare" hoverRated />
                  </a>
                ))}
              </div>
              {hasMoreHidden ? (
                <div className="section__footer">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setMoreVisibleCount((prev) => prev + 16)}
                  >
                    Show More
                  </button>
                </div>
              ) : null}
            </section>

            {categories
              .filter((cat) => cat !== 'Trending')
              .map((cat) => {
                const inCat = gamesData.filter((g) => g.category === cat);
                if (inCat.length === 0) return null;
                return (
                  <section key={cat} className="section" aria-labelledby={`cat-${cat}`}>
                    <div className="section__head">
                      <h2 id={`cat-${cat}`} className="section__title">
                        {cat}
                      </h2>
                      <span className="section__link">
                        See all
                        <ChevronRight />
                      </span>
                    </div>
                    <div className="row-scroll">
                      {inCat.map((game, i) => (
                        <div key={game.id} className="row-scroll__item">
                          <GameCard game={game} compact showHot={i === 0} />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}

            <section className="section section--categories" id="categories" aria-labelledby="browse-cat-title">
              <div className="section__head">
                <h2 id="browse-cat-title" className="section__title">
                  Explore by Categories
                </h2>
                <a className="section__link" href="https://now-gg.com/games.html" target="_blank" rel="noreferrer">
                  View All
                  <ChevronRight />
                </a>
              </div>
              <div className="category-grid">
                {browseCategories.map((name) => (
                  <a key={name} className="category-chip" href={categoryPath(name)}>
                    <span className="category-chip__icon" aria-hidden>
                      {CATEGORY_ICONS[name] || '•'}
                    </span>
                    <span className="category-chip__label">{name}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Hidden as requested: keep code, do not delete
            <section className="section" aria-labelledby="videos-title">
              <div className="section__head">
                <h2 id="videos-title" className="section__title">
                  Enjoy some Short videos
                </h2>
              </div>
              <div className="video-grid">
                {VIDEO_QUOTES.slice(0, 4).map((text) => (
                  <div key={text} className="video-card">
                    <div className="video-card__play" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="blogs-title">
              <div className="section__head">
                <h2 id="blogs-title" className="section__title">
                  Blogs
                </h2>
                <a className="section__link" href="https://now-gg.com/blog.html" target="_blank" rel="noreferrer">
                  View All
                  <ChevronRight />
                </a>
              </div>
              <div className="link-cards">
                {BLOG_TITLES.map((title) => (
                  <a key={title} className="link-card" href="https://now-gg.com/blog.html" target="_blank" rel="noreferrer">
                    {title}
                  </a>
                ))}
              </div>
            </section>
            */}

            <section className="section prose" id="about" aria-labelledby="what-title">
              <div className="section__head">
                <h2 id="what-title" className="section__title">What is now-gg?</h2>
                <a className="section__link" href="#" onClick={(e) => { e.preventDefault(); setIsAboutModalOpen(true); }}>
                  About Us
                  <ChevronRight />
                </a>
              </div>

              <h2 id="online-title">Play Free Online Games, Instantly, on Any Device</h2>
              <p>
                now-gg is a free cloud-powered gaming platform that lets you jump into your favorite games straight from any browser, with no downloads, no installs, and no account required. Whether you're on a phone, tablet, or desktop, now-gg makes it simple to start playing within seconds, anytime, anywhere.
              </p>

              <h2 id="free-title">A Library Built for Every Kind of Player</h2>
              <p>
                From fast-paced shooters to relaxing puzzles, now-gg hosts a wide and ever-growing collection of free online games across every genre. Dive into intense multiplayer battles with Shell Shockers and Hazmob FPS, test your nerves in the spine-chilling Five Nights at Freddy's, or unwind with beloved card and board games like Chess and Ludo King. Prefer something creative? Gacha Life, Gacha Club, and Gacha Life 2 let you design original anime characters and tell your own stories. Browse genres including shooting games, puzzle games, simulation games, board games, adventure games, and many more.
              </p>

              <h2 id="mp-title">Multiplayer Gaming Without the Hassle</h2>
              <p>
                Some of the best gaming moments happen with others. now-gg's multiplayer games collection makes it easy to challenge friends or compete with players from around the world, no setup required. Grow the biggest snake on the server in Slither.io, or battle for survival in ZombsRoyale.io. Whether you prefer casual competition or all-out battles, the fun is always one click away.
              </p>

              <h2 id="brain-title">Brain Games, Puzzle Adventures, and More</h2>
              <p>
                now-gg is home to some of the most satisfying puzzle and strategy experiences available online. Challenge yourself with timeless classics like Chess and Sudoku, keep your mind sharp with Block Puzzle Master, or take on the iconic horror of Five Nights at Freddy's if you're after a real test of nerves. Whatever your style, there is always something engaging to play.
              </p>
              
              <h2 id="safe-title">Safe, Free, and Family-Friendly</h2>
              <p>
                now-gg is built for players of all ages. Our collection includes creative outlets like Gacha Life Dress Up and Gacha Life Maker for younger players who love building characters and stories, alongside classics like Ludo King and Sudoku that the whole family can enjoy together. Parents can feel confident knowing our platform is free of paywalls and unnecessary barriers, just good, clean gaming.
              </p>
              
              <h2 id="cloud-title">Cloud Gaming, Simplified</h2>
              <p>
                Powered by cloud technology, now-gg removes the usual friction of gaming. No storage required. No update downloads. No hardware limits. Whatever device you're on, you can open a browser, pick a game, and be playing in seconds. It really is that simple.
              </p>
            </section>

            <section className="section" aria-labelledby="faq-title">
              <div className="section__head">
                <h2 id="faq-title" className="section__title">
                  Frequently Asked Questions
                </h2>
              </div>
              <details className="faq-item" open>
                <summary>What is now-gg and how does it work?</summary>
                <p>now-gg is a free online gaming platform that lets you play games instantly in your browser with no downloads or installs required. Simply visit the site, pick a game, and start playing from any device, including your phone, tablet, or desktop.</p>
              </details>
              <details className="faq-item">
                <summary>Are all games on now-gg completely free to play?</summary>
                <p>Yes. Every game on now-gg is free to play with no sign-up required. Just open your browser and start playing titles like Five Nights at Freddy's, Slither.io, Shell Shockers, Chess, Ludo King, and many more, all at no cost.</p>
              </details>
              <details className="faq-item">
                <summary>Can I play now-gg games on my phone or mobile browser?</summary>
                <p>Absolutely. now-gg is fully optimized for mobile play. All games run smoothly on both Android and iOS browsers without any app download needed, so you can enjoy free online games on mobile whenever and wherever you like.</p>
              </details>
              <details className="faq-item">
                <summary>Does now-gg have multiplayer games I can play with friends?</summary>
                <p>Yes. now-gg features a wide selection of free multiplayer games online, including Slither.io, ZombsRoyale.io, Shell Shockers, Bloxd.io, 8 Ball Billiards Classic, and more. Just share the link and challenge friends from anywhere in the world.</p>
              </details>
              <details className="faq-item">
                <summary>Is now-gg safe for kids?</summary>
                <p>Yes. now-gg is designed to be safe and enjoyable for players of all ages. The platform includes family-friendly titles like Gacha Life, Gacha Life 2, Ludo King, Chess, and Sudoku, making it a great destination for free online games for kids and adults alike.</p>
              </details>
            </section>

          </>
        )}
      </main>

      <footer className="footer" id="footer">
        <div className="footer__inner">
          <div className="footer__grid">
            <div className="footer__col">
              <h3>Games</h3>
              <ul>
                <li>
                  <a href="#games">All Games</a>
                </li>
                <li>
                  <a href="#categories">Action</a>
                </li>
                <li>
                  <a href="#categories">RPG</a>
                </li>
                <li>
                  <a href="#categories">Strategy</a>
                </li>
                <li>
                  <a href="#categories">Casual</a>
                </li>
                <li>
                  <a href="#categories">Puzzle</a>
                </li>
                <li>
                  <a href="#categories">Adventure</a>
                </li>
                <li>
                  <a href="#categories">Simulation</a>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsAboutModalOpen(true); }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="https://now-gg.com/blog.html" target="_blank" rel="noreferrer">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                    Developers
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h3>Help &amp; Support</h3>
              <ul>
                <li>
                  <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                    Get in Touch
                  </a>
                </li>
                <li>
                  <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                    Help center
                  </a>
                </li>
              </ul>
              <h3 style={{ marginTop: '20px' }}>Social</h3>
              <div className="footer__social">
                <a href="https://now-gg.com/" target="_blank" rel="noreferrer" aria-label="Discord">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4.5A16.8 16.8 0 0016.5 3c-.2.3-.4.7-.5 1a15.6 15.6 0 00-4 0c-.1-.3-.3-.7-.5-1A16.8 16.8 0 003.99 4.5 17.5 17.5 0 002 18.3 16.7 16.7 0 006.1 20c.4-.6.8-1.2 1.1-1.8l-1.9-.9c.2-.1.4-.3.7-.5 1.4 1 3 1.5 4.7 1.5s3.3-.5 4.7-1.5c.2.2.5.4.7.5l-1.9.9c.3.6.7 1.2 1.1 1.8 2.4-.4 4.6-1.3 6.1-2.9 1.2-8.5-.4-13.8-6.1-14.3zM9.5 14.6c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8-.7 1.8-1.6 1.8zm5 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8-.7 1.8-1.6 1.8z" />
                  </svg>
                </a>
                <a href="https://now-gg.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 3H21l-6.5 7.4L22 21h-5.9l-4.6-5.8L5.5 21H2l7-8L2 3h6l4.1 5.2L18.244 3z" />
                  </svg>
                </a>
                <a href="https://now-gg.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.7 31.7 0 000 12a31.7 31.7 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1 31.7 31.7 0 00.5-5.8 31.7 31.7 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer__legal">
            <p>
              <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                Terms and Privacy
              </a>
              {' · '}
              <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                Copyright Dispute Policy
              </a>
              {' · '}
              <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                EU Privacy
              </a>
            </p>
            <p>
              © {new Date().getFullYear()} Layout inspired by{' '}
              <a href="https://now-gg.com/" target="_blank" rel="noreferrer">
                now-gg
              </a>
              . Game data is local to this demo.
            </p>
          </div>
        </div>
      </footer>

      {isAboutModalOpen && (
        <div className="about-modal" role="dialog" aria-modal="true" aria-label="About Us">
          <div className="about-modal__backdrop" onClick={() => setIsAboutModalOpen(false)} />
          <div className="about-modal__panel">
            <button type="button" className="about-modal__close" onClick={() => setIsAboutModalOpen(false)}>Close</button>
            <div className="about-modal__content">
              <h2>ABOUT US</h2>
              <h3>Who We Are</h3>
              <p>now-gg is a free browser-based gaming platform built for players who want to jump straight into great games without the friction of downloads, installs, or account requirements. Whether you're on a phone, tablet, or desktop, now-gg lets you play instantly from any browser, on any device, anytime you want.</p>
              <p>We believe gaming should be accessible to everyone. That's the idea behind everything we build: removing barriers, expanding access, and connecting players with the games they love in the simplest way possible.</p>
              
              <h3>What We Offer</h3>
              <p>now-gg hosts a growing library of free online games spanning a wide range of genres, from action and shooting to puzzles, board games, simulation, and more. Every game on the platform is playable directly in your browser with no download and no cost. Our collection includes titles like Five Nights at Freddy's, Shell Shockers, Slither.io, Chess, Ludo King, Sudoku, Gacha Life, Gacha Club, Bloxd.io, ZombsRoyale.io, and many more.</p>
              <p>We regularly add new games across all categories, so there is always something fresh to discover, whether you're in the mood for a quick match or a longer session.</p>
              
              <h3>Our Mission</h3>
              <p>Our mission is simple: make great games available to everyone, everywhere, without barriers. We are committed to providing a safe, accessible, and enjoyable gaming experience for players of all ages, and we work continuously to improve the platform for the community that plays on it.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
