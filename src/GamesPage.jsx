import React, { useEffect, useMemo, useState } from 'react';
import { browseCategories, categoryPath, categorySlug, gamePath, gameSlug, gamesData } from './gamesData';
import GameCard from './GameCard';
import gameSeoContent from './gameSeoContent.json';
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

function fallbackThumb(title = 'game') {
  return `https://picsum.photos/seed/${encodeURIComponent(title)}/320/320`;
}

function onThumbError(event, title) {
  if (event.currentTarget.dataset.fallbackApplied === '1') return;
  event.currentTarget.dataset.fallbackApplied = '1';
  event.currentTarget.src = fallbackThumb(title);
}

function getPlayableSrc(game) {
  if (game?.embedUrl) return game.embedUrl;
  const link = String(game?.link || '');
  if (link.includes('crazygames.com/game/')) return link.replace('/game/', '/embed/');
  return link;
}

function renderRichLines(lines) {
  return (lines || []).map((lineObj, idx) => {
    const line = typeof lineObj === 'object' ? lineObj.content : lineObj;
    if (!line) return null;
    
    if (typeof lineObj === 'object') {
      return <div key={`rich-${idx}`} dangerouslySetInnerHTML={{ __html: line }} />;
    }

    if (line.startsWith('<H2>')) return <h2 key={`h2-${idx}`}>{line.replace('<H2>', '').trim()}</h2>;
    if (line.startsWith('<H3>')) return <h3 key={`h3-${idx}`}>{line.replace('<H3>', '').trim()}</h3>;
    if (line.startsWith('* ')) return <p key={`li-${idx}`}>{line.slice(2)}</p>;
    return <p key={`p-${idx}`}>{line}</p>;
  });
}

