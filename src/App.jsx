import React, { useEffect, useMemo, useState } from 'react';
import { gamesData, categories, browseCategories } from './gamesData';
import GameCard from './GameCard';
import './App.css';

function normalize(s) {
  return s.toLowerCase().trim();
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
  'Browser Games': '◔',
  'Casual Games': '♟',
  'Strategy Games': '♞',
  'Simulation Games': '⚖',
  'Role Playing Games': '♛',
  'Action Games': '🗡',
  'Adventure Games': '🧭',
  'Puzzle Games': '🧩',
  'Arcade Games': '◕',
  'Sports Games': '⚾',
  'Casino Games': '🎯',
  'Racing Games': '◉',
  'Card Games': '🂱',
  'Educational Games': '✎',
  'Social Games': '✿',
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moreVisibleCount, setMoreVisibleCount] = useState(16);

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
  }, []);

  return (
    <div className="site">
      <header className="header">
        <div className="header__inner">
          <a className="logo" href="/" aria-label="now-gg home">
            <NowGgLogoMark />
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
                    href={`/games?game=${encodeURIComponent(game.id)}`}
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
                  <GameCard key={game.id} game={game} variant="topSquare" hoverRated />
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
                  <GameCard key={game.id} game={game} variant="topSquare" hoverRated />
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
                  <a key={name} className="category-chip" href="https://now-gg.com/" target="_blank" rel="noreferrer">
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
                <h2 id="what-title" className="section__title">What is now-gg</h2>
                <a className="section__link" href="https://now-gg.com/aboutus.html" target="_blank" rel="noreferrer">
                  About Us
                  <ChevronRight />
                </a>
              </div>

              <h2 id="online-title">Online Games - Play Anywhere, Anytime</h2>
              <p>
                Discover a world of excitement with our vast collection of free online games, conveniently accessible with
                no downloads required. Get ready to immerse yourself in endless fun, whether playing solo, challenging
                friends, or seeking thrilling multiplayer adventures.
              </p>

              <h2 id="free-title">Free Online Games at Your Fingertips</h2>
              <p>
                Play online from a wide variety of fun online games, including <a href="https://now-gg.com/play/roblox-corporation/5349/roblox.html" target="_blank" rel="noreferrer">Bloxd.io</a>, and <a href="https://now-gg.com/play/mob-games/1853/poppy-playtime.html" target="_blank" rel="noreferrer">Poppy Playtime</a>. You can find a game to fit your mood and interests among the various game genres, such as <a href="https://now-gg.com/games/card.html" target="_blank" rel="noreferrer">card games</a>, <a href="https://now-gg.com/games/sports.html" target="_blank" rel="noreferrer">sports games</a>, <a href="https://now-gg.com/games/shooting.html" target="_blank" rel="noreferrer">shooting games</a>, <a href="https://now-gg.com/games/ludo.html" target="_blank" rel="noreferrer">ludo games</a>, <a href="https://now-gg.com/games/solitaire.html" target="_blank" rel="noreferrer">solitaire games</a>, <a href="https://now-gg.com/games/browser.html" target="_blank" rel="noreferrer">browser games</a>, <a href="https://now-gg.com/games/quiz.html" target="_blank" rel="noreferrer">quiz games</a>, and exciting <a href="https://now-gg.com/games/zombie.html" target="_blank" rel="noreferrer">zombie games</a>. Get ready to embark on unforgettable adventures and immerse yourself in exhilarating gaming experiences. Start playing right away and enjoy yourself!
              </p>

              <h2 id="mp-title">Multiplayer Adventures Await</h2>
              <p>
                Gaming online with friends is more fun, and now.gg has you covered. Explore our collection of online <a href="https://now-gg.com/games/multiplayer.html" target="_blank" rel="noreferrer">multiplayer games</a> to play with friends and engage in epic combat. You can choose from numerous games like <a href="https://now-gg.com/play/king-soul-land/2054/soul-land-reloaded.html" target="_blank" rel="noreferrer">Soul Land Reloaded</a>, <a href="https://now-gg.com/play/lelithgames/1899/fireboy-and-watergirl-2-light-temple.html" target="_blank" rel="noreferrer">Fireboy and Watergirl 2: Light Temple</a>, <a href="https://now-gg.com/play/innersloth-llc/4047/among-us.html" target="_blank" rel="noreferrer">Among Us</a>, and many more. Connect with friends from around the world and let the competition begin.
              </p>

              <h2 id="ages-title">Fun for All Ages</h2>
              <p>
                Players of all ages can play games on now.gg. We recognize the value of offering children a fun and secure gaming environment. Explore our selection of games like <a href="https://now-gg.com/play/kahoot/2048/kahoot-play-and-create-quizzes.html" target="_blank" rel="noreferrer">Kahoot! Play &amp; Create Quizzes</a>, and <a href="https://now-gg.com/play/tizi-town-games/2079/vexcode-v5.html" target="_blank" rel="noreferrer">VEXcode V5</a>, for children have been carefully chosen to guarantee fun. Our games will keep young minds entertained and inspired, offering everything from <a href="https://now-gg.com/games/educational.html" target="_blank" rel="noreferrer">educational quizzes</a> to delightful <a href="https://now-gg.com/games/adventure.html" target="_blank" rel="noreferrer">adventures</a>.
              </p>
            </section>

            <section className="section" aria-labelledby="faq-title">
              <div className="section__head">
                <h2 id="faq-title" className="section__title">
                  Frequently asked questions
                </h2>
              </div>
              <details className="faq-item" open>
                <summary>01. What games can you play with friends online?</summary>
                <p>
                  We have multiplayer-friendly online games you can enjoy with friends—from cooperative adventures to
                  competitive challenges.
                </p>
              </details>
              <details className="faq-item">
                <summary>02. Do you need to upload or download online games?</summary>
                <p>No, you don&apos;t need to download or upload anything. Select your game and begin playing immediately.</p>
              </details>
              <details className="faq-item">
                <summary>03. Where can I play free games online without downloading them?</summary>
                <p>
                  Start on the homepage or choose a game from popular categories: Adventure, Action, Simulation, and
                  Strategy.
                </p>
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
                  <a href="https://now-gg.com/aboutus.html" target="_blank" rel="noreferrer">
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
    </div>
  );
}

export default App;