export default function GamesPage() {
  const path = window.location.pathname.toLowerCase();
  const gamePathMatch = path.match(/^\/games\/([a-z0-9-]+)\.html\/?$/);
  const categoryPathMatch = path.match(/^\/games\/category\/([a-z0-9-]+)\.html\/?$/);

  const [search, setSearch] = useState('');
  const [moreVisible, setMoreVisible] = useState(16);
  const [isPlayStarted, setIsPlayStarted] = useState(false);
  const [modalType, setModalType] = useState(null);
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

  const pathGameSlug = gamePathMatch?.[1] || '';
  const pathCategorySlug = categoryPathMatch?.[1] || '';
  const selectedCategory = browseCategories.find((name) => categorySlug(name).replace(/-games$/, '') === pathCategorySlug) || null;
  const isCategoryPage = Boolean(selectedCategory);

  const selectedGame = gamesData.find((g) => gameSlug(g) === pathGameSlug) || gamesData[0];
  const selectedGameSlug = gameSlug(selectedGame);
  const selectedContent = gameSeoContent[selectedGameSlug] || null;
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
      (g) => normalize(g.title).includes(q) || normalize(g.category).includes(q) || normalize(g.slug).includes(q)
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

    if (pathGameSlug) canonical.setAttribute('href', `https://now-gg.com/games/${pathGameSlug}.html`);
    else if (pathCategorySlug) canonical.setAttribute('href', `https://now-gg.com/games/category/${pathCategorySlug}.html`);
    else canonical.setAttribute('href', 'https://now-gg.com/games/');

    if (selectedContent) {
      document.title = selectedContent.metaTitle || `${selectedGame.title} - Play Free Online | now-gg`;
      const desc = selectedContent.metaDescription || `Play ${selectedGame.title} online free on now-gg with no download required.`;
      setMeta('description', desc);
      setMeta('og:title', selectedContent.metaTitle || `${selectedGame.title} - Play Free Online | now-gg`, true);
      setMeta('og:description', desc, true);
      setMeta('og:url', canonical.getAttribute('href') || `https://now-gg.com/games/${selectedGameSlug}.html`, true);
    } else {
      setMeta('description', 'Browse and play popular online games instantly on now-gg.com/games/. No downloads, no installation, direct browser gameplay.');
      setMeta('og:title', 'Games - Play Online in Browser | now-gg.com', true);
      setMeta('og:description', 'Browse and play popular online games instantly on now-gg.com/games/.', true);
      setMeta('og:url', canonical.getAttribute('href') || 'https://now-gg.com/games/', true);
    }

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    if (selectedContent && selectedContent.schema) {
      script.textContent = JSON.stringify(selectedContent.schema);
    } else {
      if (script.parentNode) script.parentNode.removeChild(script);
    }
  }, [pathGameSlug, pathCategorySlug, selectedContent, selectedGame.title, selectedGameSlug]);

  const playerSrc = getPlayableSrc(selectedGame) || selectedGame.playUrl || selectedGame.link;
  const isGachaEmbed = /gacha-life\.io/i.test(playerSrc);
  const isLudoKing = selectedGameSlug === 'ludo-king';
  const gachaCropClass = (() => {
    if (!isGachaEmbed) return '';
    if (selectedGameSlug === 'gacha-life-2') return 'hero-stage--gacha-life-2';
    if (selectedGameSlug === 'gacha-club') return 'hero-stage--gacha-club';
    if (selectedGameSlug === 'gacha-life-maker') return 'hero-stage--gacha-life-maker';
    return '';
  })();

  useEffect(() => {
    setIsPlayStarted(false);
    setModalType(null);
  }, [pathGameSlug]);

  const handlePlayInBrowser = () => setIsPlayStarted(true);

  const renderModalBody = () => {
    const readMoreData = selectedContent?.readMore || selectedGame?.readMore;
    const faqsData = selectedContent?.faqs || selectedGame?.faqs;

    if (!readMoreData && !faqsData && !selectedContent) return null;

    if (modalType === 'readmore') return <>{renderRichLines(readMoreData)}</>;
    
    if (modalType === 'faqs') {
      const faqLines = faqsData || [];
      const pairs = [];
      if (faqLines.length > 0 && typeof faqLines[0] === 'object' && faqLines[0].question) {
        faqLines.forEach(f => pairs.push([f.question, f.answer]));
      } else {
        for (let i = 0; i < faqLines.length; i += 2) pairs.push([faqLines[i], faqLines[i + 1] || '']);
      }
      return (
        <>
          <h2>FAQs</h2>
          {pairs.map(([q, a], idx) => (
            <p key={`faq-${idx}`}><strong>{q}</strong><br />{a}</p>
          ))}
        </>
      );
    }
    if (modalType === 'about') {
      return (
        <div className="about-modal__content">
          <h2>About Us</h2>
          <p><strong>Who We Are</strong><br/>now-gg is a cutting-edge cloud gaming platform designed to break down the barriers between players and their favorite games. We believe that gaming should be instant, accessible, and free of the limitations of hardware, storage space, and long download times. Whether you're on a smartphone, tablet, PC, or Mac, now-gg transforms your device into a powerful gaming console instantly.</p>
          <p><strong>What We Offer</strong><br/>With a massive, ever-growing library of games spanning across Action, RPG, Strategy, Casual, and Puzzle genres, now-gg provides something for everyone. Our platform runs entirely in the cloud, meaning you can jump straight into high-quality gaming experiences with just a click. No installs, no updates—just pure gaming.</p>
          <p><strong>Our Mission</strong><br/>Our mission is simple: <strong>To democratize gaming.</strong> We are building a future where anyone, anywhere, can play the best games the world has to offer without needing expensive hardware or complex setups. By leveraging advanced cloud technology, we’re making seamless, cross-platform multiplayer and instant-play experiences the new standard for gamers worldwide.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="games-page">
      <header className={`games-header ${isHeaderVisible ? '' : 'games-header--hidden'}`}>
        <div className="games-header__inner">
          <a className="games-logo" href="/">
            <span className="games-logo__wordmark"><span>now</span><strong>-gg</strong></span>
          </a>
          <input className="games-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
        </div>
      </header>

      <main>
        {pathGameSlug ? (
          <>
            <section className={`hero hero--detail ${isGachaEmbed ? 'hero--detail-gacha' : ''}`}>
              <aside className="hot-rail" aria-label="Hot games">
                {hotRailGames.map((g) => (
                  <a key={`rail-${g.id}`} href={gamePath(g)} className="hot-rail__item"><img src={g.thumbnail} alt={g.title} onError={(e) => onThumbError(e, g.title)} /></a>
                ))}
              </aside>

              <div className={`hero-stage ${isPlayStarted ? 'hero-stage--playing' : ''} ${isGachaEmbed ? 'hero-stage--gacha-fix' : ''} ${gachaCropClass}`}>
                {isPlayStarted ? (
                  isLudoKing ? (
                    <iframe 
                      src="https://gamedistribution.com" 
                      width="100%" 
                      height="600" 
                      frameBorder="0" 
                      scrolling="no" 
                      allow="autoplay; gamepad; fullscreen" 
                      allowFullScreen>
                    </iframe>
                  ) : (
                  <iframe
                    className="hero-stage__iframe"
                    src={playerSrc}
                    title={`${selectedGame.title} game`}
                    allow="autoplay; fullscreen; gamepad"
                    allowFullScreen
                    scrolling="no"
                  />
                  )
                ) : (
                  <>
                    <img className="hero-stage__bgimg" src={selectedGame.thumbnail} alt="" onError={(e) => onThumbError(e, selectedGame.title)} />
                    <div className="hero-stage__overlay" />
                    <div className="hero-card">
                      <img src={selectedGame.thumbnail} alt={selectedContent?.imageAlt || selectedGame.title} onError={(e) => onThumbError(e, selectedGame.title)} />
                      <h1>{selectedContent?.h1 || selectedGame.title}</h1>
                      <p><strong>{Number(selectedGame.rating || 4.5).toFixed(1)}</strong> {' | '} {selectedContent?.subtitle || selectedGame.category?.join(' | ') || 'Online Game'}</p>
                      <button type="button" className="hero-card__cta" onClick={handlePlayInBrowser}>Play in browser</button>
                    </div>
                    {(selectedContent || selectedGame.readMore || selectedGame.faqs) ? (
                      <div className="hero-stage__details">
                        <h2>{selectedContent?.summaryTitle || `Play ${selectedGame.title} Online in Browser`}</h2>
                        <p>{selectedContent?.summary || `Play ${selectedGame.title} online instantly in your browser.`}</p>
                        <div className="fnaf-content__links">
                          {(selectedContent?.readMore || selectedGame.readMore) && <button type="button" onClick={() => setModalType('readmore')}>READ MORE</button>}
                          {(selectedContent?.faqs || selectedGame.faqs) && <button type="button" onClick={() => setModalType('faqs')}>FAQS</button>}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </section>

            <section className="games-section">
              <h2>Popular Games</h2>
              <div className="games-grid games-grid--popular">
                {gamesData.slice(0, 20).map((g) => (<a key={`popular-${g.id}`} className="card-link" href={gamePath(g)}><GameCard game={g} variant="topSquare" hoverRated /></a>))}
              </div>
            </section>

            <section className="games-section">
              <h2 id="more-title">More Games</h2>
              <div className="games-grid games-grid--more">
                {gamesData.slice(0, moreVisible).map((g) => (<a key={`more-${g.id}`} className="card-link" href={gamePath(g)}><GameCard game={g} variant="topSquare" hoverRated /></a>))}
              </div>
              {moreVisible < gamesData.length ? (<div className="more-actions"><button type="button" onClick={() => setMoreVisible((v) => v + 16)}>Show More</button></div>) : null}
            </section>

            <section className="games-section">
              <h2>Explore by Categories</h2>
              <div className="category-grid category-grid--games-page">
                {browseCategories.map((name) => (<a key={name} href={categoryPath(name)} className="category-chip"><span className="category-chip__icon">{CATEGORY_ICONS[name] || '•'}</span><span className="category-chip__label">{name}</span></a>))}
              </div>
            </section>
          </>
        ) : searchActive ? (
          <section className="games-section">
            <h2>Search Results</h2>
            <div className="games-grid games-grid--more">{searchResults.map((g) => (<a key={`search-${g.id}`} className="card-link" href={gamePath(g)}><GameCard game={g} variant="topSquare" hoverRated /></a>))}</div>
          </section>
        ) : isCategoryPage ? (
          <section className="games-section">
            <h2>{selectedCategory}</h2>
            <div className="games-grid games-grid--more">{categoryGames.map((g) => (<a key={`category-${g.id}`} className="card-link" href={gamePath(g)}><GameCard game={g} variant="topSquare" hoverRated /></a>))}</div>
          </section>
        ) : (
          <>
            <section className="games-section">
              <h2>Popular Games</h2>
              <div className="games-grid games-grid--popular">{filteredPopular.map((g) => (<a key={`popular-${g.id}`} className="card-link" href={gamePath(g)}><GameCard game={g} variant="topSquare" hoverRated /></a>))}</div>
              <div className="games-grid games-grid--six">{randomSix.map((g) => (<a key={`random-${g.id}`} className="card-link" href={gamePath(g)}><article className="wide-tile"><img src={g.thumbnail} alt={g.title} onError={(e) => onThumbError(e, g.title)} /><h3>{g.title}</h3></article></a>))}</div>
            </section>

            <section className="games-section">
              <h2>More Games</h2>
              <div className="games-grid games-grid--more">{moreGames.map((g) => (<a key={`more-${g.id}`} className="card-link" href={gamePath(g)}><GameCard game={g} variant="topSquare" hoverRated /></a>))}</div>
              {hasMore ? (<div className="more-actions"><button type="button" onClick={() => setMoreVisible((v) => v + 16)}>Show More</button></div>) : null}
            </section>

            <section className="games-section">
              <h2>Explore by Categories</h2>
              <div className="category-grid category-grid--games-page">{browseCategories.map((name) => (<a key={name} href={categoryPath(name)} className="category-chip"><span className="category-chip__icon">{CATEGORY_ICONS[name] || '•'}</span><span className="category-chip__label">{name}</span></a>))}</div>
            </section>
          </>
        )}
      </main>

      {modalType ? (
        <div className="fnaf-modal" role="dialog" aria-modal="true" aria-label="Game content">
          <div className="fnaf-modal__backdrop" onClick={() => setModalType(null)} />
          <div className="fnaf-modal__panel">
            <button type="button" className="fnaf-modal__close" onClick={() => setModalType(null)}>Close</button>
            <div className="fnaf-modal__content">{renderModalBody()}</div>
          </div>
        </div>
      ) : null}

      <footer className="games-footer">
        <div className="games-footer__grid">
          <div><a className="games-logo" href="/"><span className="games-logo__wordmark"><span>now</span><strong>-gg</strong></span></a></div>
          <div><h4>Games</h4><p><a href="/games/">All Games</a></p><p><a href={categoryPath('Action')}>Action Games</a></p><p><a href={categoryPath('RPG')}>RPG Games</a></p><p><a href={categoryPath('Strategy')}>Strategy Games</a></p><p><a href={categoryPath('Casual')}>Casual Games</a></p><p><a href={categoryPath('Puzzle')}>Puzzle Games</a></p><p><a href={categoryPath('Adventure')}>Adventure Games</a></p><p><a href={categoryPath('Simulation')}>Simulation Games</a></p></div>
          <div><h4>Company</h4><p style={{ cursor: 'pointer' }} onClick={() => setModalType('about')}>About Us</p><p>News</p><h4>Resources</h4><p>Blog</p><p>Developers</p></div>
          <div><h4>Help &amp; Support</h4><p>Get in Touch</p><p>Help center</p><h4>Social</h4><p>YouTube</p><p>Discord</p></div>
        </div>
      </footer>
    </div>
  );
}
